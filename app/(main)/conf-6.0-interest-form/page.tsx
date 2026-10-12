import type { Metadata } from "next";
import { CalendarClock, Clock3, MapPin, UsersRound } from "lucide-react";
import { VolunteerInterestForm } from "@/components/volunteer-interest/VolunteerInterestForm";
import { VOLUNTEER_INTEREST_EVENT } from "@/lib/constants/volunteer-interest";

export const metadata: Metadata = {
  title: "Volunteer Expression of Interest | NGM Conference 6.0",
  description:
    "Express your interest in volunteering for NGM Conference 6.0 across planning, operations, media, technology, partnerships, and other teams.",
  openGraph: {
    title: "Volunteer for NGM Conference 6.0",
    description:
      "Submit a volunteer expression of interest for NGM Conference 6.0.",
    type: "website",
  },
};

export default function VolunteerInterestPage() {
  return (
    <div className="bg-gray-50 font-epilogue">
      <section className="relative overflow-hidden bg-[#05084a] px-4 py-14 text-white sm:px-6 sm:py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(13,160,76,0.28),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(15,25,144,0.85),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">
            <UsersRound className="size-4" aria-hidden="true" />
            Volunteer expression of interest
          </div>
          <h1 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">
            Help make {VOLUNTEER_INTEREST_EVENT.name} possible
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
            Tell us about your interests, competencies, experience, and
            availability so we can build capable volunteer teams for Conference
            6.0. Submitting this form does not guarantee selection.
          </p>

          <dl className="mt-7 grid max-w-3xl gap-3 text-sm text-white/90 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2.5">
              <Clock3
                className="size-4 shrink-0 text-[#52d28a]"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Estimated completion time</dt>
                <dd>About 12–15 minutes</dd>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2.5">
              <CalendarClock
                className="size-4 shrink-0 text-[#52d28a]"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Application deadline</dt>
                <dd>Deadline to be announced</dd>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2.5">
              <MapPin
                className="size-4 shrink-0 text-[#52d28a]"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Conference date and location</dt>
                <dd>Date and location to be confirmed</dd>
              </div>
            </div>
          </dl>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          {/* <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700">
            Complete the required fields in the first two sections. The
            “Experience and motivation” and “Availability and consent” sections
            are optional. Your answers remain on this page if a network or
            server error occurs.
          </div> */}
          <VolunteerInterestForm />
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 text-sm leading-6 text-gray-700 md:grid-cols-2">
          <article
            id="volunteer-interest-privacy-notice"
            className="scroll-mt-24 rounded-xl border border-gray-200 bg-white p-5"
          >
            <h2 className="font-bold text-gray-950">
              Volunteer interest privacy notice
            </h2>
            <p className="mt-2">
              NGM collects the information in this form to assess volunteer fit,
              contact applicants, assign shortlisted volunteers, and plan safe
              conference operations. We request your full residential/contact
              address specifically to assess proximity, transport and deployment
              logistics; it is treated as sensitive information and restricted
              to authorised team members with an operational need.
            </p>
            <p className="mt-2">
              Application details are not placed in public URLs or analytics and
              will be retained only for the period covered by NGM&apos;s
              approved volunteer-applicant retention process, then securely
              deleted or anonymised where appropriate.
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-bold text-gray-950">What happens next?</h2>
            <p className="mt-2">
              This is an expression of interest, not a selection notice.
              Shortlisted applicants will be contacted through the email address
              or WhatsApp number supplied. Team placement may consider your
              competencies, preferred roles, location, and availability.
            </p>
            <p className="mt-2">
              For form questions, email{" "}
              <a
                href={`mailto:${VOLUNTEER_INTEREST_EVENT.supportEmail}`}
                className="font-semibold text-[#0F1990] underline underline-offset-2 hover:no-underline"
              >
                {VOLUNTEER_INTEREST_EVENT.supportEmail}
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
