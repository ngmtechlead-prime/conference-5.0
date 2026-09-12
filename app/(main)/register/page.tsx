import type { Metadata } from "next";
import { CalendarDays, MapPin, TicketCheck } from "lucide-react";
import { ConferenceRegistrationForm } from "@/components/registration/ConferenceRegistrationForm";
import { REGISTRATION_EVENT } from "@/lib/constants/registration";

export const metadata: Metadata = {
  title: "Sponsored Ticket Registration | NGM Conference 5.0",
  description:
    "Complete your sponsored or complimentary ticket registration for NGM Conference 5.0.",
};

export default function ConferenceRegistrationPage() {
  return (
    <div className="bg-gray-50 font-epilogue">
      <section className="relative overflow-hidden bg-[#05084a] px-4 py-14 text-white sm:px-6 sm:py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(13,160,76,0.25),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(15,25,144,0.8),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">
            <TicketCheck className="size-4" aria-hidden="true" />
            Sponsored & complimentary tickets
          </div>
          <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            NGM Conference 5.0 Registration
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
            This form is for recipients of sponsored, discounted, or
            complimentary tickets. Select your attendee category and provide
            the details needed to confirm your place.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-white/85 sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-[#0DA04C]" aria-hidden="true" />
              {REGISTRATION_EVENT.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-[#0DA04C]" aria-hidden="true" />
              {REGISTRATION_EVENT.location}
            </span>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <ConferenceRegistrationForm />
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 text-sm leading-6 text-gray-700 md:grid-cols-2">
          <article
            id="registration-privacy-notice"
            className="scroll-mt-24 rounded-xl border border-gray-200 bg-white p-5"
          >
            <h2 className="font-bold text-gray-900">Registration privacy notice</h2>
            <p className="mt-2">
              NGM collects the information in this form to verify and administer
              your Conference 5.0 attendance, communicate event updates, and
              support conference-day operations. Access is limited to authorized
              conference staff. We do not include personal registration details
              in analytics.
            </p>
          </article>
          <article
            id="registration-terms"
            className="scroll-mt-24 rounded-xl border border-gray-200 bg-white p-5"
          >
            <h2 className="font-bold text-gray-900">Registration terms</h2>
            <p className="mt-2">
              Submit accurate attendee information and use this form only for a
              ticket issued to you. Undergraduate attendees must bring valid
              proof of student status. For corrections or questions, email{" "}
              <a
                href={`mailto:${REGISTRATION_EVENT.supportEmail}`}
                className="font-semibold text-[#0F1990] underline underline-offset-2"
              >
                {REGISTRATION_EVENT.supportEmail}
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
