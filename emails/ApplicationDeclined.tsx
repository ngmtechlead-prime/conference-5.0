import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ApplicationDeclinedEmailProps {
  applicantName: string;
  competition: string;
  reason?: string;
}

export default function ApplicationDeclinedEmail({
  applicantName,
  competition,
  reason,
}: ApplicationDeclinedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Update on your {competition} application</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>NGM 5.0 Conference</Heading>
          </Section>

          <Section style={content}>
            <Heading as="h2" style={h2}>
              Application Update
            </Heading>

            <Text style={text}>Dear {applicantName},</Text>

            <Text style={text}>
              Thank you for your interest in the <strong>{competition}</strong>{" "}
              and for taking the time to submit your application.
            </Text>

            <Text style={text}>
              After careful consideration, we regret to inform you that we are
              unable to move forward with your application at this time.
            </Text>

            {reason && (
              <Section style={infoBox}>
                <Text style={infoText}>
                  <strong>Feedback:</strong>
                  <br />
                  {reason}
                </Text>
              </Section>
            )}

            <Text style={text}>
              We received many strong applications this year, and the selection
              process was highly competitive. We encourage you to continue
              pursuing your goals and to consider applying for future
              opportunities.
            </Text>

            <Text style={text}>
              We appreciate your interest in NGM and wish you all the best in
              your future endeavors.
            </Text>

            <Text style={text}>
              Best regards,
              <br />
              The NGM Conference Team
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Nasir Giwa Mentorship. All rights
              reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#0F1990",
  padding: "24px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const h2 = {
  color: "#1a1a1a",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const content = {
  padding: "32px 24px",
};

const text = {
  color: "#525252",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const infoBox = {
  backgroundColor: "#fef2f2",
  border: "1px solid #fecaca",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
};

const infoText = {
  color: "#991b1b",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
};

const footer = {
  borderTop: "1px solid #e6e6e6",
  padding: "24px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#8898aa",
  fontSize: "12px",
  margin: "0",
};
