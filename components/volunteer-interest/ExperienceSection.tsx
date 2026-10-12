import { Controller, useFormContext, useWatch } from "react-hook-form";
import { VOLUNTEER_EXPERIENCE_LEVEL_OPTIONS } from "@/lib/constants/volunteer-interest";
import type { VolunteerInterestInput } from "@/types/volunteer-interest";
import {
  getWordCount,
  SectionHeading,
  VolunteerChoiceField,
  VolunteerInterestField,
  volunteerControlClass,
  volunteerDescribedBy,
  volunteerFieldId,
} from "@/components/volunteer-interest/VolunteerInterestField";

function emptyToUndefined(value: unknown) {
  return typeof value === "string" && value.trim() === "" ? undefined : value;
}

export function ExperienceSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<VolunteerInterestInput>();
  const experienceLevel = useWatch({ control, name: "experienceLevel" });
  const hasVolunteeredBefore = useWatch({
    control,
    name: "hasVolunteeredBefore",
  });
  const relevantExperience =
    useWatch({ control, name: "relevantExperience" }) ?? "";
  const volunteerExperience =
    useWatch({ control, name: "volunteerExperience" }) ?? "";
  const motivation = useWatch({ control, name: "motivation" }) ?? "";
  const proposedContribution =
    useWatch({ control, name: "proposedContribution" }) ?? "";

  return (
    <section aria-labelledby="experience-heading" className="space-y-6">
      <SectionHeading
        number={3}
        id="experience-heading"
        title="Experience and motivation"
        description="Every field in this section is optional. If you choose to share examples, we value transferable skills, community service, personal projects, and potential—not only formal employment."
      />

      <VolunteerInterestField
        name="experienceLevel"
        label="Relevant experience level"
        hint="Optional."
        error={errors.experienceLevel?.message}
      >
        <select
          {...register("experienceLevel", { setValueAs: emptyToUndefined })}
          id={volunteerFieldId("experienceLevel")}
          defaultValue=""
          aria-invalid={errors.experienceLevel ? true : undefined}
          aria-describedby={volunteerDescribedBy({
            name: "experienceLevel",
            error: errors.experienceLevel?.message,
            hint: true,
          })}
          className={volunteerControlClass(Boolean(errors.experienceLevel))}
        >
          <option value="">
            Select your experience level (optional)
          </option>
          {VOLUNTEER_EXPERIENCE_LEVEL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </VolunteerInterestField>

      <VolunteerInterestField
        name="relevantExperience"
        label="Relevant experience or examples"
        hint={
          experienceLevel === "NO_FORMAL_EXPERIENCE"
            ? "Optional. If you answer, describe coursework, personal projects, student leadership, community service, or transferable skills. Include responsibilities, tools, or outcomes where possible. Write 40–180 words."
            : "Optional. If you answer, describe projects, responsibilities, tools, or measurable outcomes relevant to your preferred role. Write 40–180 words."
        }
        counter={`${getWordCount(relevantExperience)} words · ${relevantExperience.length}/2500 characters`}
        error={errors.relevantExperience?.message}
      >
        <textarea
          {...register("relevantExperience", {
            setValueAs: emptyToUndefined,
          })}
          id={volunteerFieldId("relevantExperience")}
          rows={7}
          maxLength={2500}
          aria-invalid={errors.relevantExperience ? true : undefined}
          aria-describedby={volunteerDescribedBy({
            name: "relevantExperience",
            error: errors.relevantExperience?.message,
            hint: true,
            counter: true,
          })}
          className={`${volunteerControlClass(Boolean(errors.relevantExperience))} resize-y`}
        />
      </VolunteerInterestField>

      <VolunteerChoiceField
        name="hasVolunteeredBefore"
        legend="Have you volunteered before?"
        hint="Optional."
        error={errors.hasVolunteeredBefore?.message}
      >
        <Controller
          control={control}
          name="hasVolunteeredBefore"
          render={({ field }) => (
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ].map((option) => {
                const selected = field.value === option.value;
                const id = `${volunteerFieldId("hasVolunteeredBefore")}-${option.value}`;

                return (
                  <label
                    key={String(option.value)}
                    htmlFor={id}
                    className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-medium ${
                      selected
                        ? "border-[#0F1990] bg-blue-50 text-blue-950"
                        : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"
                    }`}
                  >
                    <input
                      ref={option.value ? field.ref : undefined}
                      id={id}
                      name={field.name}
                      type="radio"
                      value={String(option.value)}
                      checked={selected}
                      onChange={() => field.onChange(option.value)}
                      onBlur={field.onBlur}
                      aria-describedby={volunteerDescribedBy({
                        name: "hasVolunteeredBefore",
                        error: errors.hasVolunteeredBefore?.message,
                        hint: true,
                      })}
                      className="size-4 shrink-0 accent-[#0F1990] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1990] focus-visible:ring-offset-2"
                    />
                    {option.label}
                    {selected ? (
                      <span className="sr-only"> selected</span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          )}
        />
      </VolunteerChoiceField>

      {hasVolunteeredBefore === true ? (
        <VolunteerInterestField
          name="volunteerExperience"
          label="Previous volunteering experience"
          hint="Optional. If you answer, include the organisation or event, your role, and your responsibilities. Write 20–120 words."
          counter={`${getWordCount(volunteerExperience)} words · ${volunteerExperience.length}/1800 characters`}
          error={errors.volunteerExperience?.message}
        >
          <textarea
            {...register("volunteerExperience", {
              setValueAs: emptyToUndefined,
            })}
            id={volunteerFieldId("volunteerExperience")}
            rows={5}
            maxLength={1800}
            aria-invalid={errors.volunteerExperience ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "volunteerExperience",
              error: errors.volunteerExperience?.message,
              hint: true,
              counter: true,
            })}
            className={`${volunteerControlClass(Boolean(errors.volunteerExperience))} resize-y`}
          />
        </VolunteerInterestField>
      ) : null}

      <VolunteerInterestField
        name="motivation"
        label="Why do you want to volunteer for NGM Conference 6.0?"
        hint="Optional. If you answer, write 30–100 words."
        counter={`${getWordCount(motivation)} words · ${motivation.length}/1500 characters`}
        error={errors.motivation?.message}
      >
        <textarea
          {...register("motivation", { setValueAs: emptyToUndefined })}
          id={volunteerFieldId("motivation")}
          rows={5}
          maxLength={1500}
          aria-invalid={errors.motivation ? true : undefined}
          aria-describedby={volunteerDescribedBy({
            name: "motivation",
            error: errors.motivation?.message,
            hint: true,
            counter: true,
          })}
          className={`${volunteerControlClass(Boolean(errors.motivation))} resize-y`}
        />
      </VolunteerInterestField>

      <VolunteerInterestField
        name="proposedContribution"
        label="What would you contribute in your preferred role?"
        hint="Optional. If you answer, focus on the practical contribution you can make. Write 30–120 words."
        counter={`${getWordCount(proposedContribution)} words · ${proposedContribution.length}/1800 characters`}
        error={errors.proposedContribution?.message}
      >
        <textarea
          {...register("proposedContribution", {
            setValueAs: emptyToUndefined,
          })}
          id={volunteerFieldId("proposedContribution")}
          rows={5}
          maxLength={1800}
          aria-invalid={errors.proposedContribution ? true : undefined}
          aria-describedby={volunteerDescribedBy({
            name: "proposedContribution",
            error: errors.proposedContribution?.message,
            hint: true,
            counter: true,
          })}
          className={`${volunteerControlClass(Boolean(errors.proposedContribution))} resize-y`}
        />
      </VolunteerInterestField>

      <div className="grid gap-5 sm:grid-cols-2">
        <VolunteerInterestField
          name="portfolioUrl"
          label="Portfolio or professional profile URL"
          hint="Optional. LinkedIn, portfolio, Behance, GitHub, or similar. Include https://"
          error={errors.portfolioUrl?.message}
        >
          <input
            {...register("portfolioUrl", { setValueAs: emptyToUndefined })}
            id={volunteerFieldId("portfolioUrl")}
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://"
            maxLength={2048}
            aria-invalid={errors.portfolioUrl ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "portfolioUrl",
              error: errors.portfolioUrl?.message,
              hint: true,
            })}
            className={volunteerControlClass(Boolean(errors.portfolioUrl))}
          />
        </VolunteerInterestField>

        <VolunteerInterestField
          name="additionalProfileUrl"
          label="Additional social/profile URL"
          hint="Optional. Instagram, X, TikTok, or another relevant public profile. Include https://"
          error={errors.additionalProfileUrl?.message}
        >
          <input
            {...register("additionalProfileUrl", {
              setValueAs: emptyToUndefined,
            })}
            id={volunteerFieldId("additionalProfileUrl")}
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://"
            maxLength={2048}
            aria-invalid={errors.additionalProfileUrl ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "additionalProfileUrl",
              error: errors.additionalProfileUrl?.message,
              hint: true,
            })}
            className={volunteerControlClass(
              Boolean(errors.additionalProfileUrl),
            )}
          />
        </VolunteerInterestField>
      </div>
    </section>
  );
}
