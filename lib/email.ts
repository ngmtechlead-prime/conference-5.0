import { Resend } from "resend";
import ApplicationReceivedEmail from "@/emails/ApplicationReceived";
import ApplicationAcceptedEmail from "@/emails/ApplicationAccepted";
import ApplicationDeclinedEmail from "@/emails/ApplicationDeclined";
import { emailLogger } from "@/lib/logger";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "NGM Conference <noreply@ngmconference.com>";

export async function sendApplicationReceivedEmail(
  to: string,
  applicantName: string,
  competition: string,
) {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Application Received - ${competition}`,
      react: ApplicationReceivedEmail({ applicantName, competition }),
    });

    if (error) {
      emailLogger.error(
        { error, to, type: "received" },
        "Failed to send application received email",
      );
      return { success: false, error };
    }

    emailLogger.info(
      { to, competition, type: "received" },
      "Application received email sent",
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
) {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Congratulations! Your ${competition} Application Has Been Accepted`,
      react: ApplicationAcceptedEmail({
        applicantName,
        competition,
        additionalInfo,
      }),
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
      "Application accepted email sent",
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
) {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Update on Your ${competition} Application`,
      react: ApplicationDeclinedEmail({
        applicantName,
        competition,
        reason,
      }),
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
      "Application declined email sent",
    );
    return { success: true };
  } catch (error) {
    emailLogger.error({ error, to, type: "declined" }, "Email send error");
    return { success: false, error };
  }
}
