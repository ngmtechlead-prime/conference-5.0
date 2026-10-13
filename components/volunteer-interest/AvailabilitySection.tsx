import { useFormContext, useWatch } from "react-hook-form";
import {
  VOLUNTEER_AVAILABILITY_WINDOW_OPTIONS,
  VOLUNTEER_CONTRIBUTION_MODE_OPTIONS,
  VOLUNTEER_CONTRIBUTION_STAGE_OPTIONS,
  VOLUNTEER_EVENT_AVAILABILITY_OPTIONS,
  VOLUNTEER_WEEKLY_COMMITMENT_OPTIONS,
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

function emptyToUndefined(value: unknown) {
  return typeof value === "string" && value.trim() === "" ? undefined : value;
}

export function AvailabilitySection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<VolunteerInterestInput>();

  const contributionStages =
    useWatch({ control, name: "contributionStages" }) ?? [];
  const availabilityWindows =
    useWatch({ control, name: "availabilityWindows" }) ?? [];
  const commitmentAcknowledged = useWatch({
    control,
    name: "commitmentAcknowledged",
  });
  const privacyConsent = useWatch({ control, name: "privacyConsent" });

  return (
    <section aria-labelledby="availability-heading" className="space-y-7">
      <SectionHeading
        number={4}
        id="availability-heading"
        title="Availability and consent"
        description="The availability questions are optional. Share what you currently know so we can plan suitable team assignments."
      />

      <VolunteerChoiceField
        name="contributionStages"
        legend="When would you like to contribute?"
        hint="Optional. Select all stages that apply."
        error={errors.contributionStages?.message}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {VOLUNTEER_CONTRIBUTION_STAGE_OPTIONS.map((option) => {
            const isSelected = contributionStages.includes(option.value);
            const id = `${volunteerFieldId("contributionStages")}-${option.value.toLowerCase()}`;

            return (
              <label
                key={option.value}
                htmlFor={id}
                className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm leading-5 transition-colors ${
                  isSelected
                    ? "border-[#0F1990] bg-blue-50 text-blue-950"
                    : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"
                }`}
              >
                <input
                  {...register("contributionStages")}
                  id={id}
                  type="checkbox"
                  value={option.value}
                  aria-invalid={errors.contributionStages ? true : undefined}
                  aria-describedby={volunteerDescribedBy({
                    name: "contributionStages",
                    error: errors.contributionStages?.message,
                    hint: true,
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

      <div className="grid gap-5 sm:grid-cols-2">
        <VolunteerInterestField
          name="contributionMode"
          label="Preferred contribution mode"
          hint="Optional."
          error={errors.contributionMode?.message}
        >
          <select
            {...register("contributionMode", { setValueAs: emptyToUndefined })}
            id={volunteerFieldId("contributionMode")}
            defaultValue=""
            aria-invalid={errors.contributionMode ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "contributionMode",
              error: errors.contributionMode?.message,
              hint: true,
            })}
            className={volunteerControlClass(Boolean(errors.contributionMode))}
          >
            <option value="">Select a mode</option>
            {VOLUNTEER_CONTRIBUTION_MODE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </VolunteerInterestField>

        <VolunteerInterestField
          name="weeklyCommitment"
          label="Weekly pre-conference commitment"
          hint="Optional. Choose your best current estimate."
          error={errors.weeklyCommitment?.message}
        >
          <select
            {...register("weeklyCommitment", { setValueAs: emptyToUndefined })}
            id={volunteerFieldId("weeklyCommitment")}
            defaultValue=""
            aria-invalid={errors.weeklyCommitment ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "weeklyCommitment",
              error: errors.weeklyCommitment?.message,
              hint: true,
            })}
            className={volunteerControlClass(Boolean(errors.weeklyCommitment))}
          >
            <option value="">Select a weekly commitment</option>
            {VOLUNTEER_WEEKLY_COMMITMENT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </VolunteerInterestField>
      </div>

      <VolunteerChoiceField
        name="availabilityWindows"
        legend="What are your typical availability windows?"
        hint="Optional. Select all that apply."
        error={errors.availabilityWindows?.message}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {VOLUNTEER_AVAILABILITY_WINDOW_OPTIONS.map((option) => {
            const isSelected = availabilityWindows.includes(option.value);
            const id = `${volunteerFieldId("availabilityWindows")}-${option.value.toLowerCase()}`;

            return (
              <label
                key={option.value}
                htmlFor={id}
                className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm leading-5 transition-colors ${
                  isSelected
                    ? "border-[#0F1990] bg-blue-50 text-blue-950"
                    : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"
                }`}
              >
                <input
                  {...register("availabilityWindows")}
                  id={id}
                  type="checkbox"
                  value={option.value}
                  aria-invalid={errors.availabilityWindows ? true : undefined}
                  aria-describedby={volunteerDescribedBy({
                    name: "availabilityWindows",
                    error: errors.availabilityWindows?.message,
                    hint: true,
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

      <VolunteerInterestField
        name="eventAvailability"
        label="Will you be available during the main conference dates?"
        hint="Optional. Select the answer that best reflects your current plans."
        error={errors.eventAvailability?.message}
      >
        <select
          {...register("eventAvailability", { setValueAs: emptyToUndefined })}
          id={volunteerFieldId("eventAvailability")}
          defaultValue=""
          aria-invalid={errors.eventAvailability ? true : undefined}
          aria-describedby={volunteerDescribedBy({
            name: "eventAvailability",
            error: errors.eventAvailability?.message,
            hint: true,
          })}
          className={volunteerControlClass(Boolean(errors.eventAvailability))}
        >
          <option value="">Select your availability</option>
          {VOLUNTEER_EVENT_AVAILABILITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </VolunteerInterestField>

      <div className="border-t border-gray-200 pt-7">
        <h3 className="text-lg font-bold text-gray-950">Consent</h3>
      </div>

      <VolunteerChoiceField
        name="commitmentAcknowledged"
        legend="Commitment acknowledgement"
        required
        error={errors.commitmentAcknowledged?.message}
      >
        <label
          htmlFor={`${volunteerFieldId("commitmentAcknowledged")}-checkbox`}
          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${
            commitmentAcknowledged
              ? "border-[#0F1990] bg-blue-50 text-blue-950"
              : "border-gray-200 bg-gray-50 text-gray-800 hover:border-gray-400"
          }`}
        >
          <input
            {...register("commitmentAcknowledged")}
            id={`${volunteerFieldId("commitmentAcknowledged")}-checkbox`}
            type="checkbox"
            required
            aria-invalid={errors.commitmentAcknowledged ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "commitmentAcknowledged",
              error: errors.commitmentAcknowledged?.message,
              hint: true,
            })}
            className="mt-1 size-4 shrink-0 accent-[#0F1990] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1990] focus-visible:ring-offset-2"
          />
          <span>
            I understand that selected volunteers must communicate reliably and
            attend agreed meetings, training sessions, or shifts.
            {commitmentAcknowledged ? (
              <span className="sr-only"> selected</span>
            ) : null}
          </span>
        </label>
      </VolunteerChoiceField>

      <VolunteerChoiceField
        name="privacyConsent"
        legend="Privacy consent"
        required
        error={errors.privacyConsent?.message}
      >
        <label
          htmlFor={`${volunteerFieldId("privacyConsent")}-checkbox`}
          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${
            privacyConsent
              ? "border-[#0F1990] bg-blue-50 text-blue-950"
              : "border-gray-200 bg-gray-50 text-gray-800 hover:border-gray-400"
          }`}
        >
          <input
            {...register("privacyConsent")}
            id={`${volunteerFieldId("privacyConsent")}-checkbox`}
            type="checkbox"
            required
            aria-invalid={errors.privacyConsent ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "privacyConsent",
              error: errors.privacyConsent?.message,
              hint: true,
            })}
            className="mt-1 size-4 shrink-0 accent-[#0F1990] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1990] focus-visible:ring-offset-2"
          />
          <span>
            I consent to NGM collecting and using my information to assess and
            administer this volunteer expression of interest. I have read the{" "}
            <a
              href="#volunteer-interest-privacy-notice"
              className="font-semibold text-[#0F1990] underline underline-offset-2 hover:no-underline"
            >
              privacy notice
            </a>
            .
            {privacyConsent ? <span className="sr-only"> selected</span> : null}
          </span>
        </label>
      </VolunteerChoiceField>
    </section>
  );
}
