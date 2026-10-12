import { useFormContext, useWatch } from "react-hook-form";
import type { VolunteerInterestInput } from "@/types/volunteer-interest";
import {
  SectionHeading,
  VolunteerChoiceField,
  volunteerDescribedBy,
  volunteerFieldId,
} from "@/components/volunteer-interest/VolunteerInterestField";

export function AvailabilitySection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<VolunteerInterestInput>();

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
        title="Consent"
      />

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
