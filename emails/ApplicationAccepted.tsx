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

interface ApplicationAcceptedEmailProps {
  applicantName: string;
  competition: string;
  additionalInfo?: string;
}

export default function ApplicationAcceptedEmail({
  applicantName,
  competition,
  additionalInfo,
}: ApplicationAcceptedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Congratulations! Your {competition} application has been accepted
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>NGM 5.0 Conference</Heading>
          </Section>

          <Section style={content}>
            <Heading as="h2" style={h2}>
              🎉 Congratulations!
            </Heading>

            <Text style={text}>Dear {applicantName},</Text>

            <Text style={text}>
              We are thrilled to inform you that your application to the{" "}
              <strong>{competition}</strong> has been{" "}
              <strong style={{ color: "#16a34a" }}>accepted</strong>!
            </Text>

            <Text style={text}>
              Your submission stood out among many applications, and we believe
              you have what it takes to make a significant impact.
            </Text>

            {additionalInfo && (
              <Section style={infoBox}>
                <Text style={infoText}>
                  <strong>Next Steps:</strong>
                  <br />
                  {additionalInfo}
                </Text>
              </Section>
            )}

            <Text style={text}>
              Please stay tuned for further communication regarding the next
              steps. We look forward to seeing you at the conference!
            </Text>

            <Text style={text}>
              Congratulations once again,
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
  backgroundColor: "#f0fdf4",
  border: "1px solid #bbf7d0",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
};

const infoText = {
  color: "#166534",
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
