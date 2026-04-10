"use client";

import { cn } from "@/lib/utils";
import { FORM_STEPS } from "@/lib/constants/dare-nigeria";
import { User, Lightbulb, FileText, ShieldCheck } from "lucide-react";
import { Fragment } from "react";

interface FormProgressProps {
  currentStep: number;
}

const stepIcons = [User, Lightbulb, FileText, ShieldCheck];

export default function FormProgress({ currentStep }: FormProgressProps) {
  return (
    <div className="w-full font-epilogue">
      <div className="bg-[#f8f9fa] rounded-tr-2xl rounded-tl-2xl border border-gray-200 py-10 px-4 sm:px-10">
        <div className="flex items-center justify-center">
          {FORM_STEPS.map((step, index) => {
            const Icon = stepIcons[index];
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <Fragment key={step.number}>
                <div className="flex">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                        isActive || isCompleted
                          ? "bg-[#0F1990] text-white"
                          : "bg-white border-2 border-gray-300 text-[#0F1990]",
                      )}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <span
                      className={cn(
                        "mt-3 text-xs text-center whitespace-nowrap",
                        isActive
                          ? "text-[#0F1990] font-semibold"
                          : "text-gray-500",
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>
                {index < FORM_STEPS.length - 1 && (
                  <div
                    className={cn(
                      "w-20 sm:w-28 lg:w-48 h-1 mx-3 -mt-6 transition-all",
                      isCompleted ? "bg-[#0F1990]" : "bg-gray-300",
                    )}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
