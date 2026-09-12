import type { FieldErrors, FieldValues } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { registrationFieldId } from "@/components/registration/RegistrationField";

interface SummaryError {
  field: string;
  message: string;
}

const FIELD_LABELS: Record<string, string> = {
  ticketType: "Ticket Type",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  confirmEmail: "Confirm Email",
  phoneNumber: "Phone Number",
  gender: "Gender",
  maritalStatus: "Marital Status",
  maritalStatusOther: "Other Marital Status",
  residentialAddress: "Residential Address",
  activityOfInterest: "Activity of Interest",
  discoverySource: "Discovery Source",
  discoverySourceOther: "Other Discovery Source",
  referral: "Referral Code/Name",
  privacyConsent: "Privacy Consent",
  "undergraduate.institutionName": "University/Polytechnic Name",
  "undergraduate.fieldOfStudy": "Field of Study/Major",
  "undergraduate.studentStatusConfirmed": "Student Status Declaration",
  "professional.professionalInformation": "Current Role and Organization",
  "professional.industrySector": "Industry Sector",
  "professional.professionalCategory": "Professional Category",
};

function collectErrors(
  errors: FieldErrors<FieldValues>,
  parentPath = "",
): SummaryError[] {
  return Object.entries(errors).flatMap(([key, value]) => {
    if (!value) return [];

    const field = parentPath ? `${parentPath}.${key}` : key;
    if ("message" in value && typeof value.message === "string") {
      return [{ field, message: value.message }];
    }

    return collectErrors(value as FieldErrors<FieldValues>, field);
  });
}

interface RegistrationErrorSummaryProps {
  errors: FieldErrors<FieldValues>;
  submitError: string | null;
}

export function RegistrationErrorSummary({
  errors,
  submitError,
}: RegistrationErrorSummaryProps) {
  const fieldErrors = collectErrors(errors);
  if (!submitError && fieldErrors.length === 0) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      tabIndex={-1}
      className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-950"
    >
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div>
          <h2 className="font-bold">Please review your registration</h2>
          {submitError ? (
            <p className="mt-1 text-sm leading-6">{submitError}</p>
          ) : null}
          {fieldErrors.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {fieldErrors.map(({ field, message }) => (
                <li key={field}>
                  <a
                    href={`#${registrationFieldId(field)}`}
                    className="font-medium underline underline-offset-2 hover:no-underline"
                  >
                    {FIELD_LABELS[field] ?? field}: {message}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
