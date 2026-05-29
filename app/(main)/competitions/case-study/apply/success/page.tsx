"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ApplicationReceivedIcon from "@/components/shared/ApplicationReceivedIcon";

export default function SuccessPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 font-epilogue">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <ApplicationReceivedIcon />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-[#0F1990]">Application </span>
          <span className="text-[#0DA04C]">Received</span>
        </h1>

        <p className="text-gray-600 text-base md:text-lg mb-8 max-w-xl mx-auto">
          Thank you for applying to the NGM CONFERENCE 5.0 CASE STUDY & RESEARCH ANALYSIS COMPETITION. Your application has been successfully received. We will be reaching out to you via email soon to confirm whether you will proceed to the next round.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#0F1990] hover:bg-[#0F1990]/90 text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors"
        >
          Return to Homepage
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
