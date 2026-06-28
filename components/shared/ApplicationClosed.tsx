import React from "react";
import ApplicationReceivedIcon from "./ApplicationReceivedIcon";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  competitionType: "dare_nigeria" | "sme_pitch" | "case_study";
}

export default function ApplicationClosedPage({ competitionType }: Props) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-12 font-epilogue">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <ApplicationReceivedIcon />
            </div>

            <h1 className="text-3xl sm:text-4xl tracking-tight font-normal text-[#0F1990] mb-4">
              Application Duration{" "}
              <span className="text-[#0DA04C] font-semibold">Closed!</span>
            </h1>

            <p className="text-lg text-[#4A5565] mb-8">
              The application period for the{" "}
              {competitionType === "dare_nigeria"
                ? "DARE Nigeria Challenge 2026"
                : competitionType === "sme_pitch"
                  ? "SME Pitch Competition"
                  : "Case Study Competition"}{" "}
              has closed. Thank you for your interest in participating.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-[#0F1990] hover:bg-[#0F1990]/90 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
              >
                Return to HomePage
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
