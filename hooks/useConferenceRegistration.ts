"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type DefaultValues,
  type FieldPath,
  type SubmitErrorHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  createConferenceRegistration,
  RegistrationApiError,
} from "@/lib/api/registrations";
import { conferenceRegistrationSchema } from "@/lib/schemas/registration";
import type {
  ConferenceRegistrationData,
  ConferenceRegistrationInput,
  ConferenceTicketType,
} from "@/types/registration";

const CLIENT_VALIDATION_MESSAGE =
  "Please correct the highlighted fields before completing your registration.";
const SUBMISSION_ERROR_MESSAGE =
  "We couldn't complete your registration. Your details have been preserved; please try again.";
const EMAIL_NOT_ELIGIBLE_MESSAGE =
  "We couldn't verify this email against the sponsored or discounted ticket list. Please check the email and register again, or contact the NGM Conference support team for assistance.";

const REGISTRATION_FIELD_PATHS = new Set<string>([
  "ticketType",
  "firstName",
  "lastName",
  "email",
  "confirmEmail",
  "phoneNumber",
  "gender",
  "maritalStatus",
  "maritalStatusOther",
  "residentialAddress",
  "activityOfInterest",
  "discoverySource",
  "discoverySourceOther",
  "referral",
  "privacyConsent",
  "undergraduate.institutionName",
  "undergraduate.fieldOfStudy",
  "undergraduate.studentStatusConfirmed",
  "professional.professionalInformation",
  "professional.industrySector",
  "professional.professionalCategory",
]);

function createIdempotencyKey() {
  return globalThis.crypto.randomUUID();
}

function hasEnteredCategoryDetails(data: ConferenceRegistrationInput) {
  if (data.ticketType === "UNDERGRADUATE") {
    const details = data.undergraduate;
    return Boolean(
      details?.institutionName ||
      details?.fieldOfStudy ||
      details?.studentStatusConfirmed,
    );
  }

  if (data.ticketType === "GRADUATE_PROFESSIONAL") {
    const details = data.professional;
    return Boolean(
      details?.professionalInformation ||
      details?.industrySector ||
      details?.professionalCategory,
    );
  }

  return false;
}

function normalizeServerFieldPath(field: string) {
  return field.replace(/^formData\./, "").replace(/\[(\w+)\]/g, ".$1");
}

export function useConferenceRegistration() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultValues: DefaultValues<ConferenceRegistrationInput> = {
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phoneNumber: "",
    residentialAddress: "",
    referral: "",
    privacyConsent: false,
    idempotencyKey: createIdempotencyKey(),
  };

  const form = useForm<
    ConferenceRegistrationInput,
    unknown,
    ConferenceRegistrationData
  >({
    resolver: zodResolver(conferenceRegistrationSchema),
    shouldUnregister: true,
    shouldFocusError: true,
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues,
  });

  const ticketType = useWatch({
    control: form.control,
    name: "ticketType",
  });
  const maritalStatus = useWatch({
    control: form.control,
    name: "maritalStatus",
  });
  const discoverySource = useWatch({
    control: form.control,
    name: "discoverySource",
  });

  useEffect(() => {
    if (maritalStatus !== "other") {
      form.unregister("maritalStatusOther");
      form.clearErrors("maritalStatusOther");
    }
  }, [form, maritalStatus]);

  useEffect(() => {
    if (discoverySource !== "other") {
      form.unregister("discoverySourceOther");
      form.clearErrors("discoverySourceOther");
    }
  }, [discoverySource, form]);

  function changeTicketType(nextTicketType: ConferenceTicketType) {
    const currentValues = form.getValues();
    const currentTicketType = currentValues.ticketType;

    if (currentTicketType === nextTicketType) return;

    if (
      currentTicketType &&
      hasEnteredCategoryDetails(currentValues) &&
      !window.confirm(
        "Changing ticket type will clear the education or professional details you have entered. Continue?",
      )
    ) {
      return;
    }

    if (currentTicketType === "UNDERGRADUATE") {
      form.unregister("undergraduate");
      form.clearErrors("undergraduate");
    } else if (currentTicketType === "GRADUATE_PROFESSIONAL") {
      form.unregister("professional");
      form.clearErrors("professional");
    }

    setSubmitError(null);
    form.setValue("ticketType", nextTicketType, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  async function submitRegistration(data: ConferenceRegistrationData) {
    setSubmitError(null);
    form.clearErrors();

    try {
      const result = await createConferenceRegistration(data);
      const query = new URLSearchParams({
        reference: result.publicReference,
        ticketType: data.ticketType,
      });
      router.push(`/register/success?${query.toString()}`);
    } catch (error) {
      if (error instanceof RegistrationApiError) {
        const serverErrors = Object.entries(error.fieldErrors);
        let firstField: FieldPath<ConferenceRegistrationInput> | undefined;

        for (const [rawField, messages] of serverErrors) {
          const normalizedField = normalizeServerFieldPath(rawField);
          if (!REGISTRATION_FIELD_PATHS.has(normalizedField)) continue;

          const field =
            normalizedField as FieldPath<ConferenceRegistrationInput>;
          firstField ??= field;
          form.setError(field, {
            type: "server",
            message: messages[0],
          });
        }

        if (
          (error.status === 403 || error.code === "EMAIL_NOT_ELIGIBLE") &&
          !firstField
        ) {
          firstField = "email";
          form.setError("email", {
            type: "server",
            message: "This email could not be verified for a sponsored ticket.",
          });
        }

        const errorMessage =
          error.status === 403 || error.code === "EMAIL_NOT_ELIGIBLE"
            ? EMAIL_NOT_ELIGIBLE_MESSAGE
            : error.message;

        setSubmitError(errorMessage);
        toast.error(errorMessage, { id: "registration-server-error" });

        if (firstField) {
          window.requestAnimationFrame(() => form.setFocus(firstField!));
        }
        return;
      }

      setSubmitError(SUBMISSION_ERROR_MESSAGE);
    }
  }

  const handleInvalid: SubmitErrorHandler<ConferenceRegistrationInput> = () => {
    setSubmitError(CLIENT_VALIDATION_MESSAGE);
    window.requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>(
          '#conference-registration-form [aria-invalid="true"]',
        )
        ?.focus();
    });
  };

  return {
    form,
    ticketType,
    maritalStatus,
    discoverySource,
    submitError,
    changeTicketType,
    onSubmit: form.handleSubmit(submitRegistration, handleInvalid),
  };
}
