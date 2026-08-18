import { Resend, type CreateEmailOptions } from "resend";
import fs from "fs";
import path from "path";
import { emailLogger } from "@/lib/logger";

export type Competition = "dare_nigeria" | "sme_pitch" | "case_study";

const COMPETITION_NAMES: Record<Competition, string> = {
  dare_nigeria: "DARE Nigeria Challenge",
  sme_pitch: "SME Pitch Competition",
  case_study: "Case Study & Research Analysis Competition",
};

const DEFAULT_COMPETITION_URL = "https://conference.ngmplatform.com";

// Lazily instantiate Resend so a missing RESEND_API_KEY surfaces as a caught
// error inside each handler (returned as JSON) rather than crashing the whole
// route module at import time (which makes Next.js serve an HTML error page).
let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "NGM Conference 5.0 <info@ngmplatform.com>";

const CONTACT_RECIPIENT_EMAIL =
  process.env.CONTACT_RECIPIENT_EMAIL || "info@ngmplatform.com";

export type EmailResult =
  | { success: true }
  | { success: false; error: unknown };

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function loadTemplate(
  templateName: string,
  folder: string,
  variables: Record<string, string>,
): string {
  const templatePath = path.join(
    process.cwd(),
    "emails",
    "html",
    folder,
    `${templateName}.html`,
  );
  let html = fs.readFileSync(templatePath, "utf-8");
  for (const [key, value] of Object.entries(variables)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }
  return html;
}

/**
 * Single place where an email is actually sent. Owns the send call, the
 * success/failure logging and the try/catch so the callers above stay
 * declarative and free of duplicated boilerplate.
 */
async function dispatchEmail(
  message: CreateEmailOptions,
  log: {
    context: Record<string, unknown>;
    failureMessage: string;
    successMessage: string;
  },
): Promise<EmailResult> {
  try {
    const { error } = await getResend().emails.send(message);

    if (error) {
      emailLogger.error({ error, ...log.context }, log.failureMessage);
      return { success: false, error };
    }

    emailLogger.info(log.context, log.successMessage);
    return { success: true };
  } catch (error) {
    emailLogger.error({ error, ...log.context }, "Email send error");
    return { success: false, error };
  }
}

/**
 * The three applicant-facing lifecycle emails share the same template pipeline
 * and differ only by subject line and log copy, captured here as data.
 */
type ApplicationEmailKind = "received" | "accepted" | "declined";

const APPLICATION_EMAILS: Record<
  ApplicationEmailKind,
  {
    subject: (competitionName: string) => string;
    failureMessage: string;
    successMessage: string;
  }
> = {
  received: {
    subject: (name) => `Application Received - ${name}`,
    failureMessage: "Failed to send 'Application Received' email",
    successMessage: "'Application Received' email sent",
  },
  accepted: {
    subject: (name) =>
      `Congratulations! Your ${name} Application Has Been Accepted`,
    failureMessage: "Failed to send acceptance email",
    successMessage: "'Application Accepted' email sent",
  },
  declined: {
    subject: (name) => `Update on Your ${name} Application`,
    failureMessage: "Failed to send decline email",
    successMessage: "'Application Declined' email sent",
  },
};

export interface ApplicationEmailParams {
  to: string;
  applicantName: string;
  competition: Competition;
  competitionUrl?: string;
}

async function sendApplicationEmail(
  kind: ApplicationEmailKind,
  { to, applicantName, competition, competitionUrl }: ApplicationEmailParams,
): Promise<EmailResult> {
  const config = APPLICATION_EMAILS[kind];
  const competitionName = COMPETITION_NAMES[competition];

  const html = loadTemplate(kind, competition, {
    first_name: applicantName,
    competition_name: competitionName,
    competition_url: competitionUrl || DEFAULT_COMPETITION_URL,
  });

  return dispatchEmail(
    {
      from: FROM_EMAIL,
      to,
      subject: config.subject(competitionName),
      html,
    },
    {
      context: { to, competition: competitionName, type: kind },
      failureMessage: config.failureMessage,
      successMessage: config.successMessage,
    },
  );
}

export function sendApplicationReceivedEmail(params: ApplicationEmailParams) {
  return sendApplicationEmail("received", params);
}

export function sendApplicationAcceptedEmail(params: ApplicationEmailParams) {
  return sendApplicationEmail("accepted", params);
}

export function sendApplicationDeclinedEmail(params: ApplicationEmailParams) {
  return sendApplicationEmail("declined", params);
}

export interface ContactMessageParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function renderContactMessageHtml({
  name,
  email,
  subject,
  message,
}: ContactMessageParams): string {
  return loadTemplate("message", "contact", {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message),
  });
}

export function sendContactMessageEmail(
  params: ContactMessageParams,
): Promise<EmailResult> {
  return dispatchEmail(
    {
      from: params.email,
      to: CONTACT_RECIPIENT_EMAIL,
      replyTo: params.email,
      subject: `Re: NGM Conference 5.0 - ${params.subject}`,
      html: renderContactMessageHtml(params),
    },
    {
      context: { from: params.email, type: "contact" },
      failureMessage: "Failed to send contact message email",
      successMessage: "Contact message email sent",
    },
  );
}
