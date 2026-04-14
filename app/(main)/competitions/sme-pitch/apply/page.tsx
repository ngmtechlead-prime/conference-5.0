"use client";

import { useState, useEffect } from "react";
import FormProgress from "@/components/competitions/sme-pitch/FormProgress";
import FounderBusinessForm from "@/components/competitions/sme-pitch/steps/FounderBusinessForm";
import PitchFundingForm from "@/components/competitions/sme-pitch/steps/PitchFundingForm";
import DocumentsMediaForm from "@/components/competitions/sme-pitch/steps/DocumentsMediaForm";
import DeclarationForm from "@/components/competitions/sme-pitch/steps/DeclarationForm";
import SuccessPage from "@/components/competitions/sme-pitch/SuccessPage";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/sme-pitch";
import { submitSMEPitchApplication } from "@/lib/api/submissions";
import type {
  Step1FormData,
  Step2FormData,
  Step3FormData,
  Step4FormData,
} from "@/lib/schemas/sme-pitch";

interface FormData {
  step1?: Step1FormData;
  step2?: Step2FormData;
  step3?: Step3FormData;
  step4?: Step4FormData;
}

export default function SMEPitchApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || {});
        setCurrentStep(parsed.currentStep || 1);
      } catch {
        console.error("Failed to parse saved form data");
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && !isSubmitted) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          formData,
          currentStep,
          lastUpdated: new Date().toISOString(),
        }),
      );
    }
  }, [formData, currentStep, isLoaded, isSubmitted]);

  const handleStep1Submit = (data: Step1FormData) => {
    setFormData((prev) => ({ ...prev, step1: data }));
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep2Submit = (data: Step2FormData) => {
    setFormData((prev) => ({ ...prev, step2: data }));
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep3Submit = (data: Step3FormData) => {
    setFormData((prev) => ({ ...prev, step3: data }));
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep4Submit = async (data: Step4FormData) => {
    setIsSubmitting(true);
    const finalData = { ...formData, step4: data };

    try {
      const result = await submitSMEPitchApplication(finalData);

      if (!result.success) {
        throw new Error(result.error);
      }

      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to submit application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1990]"></div>
      </div>
    );
  }

  if (isSubmitted) {
    return <SuccessPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-10">
          <FormProgress currentStep={currentStep} />

          {currentStep === 1 && (
            <FounderBusinessForm
              defaultValues={formData.step1}
              onSubmit={handleStep1Submit}
            />
          )}

          {currentStep === 2 && (
            <PitchFundingForm
              defaultValues={formData.step2}
              onSubmit={handleStep2Submit}
              onBack={goBack}
            />
          )}

          {currentStep === 3 && (
            <DocumentsMediaForm
              defaultValues={formData.step3}
              onSubmit={handleStep3Submit}
              onBack={goBack}
            />
          )}

          {currentStep === 4 && (
            <DeclarationForm
              defaultValues={formData.step4}
              onSubmit={handleStep4Submit}
              onBack={goBack}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}
