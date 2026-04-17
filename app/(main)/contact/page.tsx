import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Contact | NGM Conference 5.0",
  description:
    "Get in touch with the NGM Conference 5.0 team. We're here to help with any questions.",
};

export default function ContactPage() {
  return (
    <ComingSoon
      title="Contact"
      description="Our contact page is being set up. In the meantime, reach out to us on our social media channels or email us at info@ngmplatform.com."
    />
  );
}
