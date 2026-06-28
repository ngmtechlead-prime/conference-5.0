import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { emailLogger } from "@/lib/logger";

export type Competition = "dare_nigeria" | "sme_pitch" | "case_study";

const getCompetionName = (competition: Competition) => {
  switch (competition) {
    case "dare_nigeria":
      return "DARE Nigeria Challenge";
    case "sme_pitch":
      return "SME Pitch Competition";
    case "case_study":
      return "Case Study & Research Analysis Competition";
    default:
      return "";
  }
};

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "NGM Conference 5.0 <info@ngmplatform.com>";

function loadTemplate(
  templateName: string,
  competitionType: Competition,
  variables: Record<string, string>,
): string {
  const templatePath = path.join(
    process.cwd(),
    "emails",
    "html",
    competitionType,
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
  competitionType: Competition,
  competitionUrl?: string,
) {
  try {
    const competition = getCompetionName(competitionType);
    const html = loadTemplate("received", competitionType, {
      first_name: applicantName,
      competition_name: competition,
      competition_url: competitionUrl || "https://conference.ngmplatform.com",
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
  competitionType: Competition,
  additionalInfo?: string,
  competitionUrl?: string,
) {
  try {
    const competition = getCompetionName(competitionType);
    const html = loadTemplate("accepted", competitionType, {
      first_name: applicantName,
      competition_name: competition,
      competition_url: competitionUrl || "https://conference.ngmplatform.com",
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
  competitionType: Competition,
  reason?: string,
  competitionUrl?: string,
) {
  try {
    const competition = getCompetionName(competitionType);
    const html = loadTemplate("declined", competitionType, {
      first_name: applicantName,
      competition_name: competition,
      competition_url: competitionUrl || "https://conference.ngmplatform.com",
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
