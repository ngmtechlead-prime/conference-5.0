"use client";

import { useForm, Controller } from "react-hook-form";
import { useFormAutoSave } from "@/hooks/useFormAutoSave";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, Step1FormData } from "@/lib/schemas/sme-pitch";
import { FormField, Input, Select, Textarea } from "@/components/ui/FormField";
import {
  NIGERIAN_STATES,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  BUSINESS_REGISTRATION_OPTIONS,
  OWNERSHIP_STATUS_OPTIONS,
  INDUSTRY_SECTOR_OPTIONS,
  BUSINESS_STAGE_OPTIONS,
  YEARS_OF_OPERATION_OPTIONS,
  EMPLOYEE_COUNT_OPTIONS,
} from "@/lib/constants/sme-pitch";
import { ArrowRight } from "lucide-react";

interface FounderBusinessFormProps {
  defaultValues?: Partial<Step1FormData>;
  onSubmit: (data: Step1FormData) => void;
  onAutoSave?: (data: Step1FormData) => void;
}

export default function FounderBusinessForm({
  defaultValues,
  onSubmit,
  onAutoSave,
}: FounderBusinessFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
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
        maritalStatus: "",
        residentialAddress: "",
        stateOfResidence: "",
        email: "",
        phoneNumber: "",
        socialMediaUrl: "",
        governmentIdUrl: "",
      },
      businessInfo: {
        isRegistered: undefined,
        businessName: "",
        ownershipStatus: "",
        cacNumber: "",
        industrySector: "",
        stageOfBusiness: "",
        yearsOfOperation: "",
        businessState: "",
        businessAddress: "",
        employeeCount: "",
        websiteSocialMedia: "",
      },
      ...defaultValues,
    },
  });

  useFormAutoSave(watch, onAutoSave);

  const stateOptions = NIGERIAN_STATES.map((state) => ({
    value: state.toLowerCase().replace(/\s+/g, "_"),
    label: state,
  }));

  const isRegistered = watch("businessInfo.isRegistered");

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
            hint="Must be between 18 and 65 years old."
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
            label="Marital Status"
            required
            error={errors.personalInfo?.maritalStatus}
          >
            <Controller
              name="personalInfo.maritalStatus"
              control={control}
              render={({ field }) => (
                <Select
                  options={MARITAL_STATUS_OPTIONS}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.personalInfo?.maritalStatus}
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
            label="Social Media Profile URL"
            error={errors.personalInfo?.socialMediaUrl}
          >
            <Input
              type="url"
              {...register("personalInfo.socialMediaUrl")}
              placeholder="https://linkedin.com/in/yourprofile"
              error={!!errors.personalInfo?.socialMediaUrl}
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormField
            label="Residential Address"
            required
            error={errors.personalInfo?.residentialAddress}
          >
            <Textarea
              {...register("personalInfo.residentialAddress")}
              rows={2}
              placeholder="Enter your full residential address"
              error={!!errors.personalInfo?.residentialAddress}
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormField
            label="Google Drive Link to Valid Government-Issued ID"
            required
            error={errors.personalInfo?.governmentIdUrl as never}
            hint="Accepted: National ID, Voter's Card, International Passport, Driver's Licence"
          >
            <Input
              type="url"
              {...register("personalInfo.governmentIdUrl")}
              placeholder="https://"
              error={!!errors.personalInfo?.governmentIdUrl}
            />
          </FormField>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Business Information
        </h2>

        <div className="mb-6">
          <FormField
            label="Is your business registered/established?"
            required
            error={errors.businessInfo?.isRegistered}
          >
            <Controller
              name="businessInfo.isRegistered"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {BUSINESS_REGISTRATION_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="isRegistered"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Business Name"
            required
            error={errors.businessInfo?.businessName}
            hint={
              isRegistered === "no"
                ? "If not yet registered, provide proposed name"
                : undefined
            }
          >
            <Input
              {...register("businessInfo.businessName")}
              placeholder="Enter business name"
              error={!!errors.businessInfo?.businessName}
            />
          </FormField>

          <FormField
            label="Business Ownership Status"
            required
            error={errors.businessInfo?.ownershipStatus}
          >
            <Controller
              name="businessInfo.ownershipStatus"
              control={control}
              render={({ field }) => (
                <Select
                  options={OWNERSHIP_STATUS_OPTIONS}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.businessInfo?.ownershipStatus}
                />
              )}
            />
          </FormField>

          {isRegistered === "yes" && (
            <FormField
              label="CAC Registration Number"
              error={errors.businessInfo?.cacNumber}
              hint="Applicable only for registered businesses"
            >
              <Input
                {...register("businessInfo.cacNumber")}
                placeholder="Enter CAC number"
                error={!!errors.businessInfo?.cacNumber}
              />
            </FormField>
          )}

          <FormField
            label="Industry/Sector"
            required
            error={errors.businessInfo?.industrySector}
          >
            <Controller
              name="businessInfo.industrySector"
              control={control}
              render={({ field }) => (
                <Select
                  options={INDUSTRY_SECTOR_OPTIONS}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.businessInfo?.industrySector}
                />
              )}
            />
          </FormField>

          <FormField
            label="Stage of Business"
            required
            error={errors.businessInfo?.stageOfBusiness}
          >
            <Controller
              name="businessInfo.stageOfBusiness"
              control={control}
              render={({ field }) => (
                <Select
                  options={BUSINESS_STAGE_OPTIONS}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.businessInfo?.stageOfBusiness}
                />
              )}
            />
          </FormField>

          <FormField
            label="Years of Operation"
            required
            error={errors.businessInfo?.yearsOfOperation}
          >
            <Controller
              name="businessInfo.yearsOfOperation"
              control={control}
              render={({ field }) => (
                <Select
                  options={YEARS_OF_OPERATION_OPTIONS}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.businessInfo?.yearsOfOperation}
                />
              )}
            />
          </FormField>

          <FormField
            label="Which state is this business currently located?"
            required
            error={errors.businessInfo?.businessState}
          >
            <Controller
              name="businessInfo.businessState"
              control={control}
              render={({ field }) => (
                <Select
                  options={stateOptions}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.businessInfo?.businessState}
                />
              )}
            />
          </FormField>

          <FormField
            label="Number of People Currently Working in the Business"
            required
            error={errors.businessInfo?.employeeCount}
          >
            <Controller
              name="businessInfo.employeeCount"
              control={control}
              render={({ field }) => (
                <Select
                  options={EMPLOYEE_COUNT_OPTIONS}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.businessInfo?.employeeCount}
                />
              )}
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormField
            label="Full address of the business"
            required
            error={errors.businessInfo?.businessAddress}
          >
            <Textarea
              {...register("businessInfo.businessAddress")}
              rows={2}
              placeholder="Enter the full business address"
              error={!!errors.businessInfo?.businessAddress}
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormField
            label="Business Website and/or Social Media Handles"
            error={errors.businessInfo?.websiteSocialMedia}
          >
            <Textarea
              {...register("businessInfo.websiteSocialMedia")}
              rows={2}
              placeholder="Enter website URL and social media handles"
              error={!!errors.businessInfo?.websiteSocialMedia}
            />
          </FormField>
        </div>
      </section>

      <div className="flex justify-end pt-4">
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
