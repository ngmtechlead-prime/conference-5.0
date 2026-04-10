"use client";

import { cn } from "@/lib/utils";
import { FORM_STEPS } from "@/lib/constants/sme-pitch";
import { Check } from "lucide-react";

interface FormProgressProps {
  currentStep: number;
}

export default function FormProgress({ currentStep }: FormProgressProps) {
  return (
    <div className="w-full py-8 font-epilogue">
      <div className="flex items-center justify-center">
        {FORM_STEPS.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all",
                  currentStep > step.number
                    ? "bg-[#0DA04C] border-[#0DA04C] text-white"
                    : currentStep === step.number
                      ? "bg-[#0F1990] border-[#0F1990] text-white"
                      : "bg-white border-gray-300 text-gray-400",
                )}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs text-center max-w-[100px]",
                  currentStep > step.number
                    ? "text-[#0DA04C] font-medium"
                    : currentStep === step.number
                      ? "text-[#0F1990] font-medium"
                      : "text-gray-400",
                )}
              >
                {step.title}
              </span>
            </div>
            {index < FORM_STEPS.length - 1 && (
              <div
                className={cn(
                  "w-16 sm:w-24 h-0.5 mx-2 transition-all",
                  currentStep > step.number ? "bg-[#0DA04C]" : "bg-gray-300",
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
