"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TermsModal from "@/components/shared/TermsModal";
import {
  FormField,
  Input,
  RadioGroup,
  Textarea,
} from "@/components/ui/FormField";
import { CASE_STUDY_LOCAL_STORAGE_KEY } from "@/lib/constants/case-study";
import {
  caseStudySchema,
  type CaseStudyFormData,
} from "@/lib/schemas/case-study";
import { submitCaseStudyApplication } from "@/lib/api/submissions";
import Image from "next/image";

export default function CaseStudyApplyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CaseStudyFormData>({
    resolver: zodResolver(caseStudySchema),
  });

  const formData = watch();

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(CASE_STUDY_LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          Object.entries(parsed).forEach(([key, value]) => {
            setValue(key as keyof CaseStudyFormData, value as any);
          });
        }
      } catch (error) {
        console.error("Failed to parse saved form data", error);
      }
    }
    setIsLoaded(true);
  }, [setValue]);

  // Auto-save form data when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        CASE_STUDY_LOCAL_STORAGE_KEY,
        JSON.stringify(formData),
      );
    }
  }, [formData, isLoaded]);

  const onSubmit = async (data: CaseStudyFormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitCaseStudyApplication(data);

      if (!result.success) {
        throw new Error(result.error);
      }

      // Clear saved data on success
      localStorage.removeItem(CASE_STUDY_LOCAL_STORAGE_KEY);

      router.push("/competitions/case-study/apply/success");
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

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTermsModal(false);
  };

  const handleCancelTerms = () => {
    router.push("/competitions/case-study");
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1990]"></div>
      </div>
    );
  }

  const shouldShowTermsModal = !termsAccepted && showTermsModal;

  const yesNoOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  return (
    <section className="flex flex-col min-h-screen bg-gray-50">
      {/* <TermsModal
        competition="Case Study & Research Analysis Competition 2026"
        isOpen={shouldShowTermsModal}
        onAccept={handleAcceptTerms}
        onCancel={handleCancelTerms}
      /> */}

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-12 font-epilogue">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="mb-8 border-b border-gray-100 pb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1990] mb-2 tracking-[-0.04em]">
                Application Form
              </h1>
              <p className="text-gray-500 text-sm">
                Complete the form below to apply for the Case Study Competition.
                All fields marked with an asterisk (*) are required.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <FormField label="Full Name" required error={errors.fullName}>
                  <Input
                    {...register("fullName")}
                    placeholder="Enter your full name"
                    error={!!errors.fullName}
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    label="Email Address"
                    required
                    error={errors.email}
                  >
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="you@example.com"
                      error={!!errors.email}
                    />
                  </FormField>

                  <FormField
                    label="Phone Number"
                    required
                    error={errors.phoneNumber}
                  >
                    <Input
                      {...register("phoneNumber")}
                      type="tel"
                      placeholder="+234 XXX XXXX"
                      error={!!errors.phoneNumber}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Gender" required error={errors.gender}>
                    <RadioGroup
                      name="gender"
                      options={[
                        { value: "Female", label: "Female" },
                        { value: "Male", label: "Male" },
                      ]}
                      value={formData.gender}
                      onChange={(val) =>
                        setValue("gender", val as "Female" | "Male")
                      }
                      error={!!errors.gender}
                    />
                  </FormField>

                  <FormField label="Age" required error={errors.age}>
                    <RadioGroup
                      name="age"
                      options={[
                        { value: "16 - 20", label: "16 - 20" },
                        { value: "20 - 25", label: "20 - 25" },
                        { value: "25 - 30", label: "25 - 30" },
                        { value: "30 - 35", label: "30 - 35" },
                      ]}
                      value={formData.age}
                      onChange={(val) =>
                        setValue(
                          "age",
                          val as "16 - 20" | "20 - 25" | "25 - 30" | "30 - 35",
                        )
                      }
                      error={!!errors.age}
                    />
                  </FormField>
                </div>

                <div className="space-y-6 pt-4 border-t border-gray-100">
                  <FormField
                    label="Have you ever analysed a case?"
                    required
                    error={errors.hasAnalysedCase}
                  >
                    <RadioGroup
                      name="hasAnalysedCase"
                      options={yesNoOptions}
                      value={formData.hasAnalysedCase}
                      onChange={(val) =>
                        setValue("hasAnalysedCase", val as "Yes" | "No")
                      }
                      error={!!errors.hasAnalysedCase}
                    />
                  </FormField>

                  <FormField
                    label="Have you ever participated in any NGM case study challenge?"
                    required
                    error={errors.hasParticipatedInNGMCaseStudy}
                  >
                    <RadioGroup
                      name="hasParticipatedInNGMCaseStudy"
                      options={yesNoOptions}
                      value={formData.hasParticipatedInNGMCaseStudy}
                      onChange={(val) =>
                        setValue(
                          "hasParticipatedInNGMCaseStudy",
                          val as "Yes" | "No",
                        )
                      }
                      error={!!errors.hasParticipatedInNGMCaseStudy}
                    />
                  </FormField>

                  <FormField
                    label="Are you committing to partake in all meetings and trainings as needed?"
                    required
                    error={errors.isCommittingToMeetings}
                  >
                    <RadioGroup
                      name="isCommittingToMeetings"
                      options={yesNoOptions}
                      value={formData.isCommittingToMeetings}
                      onChange={(val) =>
                        setValue("isCommittingToMeetings", val as "Yes" | "No")
                      }
                      error={!!errors.isCommittingToMeetings}
                    />
                  </FormField>

                  <FormField
                    label="Have you registered for NGM Conference 5.0?"
                    required
                    error={errors.hasRegisteredForConference}
                  >
                    <RadioGroup
                      name="hasRegisteredForConference"
                      options={yesNoOptions}
                      value={formData.hasRegisteredForConference}
                      onChange={(val) =>
                        setValue(
                          "hasRegisteredForConference",
                          val as "Yes" | "No",
                        )
                      }
                      error={!!errors.hasRegisteredForConference}
                    />
                  </FormField>

                  <FormField
                    label="NGM Conference 5.0 Ticket ID"
                    required
                    error={errors.ticketId}
                    hint="You must have a valid ticket to participate."
                  >
                    <Input
                      {...register("ticketId")}
                      placeholder="Enter your ticket ID"
                      error={!!errors.ticketId}
                    />
                  </FormField>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <FormField
                    label="Any other questions or comments?"
                    error={errors.comments}
                  >
                    <Textarea
                      {...register("comments")}
                      placeholder="Optional comments..."
                      rows={4}
                      error={!!errors.comments}
                    />
                  </FormField>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-[#0F1990] hover:bg-blue-950 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Image
                        src="/icons/rightArrow.svg"
                        alt="Submit"
                        width={16}
                        height={16}
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
