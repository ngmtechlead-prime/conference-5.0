"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, Step3FormData } from "@/lib/schemas/sme-pitch";
import { FormField, Input } from "@/components/ui/FormField";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";

interface DocumentsMediaFormProps {
  defaultValues?: Partial<Step3FormData>;
  onSubmit: (data: Step3FormData) => void;
  onBack: () => void;
}

export default function DocumentsMediaForm({
  defaultValues,
  onSubmit,
  onBack,
}: DocumentsMediaFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      documents: {
        businessRegistrationUrl: "",
        businessProfileUrl: "",
        financialStatementsUrl: "",
        businessSummaryUrl: "",
        videoPitchUrl: "",
        ticketEvidenceUrl: "",
        governmentIdUrl: "",
      },
      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 font-epilogue"
    >
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Document & Media Uploads
        </h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-800">
                <strong>Disclaimer: </strong> Providing a video or google drive
                link that cannot be accessed by our reviewers (e.g., private
                video, broken link, requires login) will result in{" "}
                <strong>instant disqualification</strong>. Please ensure
                permissions are set to &quot;Anyone with the link can
                view.&quot;
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <FormField
            label="Google Drive Link to Evidence of Business Registration (Optional)"
            error={errors.documents?.businessRegistrationUrl as never}
            hint="CAC certificate, business name certificate, or equivalent document."
          >
            <Input
              type="url"
              {...register("documents.businessRegistrationUrl")}
              placeholder="https://"
              error={!!errors.documents?.businessRegistrationUrl}
            />
          </FormField>

          <FormField
            label="Google Drive Link to your Business Profile"
            required
            error={errors.documents?.businessProfileUrl as never}
            hint="Business profile document (PDF, PPT, PPTX)."
          >
            <Input
              type="url"
              {...register("documents.businessProfileUrl")}
              placeholder="https://"
              error={!!errors.documents?.businessProfileUrl}
            />
          </FormField>

          <FormField
            label="Google Drive Link to Financial Statements or Revenue Projections"
            required
            error={errors.documents?.financialStatementsUrl as never}
            hint="Actual financials or 12-18 month projections (PDF, Excel)."
          >
            <Input
              type="url"
              {...register("documents.financialStatementsUrl")}
              placeholder="https://"
              error={!!errors.documents?.financialStatementsUrl}
            />
          </FormField>

          <FormField
            label="Google Drive Link to a One-Page Business Summary"
            required
            error={errors.documents?.businessSummaryUrl as never}
            hint="Concise overview of your business – problem, solution, team, financials, and ask."
          >
            <Input
              type="url"
              {...register("documents.businessSummaryUrl")}
              placeholder="https://"
              error={!!errors.documents?.businessSummaryUrl}
            />
          </FormField>

          <FormField
            label="Google Drive Link to Shareable Video Pitch"
            required
            error={errors.documents?.videoPitchUrl}
            hint="Please provide a Google Drive link to your 60-120 second video pitch (YouTube, Google Drive, Dropbox, etc.)"
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

          <FormField
            label="Google Drive Link to Valid Government-Issued ID"
            required
            error={errors.documents?.governmentIdUrl as never}
            hint="National ID, Voter's Card, International Passport, Driver's Licence."
          >
            <Input
              type="url"
              {...register("documents.governmentIdUrl")}
              placeholder="https://"
              error={!!errors.documents?.governmentIdUrl}
            />
          </FormField>
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
          className="inline-flex items-center gap-2 bg-[#0DA04C] hover:bg-[#0DA04C]/90 text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors"
        >
          Save & Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
