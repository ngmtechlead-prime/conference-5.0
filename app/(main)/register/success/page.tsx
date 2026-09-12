import type { Metadata } from "next";
import { RegistrationSuccess } from "@/components/registration/RegistrationSuccess";
import type { ConferenceTicketType } from "@/types/registration";

export const metadata: Metadata = {
  title: "Registration Complete | NGM Conference 5.0",
  description: "Your NGM Conference 5.0 registration has been received.",
  robots: {
    index: false,
    follow: false,
  },
};

interface RegistrationSuccessPageProps {
  searchParams: Promise<{
    reference?: string | string[];
    ticketType?: string | string[];
  }>;
}

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function validReference(value: string | undefined) {
  if (!value || !/^[A-Z0-9-]{6,40}$/i.test(value)) return undefined;
  return value;
}

function validTicketType(value: string | undefined): ConferenceTicketType | undefined {
  if (value === "UNDERGRADUATE" || value === "GRADUATE_PROFESSIONAL") {
    return value;
  }
  return undefined;
}

export default async function RegistrationSuccessPage({
  searchParams,
}: RegistrationSuccessPageProps) {
  const params = await searchParams;

  return (
    <RegistrationSuccess
      reference={validReference(firstValue(params.reference))}
      ticketType={validTicketType(firstValue(params.ticketType))}
    />
  );
}
