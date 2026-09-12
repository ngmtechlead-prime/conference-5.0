import { type FieldErrors, useFormContext } from "react-hook-form";
import {
  INDUSTRY_SECTOR_OPTIONS,
  PROFESSIONAL_CATEGORY_OPTIONS,
} from "@/lib/constants/registration";
import type { ConferenceRegistrationInput } from "@/types/registration";
import {
  RegistrationField,
  registrationControlClass,
  registrationDescribedBy,
  registrationFieldId,
} from "@/components/registration/RegistrationField";

export function ProfessionalFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ConferenceRegistrationInput>();
  const professionalErrors = (
    errors as FieldErrors<
      Extract<
        ConferenceRegistrationInput,
        { ticketType: "GRADUATE_PROFESSIONAL" }
      >
    >
  ).professional;
  const informationError = professionalErrors?.professionalInformation?.message;
  const industryError = professionalErrors?.industrySector?.message;
  const categoryError = professionalErrors?.professionalCategory?.message;

  return (
    <section aria-labelledby="professional-heading" className="space-y-5">
      <div>
        <h2
          id="professional-heading"
          className="text-lg font-bold text-[#0F1990]"
        >
          Professional Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Share your current professional or graduate status.
        </p>
      </div>

      <RegistrationField
        name="professional.professionalInformation"
        label="Current Role and Organization"
        required
        hint="Enter your current role and organization, or describe your current status (for example, recent graduate or job seeker)."
        error={informationError}
      >
        <input
          {...register("professional.professionalInformation")}
          id={registrationFieldId("professional.professionalInformation")}
          type="text"
          autoComplete="organization-title"
          maxLength={200}
          required
          aria-invalid={Boolean(informationError)}
          aria-describedby={registrationDescribedBy({
            name: "professional.professionalInformation",
            error: informationError,
            hint: "present",
          })}
          className={registrationControlClass(Boolean(informationError))}
        />
      </RegistrationField>

      <div className="grid gap-5 md:grid-cols-2">
        <RegistrationField
          name="professional.industrySector"
          label="Industry Sector"
          required
          error={industryError}
        >
          <select
            {...register("professional.industrySector")}
            id={registrationFieldId("professional.industrySector")}
            defaultValue=""
            required
            aria-invalid={Boolean(industryError)}
            aria-describedby={registrationDescribedBy({
              name: "professional.industrySector",
              error: industryError,
            })}
            className={registrationControlClass(Boolean(industryError))}
          >
            <option value="" disabled>
              Select an industry
            </option>
            {INDUSTRY_SECTOR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </RegistrationField>

        <RegistrationField
          name="professional.professionalCategory"
          label="Professional Category"
          required
          error={categoryError}
        >
          <select
            {...register("professional.professionalCategory")}
            id={registrationFieldId("professional.professionalCategory")}
            defaultValue=""
            required
            aria-invalid={Boolean(categoryError)}
            aria-describedby={registrationDescribedBy({
              name: "professional.professionalCategory",
              error: categoryError,
            })}
            className={registrationControlClass(Boolean(categoryError))}
          >
            <option value="" disabled>
              Select a category
            </option>
            {PROFESSIONAL_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </RegistrationField>
      </div>
    </section>
  );
}
