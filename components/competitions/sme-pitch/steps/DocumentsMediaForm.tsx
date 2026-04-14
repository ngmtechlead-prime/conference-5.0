"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, Step3FormData } from "@/lib/schemas/sme-pitch";
import { FormField, Input, FileUpload } from "@/components/ui/FormField";
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
    control,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      documents: {
        businessRegistrationName: "",
        businessRegistrationKey: "",
        businessProfileName: "",
        businessProfileKey: "",
        financialStatementsName: "",
        financialStatementsKey: "",
        businessSummaryName: "",
        businessSummaryKey: "",
        videoPitchUrl: "",
        ticketEvidenceName: "",
        ticketEvidenceKey: "",
        governmentIdName: "",
        governmentIdKey: "",
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

        <div className="space-y-8">
          <FormField
            label="Upload Evidence of Business Registration (Optional)"
            error={errors.documents?.businessRegistrationName as never}
            hint="Upload CAC certificate, business name certificate, or equivalent document. Max 5MB."
          >
            <Controller
              name="documents.businessRegistrationName"
              control={control}
              render={({ field }) => (
                <FileUpload
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize="5MB"
                  fileName={field.value}
                  onFileSelect={(file) => {
                    field.onChange(file?.name || "");
                  }}
                  onFileKeyChange={(key) => {
                    control._formValues.documents.businessRegistrationKey =
                      key || "";
                  }}
                  competition="sme-pitch"
                  fieldName="businessRegistration"
                  error={!!errors.documents?.businessRegistrationName}
                />
              )}
            />
          </FormField>

          <FormField
            label="Upload your Business Profile"
            required
            error={errors.documents?.businessProfileName as never}
            hint="Accepted formats: PDF, PPT, PPTX. Max file size: 10MB."
          >
            <Controller
              name="documents.businessProfileName"
              control={control}
              render={({ field }) => (
                <FileUpload
                  accept=".pdf,.ppt,.pptx"
                  maxSize="10MB"
                  fileName={field.value}
                  onFileSelect={(file) => {
                    field.onChange(file?.name || "");
                  }}
                  onFileKeyChange={(key) => {
                    control._formValues.documents.businessProfileKey =
                      key || "";
                  }}
                  competition="sme-pitch"
                  fieldName="businessProfile"
                  error={!!errors.documents?.businessProfileName}
                />
              )}
            />
          </FormField>

          <FormField
            label="Upload Financial Statements or Revenue Projections"
            required
            error={errors.documents?.financialStatementsName as never}
            hint="Include actual financials if available or 12-18 month projections. Accepted: PDF, Excel. Max 5MB."
          >
            <Controller
              name="documents.financialStatementsName"
              control={control}
              render={({ field }) => (
                <FileUpload
                  accept=".pdf,.xls,.xlsx"
                  maxSize="5MB"
                  fileName={field.value}
                  onFileSelect={(file) => {
                    field.onChange(file?.name || "");
                  }}
                  onFileKeyChange={(key) => {
                    control._formValues.documents.financialStatementsKey =
                      key || "";
                  }}
                  competition="sme-pitch"
                  fieldName="financialStatements"
                  error={!!errors.documents?.financialStatementsName}
                />
              )}
            />
          </FormField>

          <FormField
            label="Upload a One-Page Business Summary"
            required
            error={errors.documents?.businessSummaryName as never}
            hint="A concise overview of your business – problem, solution, team, financials, and ask. Max 10MB."
          >
            <Controller
              name="documents.businessSummaryName"
              control={control}
              render={({ field }) => (
                <FileUpload
                  accept=".pdf,.doc,.docx"
                  maxSize="10MB"
                  fileName={field.value}
                  onFileSelect={(file) => {
                    field.onChange(file?.name || "");
                  }}
                  onFileKeyChange={(key) => {
                    control._formValues.documents.businessSummaryKey =
                      key || "";
                  }}
                  competition="sme-pitch"
                  fieldName="businessSummary"
                  error={!!errors.documents?.businessSummaryName}
                />
              )}
            />
          </FormField>

          <FormField
            label="Shareable Video Pitch Link"
            required
            error={errors.documents?.videoPitchUrl}
            hint="Please provide a link to your 60-120 second video pitch (YouTube, Google Drive, Dropbox, etc.)"
          >
            <Input
              type="url"
              {...register("documents.videoPitchUrl")}
              placeholder="https://"
              error={!!errors.documents?.videoPitchUrl}
            />
          </FormField>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-800">
                  <strong>Disclaimer:</strong> Providing a video link that
                  cannot be accessed by our reviewers (e.g., private video,
                  broken link, requires login) will result in{" "}
                  <strong>instant disqualification</strong>. Please ensure
                  permissions are set to &quot;Anyone with the link can
                  view.&quot;
                </p>
              </div>
            </div>
          </div>

          <FormField
            label="Upload Conference Ticket Payment Evidence"
            required
            error={errors.documents?.ticketEvidenceName as never}
            hint="A valid conference ticket is required to participate. Upload proof of ticket purchase. Max 5MB."
          >
            <Controller
              name="documents.ticketEvidenceName"
              control={control}
              render={({ field }) => (
                <FileUpload
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize="5MB"
                  fileName={field.value}
                  onFileSelect={(file) => {
                    field.onChange(file?.name || "");
                  }}
                  onFileKeyChange={(key) => {
                    control._formValues.documents.ticketEvidenceKey = key || "";
                  }}
                  competition="sme-pitch"
                  fieldName="ticketEvidence"
                  error={!!errors.documents?.ticketEvidenceName}
                />
              )}
            />
          </FormField>

          <FormField
            label="Upload Valid Government-Issued ID"
            required
            error={errors.documents?.governmentIdName as never}
            hint="Max 5MB."
          >
            <Controller
              name="documents.governmentIdName"
              control={control}
              render={({ field }) => (
                <FileUpload
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize="5MB"
                  fileName={field.value}
                  onFileSelect={(file) => {
                    field.onChange(file?.name || "");
                  }}
                  onFileKeyChange={(key) => {
                    control._formValues.documents.governmentIdKey = key || "";
                  }}
                  competition="sme-pitch"
                  fieldName="governmentId"
                  error={!!errors.documents?.governmentIdName}
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
