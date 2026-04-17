import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Agenda | NGM Conference 5.0",
  description:
    "View the full agenda for NGM Conference 5.0. Sessions, workshops, and networking events.",
};

export default function AgendaPage() {
  return (
    <ComingSoon
      title="Agenda"
      description="We're finalizing an exciting schedule of sessions, workshops, and networking events. The full agenda will be available soon."
    />
  );
}
