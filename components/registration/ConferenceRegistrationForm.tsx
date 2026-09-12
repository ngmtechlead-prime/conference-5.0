"use client";

import type { KeyboardEvent } from "react";
import { FormProvider } from "react-hook-form";
import { useConferenceRegistration } from "@/hooks/useConferenceRegistration";
import { CommonFields } from "@/components/registration/CommonFields";
import { ProfessionalFields } from "@/components/registration/ProfessionalFields";
import { RegistrationErrorSummary } from "@/components/registration/RegistrationErrorSummary";
import { RegistrationSubmitButton } from "@/components/registration/RegistrationSubmitButton";
import { TicketTypeSelector } from "@/components/registration/TicketTypeSelector";
import { UndergraduateFields } from "@/components/registration/UndergraduateFields";

export function ConferenceRegistrationForm() {
  const {
    form,
    ticketType,
    maritalStatus,
    discoverySource,
    submitError,
    changeTicketType,
    onSubmit,
  } = useConferenceRegistration();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  function preventTextInputSubmission(event: KeyboardEvent<HTMLFormElement>) {
    if (
      event.key === "Enter" &&
      event.target instanceof HTMLInputElement &&
      !["checkbox", "radio", "submit"].includes(event.target.type)
    ) {
      event.preventDefault();
    }
  }

  return (
    <FormProvider {...form}>
      <form
        id="conference-registration-form"
        onSubmit={onSubmit}
        onKeyDown={preventTextInputSubmission}
        noValidate
        aria-busy={isSubmitting}
        className="space-y-8"
      >
        <input type="hidden" {...register("ticketType")} />
        <input type="hidden" {...register("idempotencyKey")} />

        <RegistrationErrorSummary errors={errors} submitError={submitError} />

        <TicketTypeSelector
          value={ticketType}
          error={errors.ticketType}
          onChange={changeTicketType}
        />

        {ticketType ? (
          <>
            <div className="border-t border-gray-200" />
            <CommonFields
              maritalStatus={maritalStatus}
              discoverySource={discoverySource}
            />
            <div className="border-t border-gray-200" />
            {ticketType === "UNDERGRADUATE" ? (
              <UndergraduateFields />
            ) : (
              <ProfessionalFields />
            )}
            <div className="border-t border-gray-200" />
            <div className="flex justify-end">
              <RegistrationSubmitButton isSubmitting={isSubmitting} />
            </div>
          </>
        ) : (
          <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-950">
            Select a ticket type to continue with your registration.
          </p>
        )}
      </form>
    </FormProvider>
  );
}
