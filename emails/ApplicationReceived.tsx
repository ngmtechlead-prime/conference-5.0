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

interface ApplicationReceivedEmailProps {
  applicantName: string;
  competition: string;
}

export default function ApplicationReceivedEmail({
  applicantName,
  competition,
}: ApplicationReceivedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your {competition} application has been received</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>NGM 5.0 Conference</Heading>
          </Section>

          <Section style={content}>
            <Heading as="h2" style={h2}>
              Application Received
            </Heading>

            <Text style={text}>Dear {applicantName},</Text>

            <Text style={text}>
              Thank you for submitting your application to the{" "}
              <strong>{competition}</strong>. We have successfully received your
              submission.
            </Text>

            <Text style={text}>
              Our team will carefully review your application. You will receive
              an email notification once a decision has been made regarding your
              application status.
            </Text>

            <Text style={text}>
              If you have any questions in the meantime, please don&apos;t hesitate
              to reach out to us.
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
