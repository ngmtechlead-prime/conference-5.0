import type { Metadata } from "next";
import {
  ArrowUpRight,
  FileText,
  HandCoins,
  HeartHandshake,
  Users,
} from "lucide-react";
import Wrapper from "@/components/shared/Wrapper";

export const metadata: Metadata = {
  title: "More Info | NGM Conference 5.0",
  description:
    "Explore useful links and resources from the Nasir Giwa Mentorship Platform.",
};

export default function MoreInfoPage() {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute -left-32 top-12 size-72 rounded-full bg-[#0DA04C]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 size-80 rounded-full bg-[#0F1990]/10 blur-3xl"
      />

      <Wrapper className="relative">
        <div className="mx-auto max-w-2xl text-center font-epilogue">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#0DA04C]">
            NGM Resources
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#0F1990] sm:text-5xl lg:text-6xl">
            More Information
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#4A5565] sm:text-lg">
            Learn more about the Nasir Giwa Mentorship Platform and access
            helpful conference resources.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeytYe-U4oOdwSWZEFtbqayzxS7diWwCPMWc2Mh1KL_Swx0XQ/viewform"
            target="_blank"
            rel="noreferrer noopener"
            className="group flex min-h-64 flex-col rounded-2xl border border-[#0F1990]/10 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#0F1990]/25 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F1990] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#0F1990]/10 text-[#0F1990]">
                <Users aria-hidden="true" className="size-6" />
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-6 text-[#0F1990] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
            <div className="mt-auto pt-10 font-epilogue">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#111827]">
                Join NGM
              </h2>
              <p className="mt-2 leading-6 text-[#4A5565]">
                Become part of a community empowering the next generation of
                Nigerian leaders and entrepreneurs.
              </p>
            </div>
          </a>

          <a
            href="https://drive.google.com/file/d/1tFpS6alaaDzc1USCUC7unvEZ-A8_PZP-/view"
            target="_blank"
            rel="noreferrer noopener"
            className="group flex min-h-64 flex-col rounded-2xl border border-[#0DA04C]/15 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#0DA04C]/30 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0DA04C] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#0DA04C]/10 text-[#0DA04C]">
                <FileText aria-hidden="true" className="size-6" />
              </span>
              <div className="flex items-center gap-3">
                {/*<span className="rounded-full bg-[#0DA04C]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#087a3a]">
                  PDF · 40 MB
                </span>*/}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-6 text-[#0DA04C] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </div>
            <div className="mt-auto pt-10 font-epilogue">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#111827]">
                Conference Brochure
              </h2>
              <p className="mt-2 leading-6 text-[#4A5565]">
                View the official NGM Conference 5.0 brochure in Google Drive.
                Opens in a new tab.
              </p>
            </div>
          </a>

          <article className="flex min-h-64 flex-col rounded-2xl border border-[#0DA04C]/15 bg-white p-7 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#0DA04C]/10 text-[#0DA04C]">
                <HandCoins aria-hidden="true" className="size-6" />
              </span>
              {/*<span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
                Details to be updated
              </span>*/}
            </div>
            <div className="mt-auto pt-10 font-epilogue">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#111827]">
                Support the NGM Platform
              </h2>
              <p className="mt-2 leading-6 text-[#4A5565]">
                Your donation helps us continue empowering the next generation
                of Nigerian leaders and entrepreneurs.
              </p>
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="font-semibold text-[#111827]">Bank</dt>
                <dd className="text-[#4A5565]">Lotus Bank</dd>
                <dt className="font-semibold text-[#111827]">Account name</dt>
                <dd className="text-[#4A5565]">Nasir Giwa Mentorship Initiative</dd>
                <dt className="font-semibold text-[#111827]">Account number</dt>
                <dd className="font-mono text-[#4A5565]">1003411958</dd>
              </dl>
            </div>
          </article>

          <article className="flex min-h-64 flex-col rounded-2xl border border-gray-200 bg-white/70 p-7 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#0F1990]/10 text-[#0F1990]">
                <HeartHandshake aria-hidden="true" className="size-6" />
              </span>
              <span className="rounded-full bg-[#0DA04C]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#087a3a]">
                Coming soon
              </span>
            </div>
            <div className="mt-auto pt-10 font-epilogue">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#111827]">
                Volunteer for NGM Conference 6.0
              </h2>
              <p className="mt-2 leading-6 text-[#4A5565]">
                Join the planning committee and help shape the next NGM
                Conference experience.
              </p>
            </div>
          </article>
        </div>
      </Wrapper>
    </section>
  );
}
