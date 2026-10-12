"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  type DefaultValues,
  type FieldPath,
  type SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import {
  createVolunteerInterest,
  VolunteerInterestApiError,
} from "@/lib/api/volunteer-interests";
import { volunteerInterestSchema } from "@/lib/schemas/volunteer-interest";
import type {
  VolunteerInterestData,
  VolunteerInterestInput,
} from "@/types/volunteer-interest";

const CLIENT_VALIDATION_MESSAGE =
  "Please correct the highlighted fields before submitting your expression of interest.";
const SUBMISSION_ERROR_MESSAGE =
  "We couldn't submit your expression of interest. Your answers have been preserved; please try again.";
const DUPLICATE_EMAIL_MESSAGE =
  "An expression of interest has already been submitted with this email address.";

const VOLUNTEER_INTEREST_FIELD_PATHS = new Set<string>([
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "state",
  "lga",
  "city",
  "address",
  "applicantCategory",
  "applicantCategoryOther",
  "affiliationName",
  "courseOrJobTitle",
  "primaryRole",
  "secondaryRole",
  "otherRoleDescription",
  "competencies",
  "otherCompetency",
  "experienceLevel",
  "relevantExperience",
  "hasVolunteeredBefore",
  "volunteerExperience",
  "motivation",
  "proposedContribution",
  "portfolioUrl",
  "additionalProfileUrl",
  "contributionStages",
  "contributionMode",
  "weeklyCommitment",
  "availabilityWindows",
  "eventAvailability",
  "commitmentAcknowledged",
  "privacyConsent",
]);

const DEFAULT_VALUES: DefaultValues<VolunteerInterestInput> = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  state: "",
  lga: "",
  city: "",
  address: "",
  competencies: [],
  contributionStages: [],
  availabilityWindows: [],
  commitmentAcknowledged: false,
  privacyConsent: false,
  idempotencyKey: "",
};

function createIdempotencyKey() {
  return globalThis.crypto.randomUUID();
}

function normalizeServerFieldPath(field: string) {
  return field.replace(/^formData\./, "").replace(/\[(\w+)\]/g, ".$1");
}

function focusErrorSummary() {
  window.requestAnimationFrame(() => {
    document
      .getElementById("volunteer-interest-error-summary")
      ?.focus({ preventScroll: false });
  });
}

export function useVolunteerInterestForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<
    VolunteerInterestInput,
    unknown,
    VolunteerInterestData
  >({
    resolver: zodResolver(volunteerInterestSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: DEFAULT_VALUES,
  });

  const mutation = useMutation({
    mutationFn: createVolunteerInterest,
  });

  async function submitInterest(data: VolunteerInterestData) {
    setSubmitError(null);
    form.clearErrors();
    mutation.reset();

    try {
      await mutation.mutateAsync(data);
      router.push("/conf-6.0-interest-form/success");
    } catch (error) {
      if (error instanceof VolunteerInterestApiError) {
        let firstField: FieldPath<VolunteerInterestInput> | undefined;

        for (const [rawField, messages] of Object.entries(error.fieldErrors)) {
          const normalizedField = normalizeServerFieldPath(rawField);
          if (!VOLUNTEER_INTEREST_FIELD_PATHS.has(normalizedField)) continue;

          const field = normalizedField as FieldPath<VolunteerInterestInput>;
          firstField ??= field;
          form.setError(field, {
            type: "server",
            message: messages[0],
          });
        }

        if (
          (error.status === 409 || error.code === "DUPLICATE_EMAIL") &&
          !firstField
        ) {
          firstField = "email";
          form.setError("email", {
            type: "server",
            message: DUPLICATE_EMAIL_MESSAGE,
          });
        }

        const errorMessage =
          error.status === 409 || error.code === "DUPLICATE_EMAIL"
            ? DUPLICATE_EMAIL_MESSAGE
            : error.message;

        setSubmitError(errorMessage);
        toast.error(errorMessage, { id: "volunteer-interest-api-error" });

        if (firstField) {
          window.requestAnimationFrame(() => form.setFocus(firstField!));
        } else {
          focusErrorSummary();
        }
        return;
      }

      setSubmitError(SUBMISSION_ERROR_MESSAGE);
      toast.error(SUBMISSION_ERROR_MESSAGE, {
        id: "volunteer-interest-api-error",
      });
      focusErrorSummary();
    }
  }

  const handleInvalid: SubmitErrorHandler<VolunteerInterestInput> = () => {
    setSubmitError(CLIENT_VALIDATION_MESSAGE);
    window.requestAnimationFrame(() => {
      const invalidField = document.querySelector<HTMLElement>(
        '#volunteer-interest-form [aria-invalid="true"]',
      );
      const focusTarget = invalidField?.matches("input, select, textarea, button")
        ? invalidField
        : invalidField?.querySelector<HTMLElement>(
            "input, select, textarea, button",
          );
      focusTarget?.focus();
    });
  };

  const handleSubmit = form.handleSubmit(submitInterest, handleInvalid);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (!form.getValues("idempotencyKey")) {
      form.setValue("idempotencyKey", createIdempotencyKey(), {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: false,
      });
    }

    return handleSubmit(event);
  }

  return {
    form,
    submitError,
    isPending: mutation.isPending,
    onSubmit,
  };
}
