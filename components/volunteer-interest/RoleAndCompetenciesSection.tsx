import { useFormContext, useWatch } from "react-hook-form";
import {
  VOLUNTEER_COMPETENCY_OPTIONS,
  VOLUNTEER_ROLE_OPTIONS,
} from "@/lib/constants/volunteer-interest";
import type { VolunteerInterestInput } from "@/types/volunteer-interest";
import {
  SectionHeading,
  VolunteerChoiceField,
  VolunteerInterestField,
  volunteerControlClass,
  volunteerDescribedBy,
  volunteerFieldId,
} from "@/components/volunteer-interest/VolunteerInterestField";

const TEAM_DESCRIPTIONS_URL = "https://drive.google.com/file/d/1HvM95y_RvizG4Epjlk4fr_vGf9LSjDPs/view?usp=sharing";

function emptyToUndefined(value: unknown) {
  return typeof value === "string" && value.trim() === "" ? undefined : value;
}

export function RoleAndCompetenciesSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<VolunteerInterestInput>();
  const primaryRole = useWatch({ control, name: "primaryRole" });
  const secondaryRole = useWatch({ control, name: "secondaryRole" });
  const competencies = useWatch({ control, name: "competencies" }) ?? [];
  const hasOtherRole = primaryRole === "OTHER" || secondaryRole === "OTHER";
  const hasOtherCompetency = competencies.includes("OTHER");
  const reachedCompetencyLimit = competencies.length >= 5;

  return (
    <section aria-labelledby="role-competencies-heading" className="space-y-6">
      <SectionHeading
        number={2}
        id="role-competencies-heading"
        title="Preferred role and competencies"
        description="Choose the area where you can contribute most, then tell us the practical skills you can bring."
      />

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
        Before choosing a role, review each team&apos;s job description, key
        responsibilities, expectations, and KPIs in the{" "}
        <a
          href={TEAM_DESCRIPTIONS_URL}
          className="font-semibold text-[#0F1990] underline underline-offset-2 hover:no-underline"
          target="_blank"
          rel="noreferrer noopener"
        >
          volunteer team descriptions
        </a>
        .
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <VolunteerInterestField
          name="primaryRole"
          label="Primary role or area of interest"
          required
          error={errors.primaryRole?.message}
        >
          <select
            {...register("primaryRole")}
            id={volunteerFieldId("primaryRole")}
            defaultValue=""
            required
            aria-invalid={errors.primaryRole ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "primaryRole",
              error: errors.primaryRole?.message,
            })}
            className={volunteerControlClass(Boolean(errors.primaryRole))}
          >
            <option value="" disabled>
              Select your primary role
            </option>
            {VOLUNTEER_ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </VolunteerInterestField>

        <VolunteerInterestField
          name="secondaryRole"
          label="Secondary/fallback role"
          hint="Optional. This must differ from your primary role."
          error={errors.secondaryRole?.message}
        >
          <select
            {...register("secondaryRole", { setValueAs: emptyToUndefined })}
            id={volunteerFieldId("secondaryRole")}
            defaultValue=""
            aria-invalid={errors.secondaryRole ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "secondaryRole",
              error: errors.secondaryRole?.message,
              hint: true,
            })}
            className={volunteerControlClass(Boolean(errors.secondaryRole))}
          >
            <option value="">No secondary role</option>
            {VOLUNTEER_ROLE_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.value === primaryRole}
              >
                {option.label}
                {option.value === primaryRole ? " (primary role)" : ""}
              </option>
            ))}
          </select>
        </VolunteerInterestField>
      </div>

      {hasOtherRole ? (
        <VolunteerInterestField
          name="otherRoleDescription"
          label="Other role description"
          required
          hint="Describe the role or area you have in mind."
          error={errors.otherRoleDescription?.message}
        >
          <input
            {...register("otherRoleDescription")}
            id={volunteerFieldId("otherRoleDescription")}
            type="text"
            maxLength={120}
            required
            aria-invalid={errors.otherRoleDescription ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "otherRoleDescription",
              error: errors.otherRoleDescription?.message,
              hint: true,
            })}
            className={volunteerControlClass(
              Boolean(errors.otherRoleDescription),
            )}
          />
        </VolunteerInterestField>
      ) : null}

      <VolunteerChoiceField
        name="competencies"
        legend="Which competencies can you confidently contribute?"
        required
        hint="Select between 1 and 5 competencies."
        counter={`${competencies.length} of 5 selected`}
        error={errors.competencies?.message}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {VOLUNTEER_COMPETENCY_OPTIONS.map((option) => {
            const isSelected = competencies.includes(option.value);
            const isDisabled = reachedCompetencyLimit && !isSelected;
            const id = `${volunteerFieldId("competencies")}-${option.value.toLowerCase()}`;

            return (
              <label
                key={option.value}
                htmlFor={id}
                className={`flex min-h-11 items-start gap-3 rounded-xl border p-3 text-sm leading-5 transition-colors ${
                  isSelected
                    ? "border-[#0F1990] bg-blue-50 text-blue-950"
                    : "border-gray-200 bg-white text-gray-800"
                } ${isDisabled ? "cursor-not-allowed opacity-55" : "cursor-pointer hover:border-gray-400"}`}
              >
                <input
                  {...register("competencies")}
                  id={id}
                  type="checkbox"
                  value={option.value}
                  disabled={isDisabled}
                  aria-invalid={errors.competencies ? true : undefined}
                  aria-describedby={volunteerDescribedBy({
                    name: "competencies",
                    error: errors.competencies?.message,
                    hint: true,
                    counter: true,
                  })}
                  className="mt-0.5 size-4 shrink-0 accent-[#0F1990] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1990] focus-visible:ring-offset-2"
                />
                <span>
                  {option.label}
                  {isSelected ? <span className="sr-only"> selected</span> : null}
                </span>
              </label>
            );
          })}
        </div>
      </VolunteerChoiceField>

      {hasOtherCompetency ? (
        <VolunteerInterestField
          name="otherCompetency"
          label="Other competency"
          required
          hint="Describe the additional competency you can contribute."
          error={errors.otherCompetency?.message}
        >
          <input
            {...register("otherCompetency")}
            id={volunteerFieldId("otherCompetency")}
            type="text"
            maxLength={120}
            required
            aria-invalid={errors.otherCompetency ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "otherCompetency",
              error: errors.otherCompetency?.message,
              hint: true,
            })}
            className={volunteerControlClass(Boolean(errors.otherCompetency))}
          />
        </VolunteerInterestField>
      ) : null}
    </section>
  );
}
