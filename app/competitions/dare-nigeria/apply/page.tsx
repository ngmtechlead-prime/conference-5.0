"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import TermsModal from "@/components/competitions/dare-nigeria/TermsModal";
import FormProgress from "@/components/competitions/dare-nigeria/FormProgress";
import ApplicantProfileForm from "@/components/competitions/dare-nigeria/steps/ApplicantProfileForm";
import InnovationPitchForm from "@/components/competitions/dare-nigeria/steps/InnovationPitchForm";
import FundingMediaForm from "@/components/competitions/dare-nigeria/steps/FundingMediaForm";
import CommitmentForm from "@/components/competitions/dare-nigeria/steps/CommitmentForm";
import { useDareNigeriaForm } from "@/hooks/useDareNigeriaForm";
import type {
  Step1FormData,
  Step2FormData,
  Step3FormData,
  Step4FormData,
} from "@/lib/schemas/dare-nigeria";

export default function DareNigeriaApplyPage() {
  const router = useRouter();
  const [showTermsModal, setShowTermsModal] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    formData,
    isLoading,
    termsAccepted,
    acceptTerms,
    updateStep1,
    updateStep2,
    updateStep3,
    updateStep4,
    setCurrentStep,
    clearFormData,
  } = useDareNigeriaForm();

  const handleAcceptTerms = () => {
    acceptTerms();
    setShowTermsModal(false);
  };

  const handleCancelTerms = () => {
    router.push("/competitions/dare-nigeria");
  };

  const handleStep1Submit = (data: Step1FormData) => {
    updateStep1(data);
  };

  const handleStep2Submit = (data: Step2FormData) => {
    updateStep2(data);
  };

  const handleStep3Submit = (data: Step3FormData) => {
    updateStep3(data);
  };

  const handleStep4Submit = async (data: Step4FormData) => {
    setIsSubmitting(true);
    try {
      updateStep4(data);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      clearFormData();
      router.push("/competitions/dare-nigeria/apply/success");
    } catch (error) {
      console.error("Error submitting application:", error);
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (formData.currentStep > 1) {
      setCurrentStep(formData.currentStep - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  const shouldShowTermsModal = !termsAccepted && showTermsModal;

  return (
    <section className="flex flex-col min-h-screen">
      <TermsModal
        isOpen={shouldShowTermsModal}
        onAccept={handleAcceptTerms}
        onCancel={handleCancelTerms}
      />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <FormProgress currentStep={formData.currentStep} />

          <div className="bg-white rounded-br-2xl rounded-bl-2xl border border-t-0 border-gray-200 p-6 sm:p-8 lg:p-10">
            {formData.currentStep === 1 && (
              <ApplicantProfileForm
                defaultValues={formData.step1}
                onSubmit={handleStep1Submit}
              />
            )}

            {formData.currentStep === 2 && (
              <InnovationPitchForm
                defaultValues={formData.step2}
                onSubmit={handleStep2Submit}
                onBack={handleBack}
              />
            )}

            {formData.currentStep === 3 && (
              <FundingMediaForm
                defaultValues={formData.step3}
                onSubmit={handleStep3Submit}
                onBack={handleBack}
              />
            )}

            {formData.currentStep === 4 && (
              <CommitmentForm
                defaultValues={formData.step4}
                onSubmit={handleStep4Submit}
                onBack={handleBack}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
