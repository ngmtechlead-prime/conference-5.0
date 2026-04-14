"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, Step1FormData } from "@/lib/schemas/dare-nigeria";
import {
  FormField,
  Input,
  Select,
  Textarea,
  FileUpload,
} from "@/components/ui/FormField";
import {
  NIGERIAN_STATES,
  GENDER_OPTIONS,
  EDUCATION_LEVELS,
  OCCUPATION_OPTIONS,
} from "@/lib/constants/dare-nigeria";
import { ArrowRight } from "lucide-react";

interface ApplicantProfileFormProps {
  defaultValues?: Partial<Step1FormData>;
  onSubmit: (data: Step1FormData) => void;
}

export default function ApplicantProfileForm({
  defaultValues,
  onSubmit,
}: ApplicantProfileFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        nationality: "Nigerian",
        stateOfOrigin: "",
        stateOfResidence: "",
        email: "",
        phoneNumber: "",
        linkedinUrl: "",
        governmentIdName: "",
        governmentIdKey: "",
      },
      education: {
        highestEducation: "",
        occupation: "",
        fieldOfExperience: "",
        previousAcceleratorParticipation: undefined,
      },
      ...defaultValues,
    },
  });

  const stateOptions = NIGERIAN_STATES.map((state) => ({
    value: state.toLowerCase().replace(/\s+/g, "_"),
    label: state,
  }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 font-epilogue"
    >
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="First Name"
            required
            error={errors.personalInfo?.firstName}
            hint="As on government ID"
          >
            <Input
              {...register("personalInfo.firstName")}
              placeholder="As on government ID"
              error={!!errors.personalInfo?.firstName}
            />
          </FormField>

          <FormField
            label="Last Name"
            required
            error={errors.personalInfo?.lastName}
            hint="As on government ID"
          >
            <Input
              {...register("personalInfo.lastName")}
              placeholder="As on government ID"
              error={!!errors.personalInfo?.lastName}
            />
          </FormField>

          <FormField
            label="Date of Birth"
            required
            error={errors.personalInfo?.dateOfBirth}
            hint="Must be between 18 and 40 years old."
          >
            <Input
              type="date"
              {...register("personalInfo.dateOfBirth")}
              error={!!errors.personalInfo?.dateOfBirth}
            />
          </FormField>

          <FormField
            label="Gender"
            required
            error={errors.personalInfo?.gender}
          >
            <Controller
              name="personalInfo.gender"
              control={control}
              render={({ field }) => (
                <Select
                  options={GENDER_OPTIONS}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.personalInfo?.gender}
                />
              )}
            />
          </FormField>

          <FormField
            label="Nationality"
            required
            error={errors.personalInfo?.nationality}
            hint="Applicants must be Nigerian citizens."
          >
            <Controller
              name="personalInfo.nationality"
              control={control}
              render={({ field }) => (
                <Select
                  options={[{ value: "Nigerian", label: "Nigerian" }]}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.personalInfo?.nationality}
                />
              )}
            />
          </FormField>

          <FormField
            label="State of Origin"
            required
            error={errors.personalInfo?.stateOfOrigin}
          >
            <Controller
              name="personalInfo.stateOfOrigin"
              control={control}
              render={({ field }) => (
                <Select
                  options={stateOptions}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.personalInfo?.stateOfOrigin}
                />
              )}
            />
          </FormField>

          <FormField
            label="State of Current Residence"
            required
            error={errors.personalInfo?.stateOfResidence}
          >
            <Controller
              name="personalInfo.stateOfResidence"
              control={control}
              render={({ field }) => (
                <Select
                  options={stateOptions}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.personalInfo?.stateOfResidence}
                />
              )}
            />
          </FormField>

          <FormField
            label="Email Address"
            required
            error={errors.personalInfo?.email}
          >
            <Input
              type="email"
              {...register("personalInfo.email")}
              placeholder="you@example.com"
              error={!!errors.personalInfo?.email}
            />
          </FormField>

          <FormField
            label="Phone Number"
            required
            error={errors.personalInfo?.phoneNumber}
            hint="WhatsApp-enabled preferred"
          >
            <Input
              type="tel"
              {...register("personalInfo.phoneNumber")}
              placeholder="+234"
              error={!!errors.personalInfo?.phoneNumber}
            />
          </FormField>

          <FormField
            label="LinkedIn Profile URL"
            error={errors.personalInfo?.linkedinUrl}
          >
            <Input
              type="url"
              {...register("personalInfo.linkedinUrl")}
              placeholder="https://linkedin.com/in/yourprofile"
              error={!!errors.personalInfo?.linkedinUrl}
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormField
            label="Upload Valid Government-Issued ID"
            required
            error={errors.personalInfo?.governmentIdName as never}
            hint="Accepted: National ID, Voter's Card, International Passport, Driver's Licence (Max 5MB)."
          >
            <Controller
              name="personalInfo.governmentIdName"
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
                    control._formValues.personalInfo.governmentIdKey =
                      key || "";
                  }}
                  competition="dare-nigeria"
                  fieldName="governmentId"
                  error={!!errors.personalInfo?.governmentIdName}
                />
              )}
            />
          </FormField>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Educational & Professional Background
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Highest Level of Education Completed"
            required
            error={errors.education?.highestEducation}
          >
            <Controller
              name="education.highestEducation"
              control={control}
              render={({ field }) => (
                <Select
                  options={EDUCATION_LEVELS}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.education?.highestEducation}
                />
              )}
            />
          </FormField>

          <FormField
            label="Current Occupation / Employment Status"
            required
            error={errors.education?.occupation}
          >
            <Controller
              name="education.occupation"
              control={control}
              render={({ field }) => (
                <Select
                  options={OCCUPATION_OPTIONS}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.education?.occupation}
                />
              )}
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormField
            label="Field / Industry of Professional Experience"
            required
            error={errors.education?.fieldOfExperience}
          >
            <Textarea
              {...register("education.fieldOfExperience")}
              rows={3}
              error={!!errors.education?.fieldOfExperience}
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormField
            label="Have you participated in any accelerators, incubators, or innovation programmes before?"
            required
            error={errors.education?.previousAcceleratorParticipation}
          >
            <Controller
              name="education.previousAcceleratorParticipation"
              control={control}
              render={({ field }) => (
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="acceleratorParticipation"
                      value="yes"
                      checked={field.value === "yes"}
                      onChange={() => field.onChange("yes")}
                      className="w-4 h-4 text-[#0F1990] focus:ring-[#0F1990]"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="acceleratorParticipation"
                      value="no"
                      checked={field.value === "no"}
                      onChange={() => field.onChange("no")}
                      className="w-4 h-4 text-[#0F1990] focus:ring-[#0F1990]"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              )}
            />
          </FormField>
        </div>
      </section>

      <div className="flex justify-end pt-4">
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
