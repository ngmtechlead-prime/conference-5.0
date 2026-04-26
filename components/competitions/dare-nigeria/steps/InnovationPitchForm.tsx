"use client";

import { useForm, Controller } from "react-hook-form";
import { useFormAutoSave } from "@/hooks/useFormAutoSave";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, Step2FormData } from "@/lib/schemas/dare-nigeria";
import {
  FormField,
  Input,
  Select,
  Textarea,
  CheckboxGroup,
} from "@/components/ui/FormField";
import {
  INNOVATION_STAGES,
  SECTOR_OPTIONS,
  SDG_OPTIONS,
} from "@/lib/constants/dare-nigeria";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface InnovationPitchFormProps {
  defaultValues?: Partial<Step2FormData>;
  onSubmit: (data: Step2FormData) => void;
  onBack: () => void;
  onAutoSave?: (data: Step2FormData) => void;
}

export default function InnovationPitchForm({
  defaultValues,
  onSubmit,
  onBack,
  onAutoSave,
}: InnovationPitchFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      innovation: {
        name: "",
        stage: "",
        sector: "",
        sdgAlignment: [],
      },
      pitch: {
        problemStatement: "",
        businessDescription: "",
        solution: "",
        targetBeneficiaries: "",
        impactPotential: "",
        successMetrics: "",
        revenueModel: "",
        scalability: "",
        uniqueness: "",
      },
      team: {
        type: undefined,
        background: "",
        progressSoFar: "",
        biggestChallenge: "",
      },
      ...defaultValues,
    },
  });

  useFormAutoSave(watch, onAutoSave);

  const watchProblemStatement = watch("pitch.problemStatement", "");
  const watchBusinessDescription = watch("pitch.businessDescription", "");
  const watchSolution = watch("pitch.solution", "");
  const watchTargetBeneficiaries = watch("pitch.targetBeneficiaries", "");
  const watchImpactPotential = watch("pitch.impactPotential", "");
  const watchSuccessMetrics = watch("pitch.successMetrics", "");
  const watchRevenueModel = watch("pitch.revenueModel", "");
  const watchScalability = watch("pitch.scalability", "");
  const watchUniqueness = watch("pitch.uniqueness", "");
  const watchBackground = watch("team.background", "");
  const watchProgress = watch("team.progressSoFar", "");
  const watchChallenge = watch("team.biggestChallenge", "");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 font-epilogue"
    >
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Your Innovation Profile
        </h2>

        <div className="space-y-6">
          <FormField
            label="Name of Your Innovation / Business / Project"
            required
            error={errors.innovation?.name}
          >
            <Input
              {...register("innovation.name")}
              placeholder=""
              error={!!errors.innovation?.name}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Innovation Stage"
              required
              error={errors.innovation?.stage}
            >
              <Controller
                name="innovation.stage"
                control={control}
                render={({ field }) => (
                  <Select
                    options={INNOVATION_STAGES}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={!!errors.innovation?.stage}
                  />
                )}
              />
            </FormField>

            <FormField
              label="Sector / Industry"
              required
              error={errors.innovation?.sector}
            >
              <Controller
                name="innovation.sector"
                control={control}
                render={({ field }) => (
                  <Select
                    options={SECTOR_OPTIONS}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={!!errors.innovation?.sector}
                  />
                )}
              />
            </FormField>
          </div>

          <FormField
            label="Which SDG(s) does your innovation align with?"
            required
            error={errors.innovation?.sdgAlignment as never}
            hint="Select all that apply"
          >
            <Controller
              name="innovation.sdgAlignment"
              control={control}
              render={({ field }) => (
                <CheckboxGroup
                  options={SDG_OPTIONS}
                  values={field.value || []}
                  onChange={field.onChange}
                  error={!!errors.innovation?.sdgAlignment}
                  columns={2}
                />
              )}
            />
          </FormField>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">The Pitch</h2>

        <div className="space-y-6">
          <FormField
            label="Problem Statement: What specific problem are you solving?"
            required
            error={errors.pitch?.problemStatement}
          >
            <Textarea
              {...register("pitch.problemStatement")}
              rows={4}
              maxLength={1500}
              currentLength={watchProblemStatement?.length || 0}
              error={!!errors.pitch?.problemStatement}
            />
          </FormField>

          <FormField
            label="Be precise: Who is affected? How many people? What is the root of the problem going unaddressed on?"
            required
            error={errors.pitch?.businessDescription}
          >
            <Textarea
              {...register("pitch.businessDescription")}
              rows={4}
              maxLength={1500}
              currentLength={watchBusinessDescription?.length || 0}
              error={!!errors.pitch?.businessDescription}
            />
          </FormField>

          <FormField
            label="Your Solution: What is your innovation and how does it solve the problem?"
            required
            error={errors.pitch?.solution}
          >
            <Textarea
              {...register("pitch.solution")}
              rows={4}
              maxLength={1500}
              currentLength={watchSolution?.length || 0}
              error={!!errors.pitch?.solution}
            />
          </FormField>

          <FormField
            label="Target Beneficiaries / Market"
            required
            error={errors.pitch?.targetBeneficiaries}
            hint="Who exactly will benefit from your solution, and describe your primary audience."
          >
            <Textarea
              {...register("pitch.targetBeneficiaries")}
              rows={3}
              maxLength={900}
              currentLength={watchTargetBeneficiaries?.length || 0}
              error={!!errors.pitch?.targetBeneficiaries}
            />
          </FormField>

          <FormField
            label="Impact Potential: What measurable change will your innovation create?"
            required
            error={errors.pitch?.impactPotential}
          >
            <Textarea
              {...register("pitch.impactPotential")}
              rows={3}
              maxLength={900}
              currentLength={watchImpactPotential?.length || 0}
              error={!!errors.pitch?.impactPotential}
            />
          </FormField>

          <FormField
            label="What does success look like? Include economic, social, or environmental outcomes."
            required
            error={errors.pitch?.successMetrics}
          >
            <Textarea
              {...register("pitch.successMetrics")}
              rows={3}
              maxLength={900}
              currentLength={watchSuccessMetrics?.length || 0}
              error={!!errors.pitch?.successMetrics}
            />
          </FormField>

          <FormField
            label="Revenue or Sustainability Model"
            required
            error={errors.pitch?.revenueModel}
          >
            <Textarea
              {...register("pitch.revenueModel")}
              rows={3}
              maxLength={900}
              currentLength={watchRevenueModel?.length || 0}
              error={!!errors.pitch?.revenueModel}
            />
          </FormField>

          <FormField
            label="How will your innovation scale and be sustainable?"
            required
            error={errors.pitch?.scalability}
          >
            <Textarea
              {...register("pitch.scalability")}
              rows={3}
              maxLength={900}
              currentLength={watchScalability?.length || 0}
              error={!!errors.pitch?.scalability}
            />
          </FormField>

          <FormField
            label="What makes your innovation uniquely Nigerian?"
            required
            error={errors.pitch?.uniqueness}
          >
            <Textarea
              {...register("pitch.uniqueness")}
              rows={3}
              maxLength={600}
              currentLength={watchUniqueness?.length || 0}
              error={!!errors.pitch?.uniqueness}
            />
          </FormField>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Team & Execution Readiness
        </h2>

        <div className="space-y-6">
          <FormField
            label="Are you applying as an individual or as a team?"
            required
            error={errors.team?.type}
          >
            <Controller
              name="team.type"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col sm:flex-row gap-4">
                  {[
                    { value: "solo", label: "Solo (Sole Founder)" },
                    { value: "cofounders", label: "Co-founders (2 people)" },
                    { value: "team", label: "Team (3 or more members)" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="teamType"
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
            label="Briefly describe your background and why you are uniquely positioned to execute this idea"
            required
            error={errors.team?.background}
          >
            <Textarea
              {...register("team.background")}
              rows={3}
              maxLength={900}
              currentLength={watchBackground?.length || 0}
              error={!!errors.team?.background}
            />
          </FormField>

          <FormField
            label="What have you done so far to develop this idea?"
            required
            error={errors.team?.progressSoFar}
          >
            <Textarea
              {...register("team.progressSoFar")}
              rows={3}
              maxLength={900}
              currentLength={watchProgress?.length || 0}
              error={!!errors.team?.progressSoFar}
            />
          </FormField>

          <FormField
            label="What is your biggest execution challenge right now, and how do you plan to overcome it?"
            required
            error={errors.team?.biggestChallenge}
          >
            <Textarea
              {...register("team.biggestChallenge")}
              rows={3}
              maxLength={900}
              currentLength={watchChallenge?.length || 0}
              error={!!errors.team?.biggestChallenge}
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
