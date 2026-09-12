import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ConferenceTicketType } from "@/types/registration";

interface RegistrationSuccessProps {
  reference?: string;
  ticketType?: ConferenceTicketType;
}

export function RegistrationSuccess({
  reference,
  ticketType,
}: RegistrationSuccessProps) {
  return (
    <section className="min-h-[65vh] bg-gray-50 px-4 py-16 font-epilogue sm:px-6">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <CheckCircle2
          className="mx-auto size-16 text-[#0DA04C]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#0F1990] sm:text-4xl">
          Registration Complete
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600">
          Your sponsored ticket registration for NGM Conference 5.0 has been
          received. A confirmation email has been sent to the address you
          provided.
        </p>

        {reference ? (
          <div className="mx-auto mt-7 max-w-sm rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Registration reference
            </p>
            <p className="mt-1 break-all text-xl font-bold tracking-wide text-[#0F1990]">
              {reference}
            </p>
            <p className="mt-2 text-xs leading-5 text-gray-600">
              Keep this reference for conference-day support.
            </p>
          </div>
        ) : (
          <p className="mt-6 text-sm leading-6 text-gray-600">
            Your reference is included in your confirmation email.
          </p>
        )}

        {ticketType === "UNDERGRADUATE" ? (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left text-sm leading-6 text-amber-950">
            <strong>Undergraduate reminder:</strong> Bring valid proof of your
            current student status on the conference day. Your sponsored ticket
            may be cancelled if you cannot provide proof.
          </div>
        ) : null}

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0F1990] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1990] focus-visible:ring-offset-2"
        >
          Return to Homepage
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
