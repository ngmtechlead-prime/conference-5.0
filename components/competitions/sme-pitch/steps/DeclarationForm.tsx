"use client";

import { useForm, Controller } from "react-hook-form";
import { useFormAutoSave } from "@/hooks/useFormAutoSave";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema, Step4FormData } from "@/lib/schemas/sme-pitch";
import { FormField, Input, Select, Textarea } from "@/components/ui/FormField";
import {
  AVAILABILITY_OPTIONS,
  HEARD_ABOUT_OPTIONS,
} from "@/lib/constants/sme-pitch";
import { ArrowLeft } from "lucide-react";

interface DeclarationFormProps {
  defaultValues?: Partial<Step4FormData>;
  onSubmit: (data: Step4FormData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
  onAutoSave?: (data: Step4FormData) => void;
}

const DECLARATION_ITEMS = [
  {
    key: "accurateInformation" as const,
    label:
      "All information provided in this form is accurate, complete, and truthful.",
  },
  {
    key: "authorizedRepresentative" as const,
    label:
      "I am a founder or authorised representative of the business submitted herein.",
  },
  {
    key: "understandsDisqualification" as const,
    label:
      "I understand that submitting false or misleading information will result in immediate disqualification.",
  },
  {
    key: "agreesToParticipate" as const,
    label:
      "I agree to participate in all stages of the competition if shortlisted.",
  },
  {
    key: "willingToJoinNGM" as const,
    label: "I am willing to join the NGM entrepreneurship club/NGM platform.",
  },
  {
    key: "acceptsTerms" as const,
    label:
      "I accept and agree to the Terms and Conditions of the NGM SME Pitch Competition.",
  },
  {
    key: "consentsToDataUse" as const,
    label:
      "I consent to NGM using my submitted information for competition purposes.",
  },
];

export default function DeclarationForm({
  defaultValues,
  onSubmit,
  onBack,
  isSubmitting = false,
  onAutoSave,
}: DeclarationFormProps) {
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
        availableForAllStages: "",
        howHeardAbout: "",
        additionalInfo: "",
      },
      declaration: {
        agreements: {
          accurateInformation: false,
          authorizedRepresentative: false,
          understandsDisqualification: false,
          agreesToParticipate: false,
          willingToJoinNGM: false,
          acceptsTerms: false,
          consentsToDataUse: false,
        },
        digitalSignature: "",
        signatureDate: "",
      },
      ...defaultValues,
    },
  });

  useFormAutoSave(watch, onAutoSave);

  const additionalInfo = watch("availability.additionalInfo") || "";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 font-epilogue"
    >
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Availability & Final Declaration
        </h2>

        <div className="space-y-6">
          <FormField
            label="Will you be available for ALL stages of the competition?"
            required
            error={errors.availability?.availableForAllStages}
          >
            <Controller
              name="availability.availableForAllStages"
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
            label="How did you hear about the NGM SME Pitch Competition?"
            required
            error={errors.availability?.howHeardAbout}
          >
            <Controller
              name="availability.howHeardAbout"
              control={control}
              render={({ field }) => (
                <Select
                  options={HEARD_ABOUT_OPTIONS}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.availability?.howHeardAbout}
                />
              )}
            />
          </FormField>

          <FormField
            label="Is there anything else you would like the panel to know about your business or application?"
            error={errors.availability?.additionalInfo}
            hint="Use this space for any additional context."
          >
            <Textarea
              {...register("availability.additionalInfo")}
              rows={4}
              maxLength={600}
              currentLength={additionalInfo.length}
              placeholder="Optional additional information..."
              error={!!errors.availability?.additionalInfo}
            />
          </FormField>
        </div>
      </section>

      <section>
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Applicant Declaration
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            By submitting this application, I hereby confirm that:
          </p>

          <div className="space-y-4">
            {DECLARATION_ITEMS.map((item) => (
              <Controller
                key={item.key}
                name={`declaration.agreements.${item.key}`}
                control={control}
                render={({ field }) => (
                  <label className="flex items-start gap-3 cursor-pointer">
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

          {Object.keys(errors.declaration?.agreements || {}).length > 0 && (
            <p className="text-xs text-red-500 mt-4">
              Please confirm all declarations above to proceed.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <FormField
              label="Full Name (Digital Signature)"
              required
              error={errors.declaration?.digitalSignature}
            >
              <Input
                {...register("declaration.digitalSignature")}
                placeholder="Enter your full name"
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
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm px-4 py-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous Step
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-[#0DA04C] hover:bg-[#0DA04C]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
