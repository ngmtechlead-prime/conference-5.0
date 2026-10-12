"use client";

import type { MouseEvent } from "react";
import {
  type FieldErrors,
  type FieldValues,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { volunteerFieldId } from "@/components/volunteer-interest/VolunteerInterestField";
import type { VolunteerInterestInput } from "@/types/volunteer-interest";

interface SummaryError {
  field: string;
  message: string;
}

const FIELD_LABELS: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email address",
  phoneNumber: "WhatsApp phone number",
  state: "State",
  lga: "LGA",
  city: "City, town, or community",
  address: "Residential/contact address",
  applicantCategory: "Applicant category",
  applicantCategoryOther: "Other applicant category",
  affiliationName: "School, organisation, or place of work",
  courseOrJobTitle: "Course of study or job title",
  primaryRole: "Primary role",
  secondaryRole: "Secondary role",
  otherRoleDescription: "Other role description",
  competencies: "Competencies",
  otherCompetency: "Other competency",
  experienceLevel: "Relevant experience level",
  relevantExperience: "Relevant experience or examples",
  hasVolunteeredBefore: "Previous volunteering",
  volunteerExperience: "Previous volunteering experience",
  motivation: "Motivation",
  proposedContribution: "Proposed contribution",
  portfolioUrl: "Portfolio or professional profile URL",
  additionalProfileUrl: "Additional social/profile URL",
  contributionStages: "Contribution stages",
  contributionMode: "Preferred contribution mode",
  weeklyCommitment: "Weekly pre-conference commitment",
  availabilityWindows: "Typical availability windows",
  eventAvailability: "Main conference date availability",
  commitmentAcknowledged: "Commitment acknowledgement",
  privacyConsent: "Privacy consent",
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

interface VolunteerInterestErrorSummaryProps {
  submitError: string | null;
}

export function VolunteerInterestErrorSummary({
  submitError,
}: VolunteerInterestErrorSummaryProps) {
  const { control } = useFormContext<VolunteerInterestInput>();
  const { errors } = useFormState({ control });
  const fieldErrors = collectErrors(errors);
  if (!submitError && fieldErrors.length === 0) return null;

  function focusField(event: MouseEvent<HTMLAnchorElement>, field: string) {
    const target = document.getElementById(volunteerFieldId(field));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    const focusTarget = target.matches("input, select, textarea, button")
      ? target
      : target.querySelector<HTMLElement>("input, select, textarea, button");
    focusTarget?.focus({ preventScroll: true });
  }

  return (
    <div
      id="volunteer-interest-error-summary"
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
      className="scroll-mt-24 rounded-xl border border-red-300 bg-red-50 p-4 text-red-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
    >
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div>
          <h2 className="font-bold">Please review your expression of interest</h2>
          {submitError ? (
            <p className="mt-1 text-sm leading-6">{submitError}</p>
          ) : null}
          {fieldErrors.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {fieldErrors.map(({ field, message }) => (
                <li key={field}>
                  <a
                    href={`#${volunteerFieldId(field)}`}
                    onClick={(event) => focusField(event, field)}
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
