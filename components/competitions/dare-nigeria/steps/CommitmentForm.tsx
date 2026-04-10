"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema, Step4FormData } from "@/lib/schemas/dare-nigeria";
import { FormField, Input, Select, Textarea } from "@/components/ui/FormField";
import {
  AVAILABILITY_OPTIONS,
  RELOCATION_OPTIONS,
  MENTORSHIP_OPTIONS,
  HEARD_ABOUT_OPTIONS,
} from "@/lib/constants/dare-nigeria";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommitmentFormProps {
  defaultValues?: Partial<Step4FormData>;
  onSubmit: (data: Step4FormData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export default function CommitmentForm({
  defaultValues,
  onSubmit,
  onBack,
  isSubmitting = false,
}: CommitmentFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      availability: {
        fullAvailability: "",
        willingToRelocate: "",
        openToMentorship: "",
      },
      declaration: {
        howHeardAbout: "",
        whyDare: "",
        agreements: {
          isNigerianCitizen: false,
          accurateInformation: false,
          ideaStage: false,
          originalCreator: false,
          understandsDisqualification: false,
          commitsToParticipate: false,
          consentsToDataUse: false,
          acceptsTerms: false,
        },
        digitalSignature: "",
        signatureDate: "",
      },
      ...defaultValues,
    },
  });

  const watchWhyDare = watch("declaration.whyDare", "");

  const agreementItems = [
    {
      key: "isNigerianCitizen" as const,
      label:
        "I am a Nigerian citizen between the ages of 18 and 40 at the time of this application.",
    },
    {
      key: "accurateInformation" as const,
      label:
        "All information provided in this form is accurate, truthful, and complete.",
    },
    {
      key: "ideaStage" as const,
      label:
        "My innovation is at idea or prototype stage and has NOT received institutional funding.",
    },
    {
      key: "originalCreator" as const,
      label:
        "I am the original creator or lead representative of the submitted innovation.",
    },
    {
      key: "understandsDisqualification" as const,
      label:
        "I understand that any false or misleading information will result in immediate disqualification.",
    },
    {
      key: "commitsToParticipate" as const,
      label:
        "I commit to participating in all phases of the DARE Nigeria Challenge 2026 if shortlisted.",
    },
    {
      key: "consentsToDataUse" as const,
      label:
        "I consent to the NGM Platform and Dr. Kola Adesina's team using my submitted information for competition purposes.",
    },
    {
      key: "acceptsTerms" as const,
      label:
        "I accept the Terms and Conditions of the DARE Nigeria Challenge 2026 in full.",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 font-epilogue"
    >
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Availability & Commitment
        </h2>

        <div className="space-y-6">
          <FormField
            label="Will you be fully available for all phases of the DARE Nigeria Challenge 2026?"
            required
            error={errors.availability?.fullAvailability}
          >
            <Controller
              name="availability.fullAvailability"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="availability"
                        value={opt.value}
                        checked={field.value === opt.value}
                        onChange={() => field.onChange(opt.value)}
                        className="w-4 h-4 text-[#0F1990] focus:ring-[#0F1990]"
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}
            />
          </FormField>

          <FormField
            label="Are you willing to relocate temporarily or travel to Lagos for the Final Pitch Event if shortlisted?"
            required
            error={errors.availability?.willingToRelocate}
          >
            <Controller
              name="availability.willingToRelocate"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {RELOCATION_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="relocation"
                        value={opt.value}
                        checked={field.value === opt.value}
                        onChange={() => field.onChange(opt.value)}
                        className="w-4 h-4 text-[#0F1990] focus:ring-[#0F1990]"
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}
            />
          </FormField>

          <FormField
            label="Are you open to receiving structured mentorship and guidance throughout the challenge?"
            required
            error={errors.availability?.openToMentorship}
          >
            <Controller
              name="availability.openToMentorship"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {MENTORSHIP_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="mentorship"
                        value={opt.value}
                        checked={field.value === opt.value}
                        onChange={() => field.onChange(opt.value)}
                        className="w-4 h-4 text-[#0F1990] focus:ring-[#0F1990]"
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}
            />
          </FormField>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Final Questions & Declaration
        </h2>

        <div className="space-y-6">
          <FormField
            label="How did you hear about the DARE Nigeria Challenge 2026?"
            required
            error={errors.declaration?.howHeardAbout}
          >
            <Controller
              name="declaration.howHeardAbout"
              control={control}
              render={({ field }) => (
                <Select
                  options={HEARD_ABOUT_OPTIONS}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.declaration?.howHeardAbout}
                />
              )}
            />
          </FormField>

          <FormField
            label="Why do you DARE - what personal conviction drives you to pursue this idea?"
            required
            error={errors.declaration?.whyDare}
            hint="This is your chance to speak from the heart. Tell us what motivates you."
          >
            <Textarea
              {...register("declaration.whyDare")}
              rows={4}
              maxLength={600}
              currentLength={watchWhyDare?.length || 0}
              error={!!errors.declaration?.whyDare}
            />
          </FormField>
        </div>
      </section>

      <section>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Applicant Declaration & Agreement
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            By submitting this application, I solemnly confirm that:
          </p>

          <div className="space-y-4">
            {agreementItems.map((item) => (
              <Controller
                key={item.key}
                name={`declaration.agreements.${item.key}`}
                control={control}
                render={({ field }) => (
                  <label
                    className={cn(
                      "flex items-start gap-3 cursor-pointer p-3 rounded-lg border transition-colors",
                      field.value
                        ? "border-[#0F1990] bg-blue-50"
                        : errors.declaration?.agreements?.[item.key]
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded text-[#0F1990] focus:ring-[#0F1990]"
                    />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </label>
                )}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <FormField
              label="Full Name (Digital Signature)"
              required
              error={errors.declaration?.digitalSignature}
            >
              <Input
                {...register("declaration.digitalSignature")}
                placeholder="Type your full name"
                error={!!errors.declaration?.digitalSignature}
              />
            </FormField>

            <FormField
              label="Date"
              required
              error={errors.declaration?.signatureDate}
            >
              <Input
                type="date"
                {...register("declaration.signatureDate")}
                error={!!errors.declaration?.signatureDate}
              />
            </FormField>
          </div>
        </div>
      </section>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium text-sm px-6 py-3 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous Step
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "inline-flex items-center gap-2 bg-[#0F1990] text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors",
            isSubmitting
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-[#0F1990]/90",
          )}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
