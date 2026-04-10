"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, Step2FormData } from "@/lib/schemas/sme-pitch";
import { FormField, Textarea, CheckboxGroup } from "@/components/ui/FormField";
import { SUPPORT_TYPES, MENTORSHIP_OPTIONS } from "@/lib/constants/sme-pitch";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PitchFundingFormProps {
  defaultValues?: Partial<Step2FormData>;
  onSubmit: (data: Step2FormData) => void;
  onBack: () => void;
}

export default function PitchFundingForm({
  defaultValues,
  onSubmit,
  onBack,
}: PitchFundingFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      businessPitch: {
        problemSolving: "",
        solutionDescription: "",
        competitiveAdvantage: "",
        targetCustomers: "",
        revenueModel: "",
        tractionMilestones: "",
        businessGoals: "",
      },
      fundingSupport: {
        receivedExternalFunding: undefined,
        fundingDetails: "",
        fundingPlan: "",
        supportTypesNeeded: [],
        openToMentorship: "",
      },
      ...defaultValues,
    },
  });

  const receivedFunding = watch("fundingSupport.receivedExternalFunding");
  const problemSolving = watch("businessPitch.problemSolving") || "";
  const solutionDescription = watch("businessPitch.solutionDescription") || "";
  const competitiveAdvantage =
    watch("businessPitch.competitiveAdvantage") || "";
  const targetCustomers = watch("businessPitch.targetCustomers") || "";
  const revenueModel = watch("businessPitch.revenueModel") || "";
  const tractionMilestones = watch("businessPitch.tractionMilestones") || "";
  const businessGoals = watch("businessPitch.businessGoals") || "";
  const fundingDetails = watch("fundingSupport.fundingDetails") || "";
  const fundingPlan = watch("fundingSupport.fundingPlan") || "";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 font-epilogue"
    >
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Business Pitch</h2>

        <div className="space-y-6">
          <FormField
            label="What problem is your business solving?"
            required
            error={errors.businessPitch?.problemSolving}
            hint="Describe the core problem clearly and explain why it matters."
          >
            <Textarea
              {...register("businessPitch.problemSolving")}
              rows={4}
              maxLength={500}
              currentLength={problemSolving.length}
              placeholder="Describe the problem your business is solving..."
              error={!!errors.businessPitch?.problemSolving}
            />
          </FormField>

          <FormField
            label="Describe your solution and what makes it innovative or unique"
            required
            error={errors.businessPitch?.solutionDescription}
          >
            <Textarea
              {...register("businessPitch.solutionDescription")}
              rows={4}
              maxLength={500}
              currentLength={solutionDescription.length}
              placeholder="Describe your solution..."
              error={!!errors.businessPitch?.solutionDescription}
            />
          </FormField>

          <FormField
            label="What sets your business apart from existing alternatives?"
            required
            error={errors.businessPitch?.competitiveAdvantage}
          >
            <Textarea
              {...register("businessPitch.competitiveAdvantage")}
              rows={4}
              maxLength={500}
              currentLength={competitiveAdvantage.length}
              placeholder="Explain your competitive advantage..."
              error={!!errors.businessPitch?.competitiveAdvantage}
            />
          </FormField>

          <FormField
            label="Who are your target customers, and what is the size of the market opportunity?"
            required
            error={errors.businessPitch?.targetCustomers}
            hint="Include demographics, geography, and estimated market size where possible."
          >
            <Textarea
              {...register("businessPitch.targetCustomers")}
              rows={4}
              maxLength={500}
              currentLength={targetCustomers.length}
              placeholder="Describe your target customers and market size..."
              error={!!errors.businessPitch?.targetCustomers}
            />
          </FormField>

          <FormField
            label="What is your revenue model?"
            required
            error={errors.businessPitch?.revenueModel}
            hint="How do you or will you make money? (e.g., subscription, product sales, commissions)"
          >
            <Textarea
              {...register("businessPitch.revenueModel")}
              rows={4}
              maxLength={500}
              currentLength={revenueModel.length}
              placeholder="Describe your revenue model..."
              error={!!errors.businessPitch?.revenueModel}
            />
          </FormField>

          <FormField
            label="What traction or milestones have you achieved so far?"
            required
            error={errors.businessPitch?.tractionMilestones}
            hint="E.g., customers acquired, revenue generated, partnerships, pilots, awards."
          >
            <Textarea
              {...register("businessPitch.tractionMilestones")}
              rows={4}
              maxLength={500}
              currentLength={tractionMilestones.length}
              placeholder="Describe your traction and milestones..."
              error={!!errors.businessPitch?.tractionMilestones}
            />
          </FormField>

          <FormField
            label="What are your key business goals for the next 12 months?"
            required
            error={errors.businessPitch?.businessGoals}
            hint="Be specific about targets, timelines, or outcomes."
          >
            <Textarea
              {...register("businessPitch.businessGoals")}
              rows={4}
              maxLength={500}
              currentLength={businessGoals.length}
              placeholder="Describe your business goals..."
              error={!!errors.businessPitch?.businessGoals}
            />
          </FormField>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Funding & Support
        </h2>

        <div className="space-y-6">
          <FormField
            label="Have you previously received external funding, grants, or investment from NGM or any other platforms?"
            required
            error={errors.fundingSupport?.receivedExternalFunding}
          >
            <Controller
              name="fundingSupport.receivedExternalFunding"
              control={control}
              render={({ field }) => (
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="receivedFunding"
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
                      name="receivedFunding"
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

          {receivedFunding === "yes" && (
            <FormField
              label="If yes, please provide details"
              error={errors.fundingSupport?.fundingDetails}
              hint="Include amount, source(s), and type of funding."
            >
              <Textarea
                {...register("fundingSupport.fundingDetails")}
                rows={3}
                maxLength={500}
                currentLength={fundingDetails.length}
                placeholder="Provide details about previous funding..."
                error={!!errors.fundingSupport?.fundingDetails}
              />
            </FormField>
          )}

          <FormField
            label="How much funding are you seeking, and how will it be used?"
            required
            error={errors.fundingSupport?.fundingPlan}
          >
            <Textarea
              {...register("fundingSupport.fundingPlan")}
              rows={4}
              maxLength={500}
              currentLength={fundingPlan.length}
              placeholder="Be specific about your funding needs and usage plan..."
              error={!!errors.fundingSupport?.fundingPlan}
            />
          </FormField>

          <FormField
            label="What type of support would benefit your business the most?"
            required
            error={errors.fundingSupport?.supportTypesNeeded as never}
          >
            <Controller
              name="fundingSupport.supportTypesNeeded"
              control={control}
              render={({ field }) => (
                <CheckboxGroup
                  options={SUPPORT_TYPES}
                  values={field.value || []}
                  onChange={field.onChange}
                  error={!!errors.fundingSupport?.supportTypesNeeded}
                  columns={2}
                />
              )}
            />
          </FormField>

          <FormField
            label="Are you open to mentorship and business development support?"
            required
            error={errors.fundingSupport?.openToMentorship}
          >
            <Controller
              name="fundingSupport.openToMentorship"
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
                        name="openToMentorship"
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
