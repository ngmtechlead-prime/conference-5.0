import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { emailLogger } from "@/lib/logger";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "NGM Conference 5.0 <info@ngmplatform.com>";

function loadTemplate(
  templateName: string,
  variables: Record<string, string>,
): string {
  const templatePath = path.join(
    process.cwd(),
    "emails",
    "html",
    `${templateName}.html`,
  );
  let html = fs.readFileSync(templatePath, "utf-8");
  for (const [key, value] of Object.entries(variables)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }
  return html;
}

export async function sendApplicationReceivedEmail(
  to: string,
  applicantName: string,
  competition: string,
  competitionUrl?: string,
) {
  try {
    const html = loadTemplate("received", {
      first_name: applicantName,
      competition_name: competition,
      competition_url:
        competitionUrl || "https://kaleidoscopic-stardust-3041fd.netlify.app",
    });

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Application Received - ${competition}`,
      html,
    });

    if (error) {
      emailLogger.error(
        { error, to, type: "received" },
        "Failed to send 'Application Received' email",
      );
      return { success: false, error };
    }

    emailLogger.info(
      { to, competition, type: "received" },
      "'Application Received' email sent",
    );
    return { success: true };
  } catch (error) {
    emailLogger.error({ error, to, type: "received" }, "Email send error");
    return { success: false, error };
  }
}

export async function sendApplicationAcceptedEmail(
  to: string,
  applicantName: string,
  competition: string,
  additionalInfo?: string,
  competitionUrl?: string,
) {
  try {
    const html = loadTemplate("accepted", {
      first_name: applicantName,
      competition_name: competition,
      competition_url: competitionUrl || "#",
    });

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Congratulations! Your ${competition} Application Has Been Accepted`,
      html,
    });

    if (error) {
      emailLogger.error(
        { error, to, type: "accepted" },
        "Failed to send acceptance email",
      );
      return { success: false, error };
    }

    emailLogger.info(
      { to, competition, type: "accepted" },
      "'Application Accepted' email sent",
    );
    return { success: true };
  } catch (error) {
    emailLogger.error({ error, to, type: "accepted" }, "Email send error");
    return { success: false, error };
  }
}

export async function sendApplicationDeclinedEmail(
  to: string,
  applicantName: string,
  competition: string,
  reason?: string,
  competitionUrl?: string,
) {
  try {
    const html = loadTemplate("declined", {
      first_name: applicantName,
      competition_name: competition,
      competition_url: competitionUrl || "#",
    });

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Update on Your ${competition} Application`,
      html,
    });

    if (error) {
      emailLogger.error(
        { error, to, type: "declined" },
        "Failed to send decline email",
      );
      return { success: false, error };
    }

    emailLogger.info(
      { to, competition, type: "declined" },
      "'Application Declined' email sent",
    );
    return { success: true };
  } catch (error) {
    emailLogger.error({ error, to, type: "declined" }, "Email send error");
    return { success: false, error };
  }
}
