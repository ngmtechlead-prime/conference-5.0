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
  FileUpload,
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
        innovationSummaryName: "",
        innovationSummaryKey: "",
        pitchDeckName: "",
        pitchDeckKey: "",
        prototypeDemoName: "",
        prototypeDemoKey: "",
        videoPitchName: "",
        videoPitchKey: "",
        videoPitchUrl: "",
        ticketEvidenceName: "",
        ticketEvidenceKey: "",
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

        <div className="space-y-6">
          <FormField
            label="Upload Your Innovation Summary / One-Page Pitch"
            required
            error={errors.documents?.innovationSummaryName as never}
          >
            <Controller
              name="documents.innovationSummaryName"
              control={control}
              render={({ field }) => (
                <FileUpload
                  accept=".pdf,.doc,.docx"
                  maxSize="10MB"
                  hint="A concise written overview: problem, solution, market, team, and funding ask. (PDF, DOC, DOCX)"
                  fileName={field.value}
                  onFileSelect={(file) => field.onChange(file?.name || "")}
                  onFileKeyChange={(key) => {
                    control._formValues.documents.innovationSummaryKey =
                      key || "";
                  }}
                  competition="dare-nigeria"
                  fieldName="innovationSummary"
                  error={!!errors.documents?.innovationSummaryName}
                />
              )}
            />
          </FormField>

          <FormField
            label="Upload a Pitch Deck (Optional)"
            error={errors.documents?.pitchDeckName as never}
          >
            <Controller
              name="documents.pitchDeckName"
              control={control}
              render={({ field }) => (
                <FileUpload
                  accept=".pdf,.ppt,.pptx"
                  maxSize="10MB"
                  hint="Slides covering your idea, market, team, financials, and ask (if prepared). Max 15MB"
                  fileName={field.value}
                  onFileSelect={(file) => field.onChange(file?.name || "")}
                  onFileKeyChange={(key) => {
                    control._formValues.documents.pitchDeckKey = key || "";
                  }}
                  competition="dare-nigeria"
                  fieldName="pitchDeck"
                  error={!!errors.documents?.pitchDeckName}
                />
              )}
            />
          </FormField>

          <FormField
            label="Upload Prototype, Demo, or Supporting Evidence (Optional)"
            error={errors.documents?.prototypeDemoName as never}
          >
            <Controller
              name="documents.prototypeDemoName"
              control={control}
              render={({ field }) => (
                <FileUpload
                  accept=".pdf,.jpg,.jpeg,.png,.mp4"
                  maxSize="10MB"
                  hint="Photos, screenshots, mockups, or documentation. Supported: PDF, JPG, PNG. Max 10MB"
                  fileName={field.value}
                  onFileSelect={(file) => field.onChange(file?.name || "")}
                  onFileKeyChange={(key) => {
                    control._formValues.documents.prototypeDemoKey = key || "";
                  }}
                  competition="dare-nigeria"
                  fieldName="prototypeDemo"
                  error={!!errors.documents?.prototypeDemoName}
                />
              )}
            />
          </FormField>

          <FormField
            label="Short Video Pitch (60-90 seconds)"
            required
            error={errors.documents?.videoPitchName as never}
          >
            <Controller
              name="documents.videoPitchName"
              control={control}
              render={({ field }) => (
                <FileUpload
                  accept=".mp4,.mov"
                  maxSize="100MB"
                  hint="Record yourself discussing or presenting pitch. A smartphone MP4, MOV. Max 100MB"
                  fileName={field.value}
                  onFileSelect={(file) => field.onChange(file?.name || "")}
                  onFileKeyChange={(key) => {
                    control._formValues.documents.videoPitchKey = key || "";
                  }}
                  competition="dare-nigeria"
                  fieldName="videoPitch"
                  error={!!errors.documents?.videoPitchName}
                />
              )}
            />
          </FormField>

          <FormField
            label="Or paste a shareable video link (YouTube / Google Drive / Dropbox)"
            error={errors.documents?.videoPitchUrl}
          >
            <Input
              type="url"
              {...register("documents.videoPitchUrl")}
              placeholder="https://"
              error={!!errors.documents?.videoPitchUrl}
            />
          </FormField>

          <FormField
            label="Upload Conference Ticket Payment Evidence"
            required
            error={errors.documents?.ticketEvidenceName as never}
            hint="A valid conference ticket is required to participate. Upload proof of ticket purchase. Max 5MB"
          >
            <Controller
              name="documents.ticketEvidenceName"
              control={control}
              render={({ field }) => (
                <FileUpload
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize="5MB"
                  fileName={field.value}
                  onFileSelect={(file) => field.onChange(file?.name || "")}
                  onFileKeyChange={(key) => {
                    control._formValues.documents.ticketEvidenceKey = key || "";
                  }}
                  competition="dare-nigeria"
                  fieldName="ticketEvidence"
                  error={!!errors.documents?.ticketEvidenceName}
                />
              )}
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
