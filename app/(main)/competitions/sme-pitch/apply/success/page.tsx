import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ApplicationReceivedIcon from "@/components/shared/ApplicationReceivedIcon";
import { ClearLocalStorage } from "./ClearLocalStorage";

export const metadata: Metadata = {
  title: "Application Submitted | SME Pitch",
  description:
    "Your application to the SME Pitch 2026 has been successfully submitted.",
};

export default function ApplicationSuccessPage() {
  return (
    <>
      <ClearLocalStorage />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-12 font-epilogue">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              {/* <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div> */}
              <ApplicationReceivedIcon />
            </div>

            <h1 className="text-3xl sm:text-4xl tracking-tight font-normal text-[#0F1990] mb-4">
              Application{" "}
              <span className="text-[#0DA04C] font-semibold">Received!</span>
            </h1>

            <p className="text-lg text-[#4A5565] mb-8">
              Thank you for applying to the DARE Nigeria Challenge 2026. Your
              application has been successfully received. We will be reaching
              out to you via email soon to confirm whether you will proceed to
              the next round.
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
