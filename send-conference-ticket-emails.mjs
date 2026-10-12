import { readFile, rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";
import { config as loadEnv } from "dotenv";
import { Resend } from "resend";

const ROOT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const TICKETS_PATH = path.join(
  ROOT_DIRECTORY,
  "lib",
  "constants",
  "conference-tickets.ts",
);
const EMAIL_TEMPLATE_PATH = path.join(
  ROOT_DIRECTORY,
  "emails",
  "html",
  "registration",
  "sponsored-ticket.html",
);

const ARRAY_PREFIX = "export const CONFERENCE_TICKETS = ";
const ARRAY_SUFFIX = " as const satisfies readonly ConferenceTicket[];";
const SEND_ENABLED = process.argv.includes("--send");
const DEFAULT_SEND_DELAY_MS = 600;
const DEFAULT_FROM_EMAIL =
  "NGM Conference 5.0 <info@ngmplatform.com>";
const DEFAULT_SUBJECT =
  "Complete Your Sponsored/Discounted Ticket Registration — NGM Conference 5.0";

const TICKET_TYPE_LABELS = {
  qhses: "QHSES",
  sponsored_student: "Sponsored Student",
  sponsored_professional: "Sponsored Professional",
  sponsored_emss: "Sponsored EMSS",
  sponsored_parent_spouse: "Sponsored Parent / Spouse",
  referral: "Referral",
};

loadEnv({ path: path.join(ROOT_DIRECTORY, ".env") });

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function replaceTemplateVariables(template, variables) {
  let html = template;

  for (const [name, value] of Object.entries(variables)) {
    html = html.replaceAll(`{{${name}}}`, escapeHtml(value));
  }

  return html;
}

function parseTicketsSource(source) {
  const arrayStart = source.indexOf(ARRAY_PREFIX);
  const arrayEnd = source.indexOf(ARRAY_SUFFIX);

  if (arrayStart === -1 || arrayEnd === -1 || arrayEnd <= arrayStart) {
    throw new Error(
      `Could not find CONFERENCE_TICKETS in ${path.relative(ROOT_DIRECTORY, TICKETS_PATH)}.`,
    );
  }

  const jsonStart = arrayStart + ARRAY_PREFIX.length;
  const tickets = JSON.parse(source.slice(jsonStart, arrayEnd));

  if (!Array.isArray(tickets)) {
    throw new TypeError("CONFERENCE_TICKETS must be an array.");
  }

  return { arrayEnd, jsonStart, tickets };
}

async function loadTickets() {
  const source = await readFile(TICKETS_PATH, "utf8");
  const parsed = parseTicketsSource(source);
  return { ...parsed, source };
}

async function persistTickets({ arrayEnd, jsonStart, source, tickets }) {
  const updatedSource =
    source.slice(0, jsonStart) +
    JSON.stringify(tickets, null, 2) +
    source.slice(arrayEnd);
  const temporaryPath = `${TICKETS_PATH}.${process.pid}.tmp`;

  await writeFile(temporaryPath, updatedSource, "utf8");
  await rename(temporaryPath, TICKETS_PATH);
}

function selectBatch(tickets) {
  return tickets.filter(
    (ticket) =>
      typeof ticket.emailAddress === "string" &&
      ticket.emailAddress.trim().length > 0 &&
      ticket.status === "not_sent",
  );
}

function getSendDelay() {
  const configuredDelay = Number.parseInt(
    process.env.EMAIL_SEND_DELAY_MS ?? String(DEFAULT_SEND_DELAY_MS),
    10,
  );

  if (!Number.isFinite(configuredDelay) || configuredDelay < 0) {
    throw new Error("EMAIL_SEND_DELAY_MS must be a non-negative integer.");
  }

  return configuredDelay;
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function renderTicketEmail(template, ticket) {
  const ticketType = TICKET_TYPE_LABELS[ticket.ticketType];

  if (!ticketType) {
    throw new Error(`Unsupported ticket type: ${ticket.ticketType}`);
  }

  return replaceTemplateVariables(template, {
    first_name: ticket.name ?? "Attendee",
    recipient_email: ticket.emailAddress,
    ticket_id: ticket.ticketId,
    ticket_type: ticketType,
  });
}

function printBatch(batch) {
  console.log(
    `${SEND_ENABLED ? "SEND" : "DRY RUN"}: selected all ${batch.length} unsent records with email addresses.`,
  );

  for (const [index, ticket] of batch.entries()) {
    const warning = ticket.notes
      ?.toLowerCase()
      .includes("incorrect email address")
      ? " [WARNING: marked as incorrect email address]"
      : "";

    console.log(
      `${String(index + 1).padStart(2, "0")}. ${ticket.ticketId} — ${ticket.emailAddress}${warning}`,
    );
  }
}

async function main() {
  const ticketFile = await loadTickets();
  const batch = selectBatch(ticketFile.tickets);

  if (batch.length === 0) {
    console.log("No unsent records with email addresses were found.");
    return;
  }

  printBatch(batch);

  if (!SEND_ENABLED) {
    console.log(
      "\nDry run only. No emails were sent and no statuses were changed.",
    );
    console.log(
      "Run `pnpm tickets:email -- --send` to send this exact batch.",
    );
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is required when using --send.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const template = await readFile(EMAIL_TEMPLATE_PATH, "utf8");
  const sendDelay = getSendDelay();
  const from = process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;
  const subject = process.env.TICKET_EMAIL_SUBJECT ?? DEFAULT_SUBJECT;
  let sentCount = 0;
  let failedCount = 0;

  for (const [index, selectedTicket] of batch.entries()) {
    const ticket = ticketFile.tickets.find(
      (candidate) => candidate.ticketId === selectedTicket.ticketId,
    );

    if (!ticket?.emailAddress) {
      failedCount += 1;
      console.error(`[${index + 1}/${batch.length}] Missing ticket or email.`);
      continue;
    }

    try {
      const { error } = await resend.emails.send({
        from,
        to: ticket.emailAddress,
        subject,
        html: renderTicketEmail(template, ticket),
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      failedCount += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.error(
        `[${index + 1}/${batch.length}] Failed ${ticket.ticketId} (${ticket.emailAddress}): ${message}`,
      );
      continue;
    }

    ticket.status = "sent";

    try {
      await persistTickets(ticketFile);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(
        `Email for ${ticket.ticketId} was accepted, but its status could not be persisted: ${message}`,
      );
    }

    sentCount += 1;
    console.log(
      `[${index + 1}/${batch.length}] Sent ${ticket.ticketId} to ${ticket.emailAddress}; status updated.`,
    );

    if (index < batch.length - 1 && sendDelay > 0) {
      await wait(sendDelay);
    }
  }

  console.log(
    `\nBatch complete: ${sentCount} sent, ${failedCount} failed. Failed records remain not_sent.`,
  );

  if (failedCount > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Ticket email script failed: ${message}`);
  process.exitCode = 1;
});
