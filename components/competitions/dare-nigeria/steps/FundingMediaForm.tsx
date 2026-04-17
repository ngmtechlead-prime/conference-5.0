"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, Step3FormData } from "@/lib/schemas/dare-nigeria";
import {
  FormField,
  Input,
  Select,
  Textarea,
  CheckboxGroup,
} from "@/components/ui/FormField";
import { FUNDING_RANGES, SUPPORT_TYPES } from "@/lib/constants/dare-nigeria";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface FundingMediaFormProps {
  defaultValues?: Partial<Step3FormData>;
  onSubmit: (data: Step3FormData) => void;
  onBack: () => void;
}

export default function FundingMediaForm({
  defaultValues,
  onSubmit,
  onBack,
}: FundingMediaFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      funding: {
        receivedExternalFunding: undefined,
        estimatedFundingNeed: "",
        fundingUsePlan: "",
        supportTypesNeeded: [],
      },
      documents: {
        innovationSummaryUrl: "",
        pitchDeckUrl: "",
        prototypeDemoUrl: "",
        videoPitchUrl: "",
        ticketEvidenceUrl: "",
      },
      ...defaultValues,
    },
  });

  const watchFundingUsePlan = watch("funding.fundingUsePlan", "");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 font-epilogue"
    >
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Funding & Support
        </h2>

        <div className="space-y-6">
          <FormField
            label="Have you received any external funding, investment, or grants for this innovation?"
            required
            error={errors.funding?.receivedExternalFunding}
          >
            <Controller
              name="funding.receivedExternalFunding"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="funding"
                      value="no"
                      checked={field.value === "no"}
                      onChange={() => field.onChange("no")}
                      className="w-4 h-4 text-[#0F1990] focus:ring-[#0F1990]"
                    />
                    <span className="text-sm text-gray-700">
                      No - I have not received any external funding
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="funding"
                      value="yes"
                      checked={field.value === "yes"}
                      onChange={() => field.onChange("yes")}
                      className="w-4 h-4 text-[#0F1990] focus:ring-[#0F1990]"
                    />
                    <span className="text-sm text-gray-700">
                      Yes - I have received some support
                    </span>
                  </label>
                </div>
              )}
            />
          </FormField>

          <FormField
            label="What is your estimated total funding need to fully develop and launch this innovation?"
            required
            error={errors.funding?.estimatedFundingNeed}
          >
            <Controller
              name="funding.estimatedFundingNeed"
              control={control}
              render={({ field }) => (
                <Select
                  options={FUNDING_RANGES}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.funding?.estimatedFundingNeed}
                />
              )}
            />
          </FormField>

          <FormField
            label="How specifically will you use the seed funding if selected?"
            required
            error={errors.funding?.fundingUsePlan}
            hint="Break down how you will allocate the funding. Be as specific as possible."
          >
            <Textarea
              {...register("funding.fundingUsePlan")}
              rows={4}
              maxLength={900}
              currentLength={watchFundingUsePlan?.length || 0}
              error={!!errors.funding?.fundingUsePlan}
            />
          </FormField>

          <FormField
            label="Beyond funding, what type of support would benefit you most from the DARE Challenge?"
            required
            error={errors.funding?.supportTypesNeeded as never}
          >
            <Controller
              name="funding.supportTypesNeeded"
              control={control}
              render={({ field }) => (
                <CheckboxGroup
                  options={SUPPORT_TYPES}
                  values={field.value || []}
                  onChange={field.onChange}
                  error={!!errors.funding?.supportTypesNeeded}
                  columns={2}
                />
              )}
            />
          </FormField>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Document & Media Uploads
        </h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-red-700">
              <strong>Important: </strong> Providing inaccessible video or
              google drive links will result in instant disqualification. Please
              ensure your link permissions are set to &quot;Anyone with the link
              can view&quot; before submitting.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <FormField
            label="Google Drive Link to Your Innovation Summary / One-Page Pitch"
            required
            error={errors.documents?.innovationSummaryUrl as never}
            hint="A concise written overview: problem, solution, market, team, and funding ask."
          >
            <Input
              type="url"
              {...register("documents.innovationSummaryUrl")}
              placeholder="https://"
              error={!!errors.documents?.innovationSummaryUrl}
            />
          </FormField>

          <FormField
            label="Google Drive Link to a Pitch Deck (Optional)"
            error={errors.documents?.pitchDeckUrl as never}
            hint="Slides covering your idea, market, team, financials, and ask (if prepared)."
          >
            <Input
              type="url"
              {...register("documents.pitchDeckUrl")}
              placeholder="https://"
              error={!!errors.documents?.pitchDeckUrl}
            />
          </FormField>

          <FormField
            label="Google Drive Link to Prototype, Demo, or Supporting Evidence (Optional)"
            error={errors.documents?.prototypeDemoUrl as never}
            hint="Photos, screenshots, mockups, or documentation."
          >
            <Input
              type="url"
              {...register("documents.prototypeDemoUrl")}
              placeholder="https://"
              error={!!errors.documents?.prototypeDemoUrl}
            />
          </FormField>

          <FormField
            label="Google Drive/YouTube Link to Short Video Pitch (60-90 seconds)"
            required
            error={errors.documents?.videoPitchUrl as never}
            hint="Record yourself discussing or presenting pitch. A smartphone MP4, MOV."
          >
            <Input
              type="url"
              {...register("documents.videoPitchUrl")}
              placeholder="https://"
              error={!!errors.documents?.videoPitchUrl}
            />
          </FormField>

          <FormField
            label="Google Drive Link to Conference Ticket Payment Evidence"
            required
            error={errors.documents?.ticketEvidenceUrl as never}
            hint="A valid conference ticket is required to participate. Provide proof of ticket purchase."
          >
            <Input
              type="url"
              {...register("documents.ticketEvidenceUrl")}
              placeholder="https://"
              error={!!errors.documents?.ticketEvidenceUrl}
            />
          </FormField>
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
          className="inline-flex items-center gap-2 bg-[#0F1990] hover:bg-[#0F1990]/90 text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors"
        >
          Save & Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
