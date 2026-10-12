import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Interest Received | NGM Conference 6.0",
  description:
    "Confirmation that your NGM Conference 6.0 volunteer expression of interest was received.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VolunteerInterestSuccessPage() {
  return (
    <div className="flex min-h-[70vh] items-center bg-gray-50 px-4 py-14 font-epilogue sm:px-6">
      <section
        aria-labelledby="success-heading"
        className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10"
      >
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="size-9" aria-hidden="true" />
        </span>
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-green-700">
          Expression of interest received
        </p>
        <h1
          id="success-heading"
          className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl"
        >
          Thank you for your interest in volunteering
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
          We have received your NGM Conference 6.0 volunteer expression of
          interest. Submitting this form is not a selection or placement notice.
          Our team will review applications and contact shortlisted applicants
          through the email address or WhatsApp number supplied.
        </p>


        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0F1990] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1990] focus-visible:ring-offset-2"
        >
          <Home className="size-4" aria-hidden="true" />
          Return to the NGM home page
        </Link>
      </section>
    </div>
  );
}
