import { Controller, type FieldErrors, useFormContext } from "react-hook-form";
import type { ConferenceRegistrationInput } from "@/types/registration";
import {
  NIGERIAN_POLYTECHNICS,
  NIGERIAN_UNIVERSITIES,
} from "@/lib/constants/nigerian-institutions";
import { Select, type SelectOption } from "@/components/ui/select";
import {
  RegistrationField,
  registrationControlClass,
  registrationDescribedBy,
  registrationErrorId,
  registrationFieldId,
} from "@/components/registration/RegistrationField";

const INSTITUTION_OPTIONS = [
  ...NIGERIAN_UNIVERSITIES.map((institution) => ({
    value: institution,
    label: institution,
    group: "University",
  })),
  ...NIGERIAN_POLYTECHNICS.map((institution) => ({
    value: institution,
    label: institution,
    group: "Polytechnic",
  })),
] satisfies readonly SelectOption[];

export function UndergraduateFields() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ConferenceRegistrationInput>();
  const undergraduateErrors = (
    errors as FieldErrors<
      Extract<ConferenceRegistrationInput, { ticketType: "UNDERGRADUATE" }>
    >
  ).undergraduate;
  const institutionError = undergraduateErrors?.institutionName?.message;
  const fieldOfStudyError = undergraduateErrors?.fieldOfStudy?.message;
  const declarationError = undergraduateErrors?.studentStatusConfirmed?.message;

  return (
    <section aria-labelledby="education-heading" className="space-y-5">
      <div>
        <h2 id="education-heading" className="text-lg font-bold text-[#0F1990]">
          Education
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Tell us about your current undergraduate programme.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <RegistrationField
          name="undergraduate.institutionName"
          label="University/Polytechnic Name"
          required
          error={institutionError}
        >
          <Controller
            name="undergraduate.institutionName"
            control={control}
            render={({ field }) => (
              <Select
                ref={field.ref}
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                options={INSTITUTION_OPTIONS}
                id={registrationFieldId("undergraduate.institutionName")}
                placeholder="Select your institution"
                searchPlaceholder="Search institutions..."
                searchable
                autoComplete="organization"
                required
                aria-invalid={Boolean(institutionError)}
                aria-describedby={registrationDescribedBy({
                  name: "undergraduate.institutionName",
                  error: institutionError,
                })}
              />
            )}
          />
        </RegistrationField>

        <RegistrationField
          name="undergraduate.fieldOfStudy"
          label="Field of Study/Major"
          required
          error={fieldOfStudyError}
        >
          <input
            {...register("undergraduate.fieldOfStudy")}
            id={registrationFieldId("undergraduate.fieldOfStudy")}
            type="text"
            autoComplete="off"
            maxLength={120}
            required
            aria-invalid={Boolean(fieldOfStudyError)}
            aria-describedby={registrationDescribedBy({
              name: "undergraduate.fieldOfStudy",
              error: fieldOfStudyError,
            })}
            className={registrationControlClass(Boolean(fieldOfStudyError))}
          />
        </RegistrationField>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4">
        <label
          htmlFor={registrationFieldId("undergraduate.studentStatusConfirmed")}
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            {...register("undergraduate.studentStatusConfirmed")}
            id={registrationFieldId("undergraduate.studentStatusConfirmed")}
            type="checkbox"
            required
            aria-invalid={Boolean(declarationError)}
            aria-describedby={
              declarationError
                ? registrationErrorId("undergraduate.studentStatusConfirmed")
                : undefined
            }
            className="mt-1 size-4 shrink-0 rounded accent-[#0F1990] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1990] focus-visible:ring-offset-2"
          />
          <span className="text-sm leading-6 text-gray-800">
            I confirm that I am currently an undergraduate student and will
            provide valid proof of student status on the conference day. I
            understand that my sponsored ticket may be cancelled if I cannot
            provide proof.
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          </span>
        </label>
        {declarationError ? (
          <p
            id={registrationErrorId("undergraduate.studentStatusConfirmed")}
            className="mt-2 text-sm font-medium text-red-700"
          >
            {declarationError}
          </p>
        ) : null}
      </div>
    </section>
  );
}
