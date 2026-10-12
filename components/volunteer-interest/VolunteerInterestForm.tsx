"use client";

import type { KeyboardEvent } from "react";
import { FormProvider } from "react-hook-form";
import { AboutYouSection } from "@/components/volunteer-interest/AboutYouSection";
import { AvailabilitySection } from "@/components/volunteer-interest/AvailabilitySection";
import { ExperienceSection } from "@/components/volunteer-interest/ExperienceSection";
import { RoleAndCompetenciesSection } from "@/components/volunteer-interest/RoleAndCompetenciesSection";
import { VolunteerInterestErrorSummary } from "@/components/volunteer-interest/VolunteerInterestErrorSummary";
import { VolunteerInterestSubmitButton } from "@/components/volunteer-interest/VolunteerInterestSubmitButton";
import { useVolunteerInterestForm } from "@/hooks/useVolunteerInterestForm";

export function VolunteerInterestForm() {
  const { form, submitError, isPending, onSubmit } =
    useVolunteerInterestForm();
  const { register } = form;

  function preventTextInputSubmission(event: KeyboardEvent<HTMLFormElement>) {
    if (
      event.key === "Enter" &&
      event.target instanceof HTMLInputElement &&
      !["checkbox", "radio", "submit", "button"].includes(event.target.type)
    ) {
      event.preventDefault();
    }
  }

  return (
    <FormProvider {...form}>
      <form
        id="volunteer-interest-form"
        onSubmit={onSubmit}
        onKeyDown={preventTextInputSubmission}
        noValidate
        aria-busy={isPending}
        className="space-y-10"
      >
        <input type="hidden" {...register("idempotencyKey")} />

        <VolunteerInterestErrorSummary submitError={submitError} />

        <AboutYouSection />

        <div className="border-t border-gray-200" />

        <RoleAndCompetenciesSection />

        <div className="border-t border-gray-200" />

        <ExperienceSection />

        <div className="border-t border-gray-200" />

        <AvailabilitySection />

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
          <p className="font-bold">Before you submit</p>
          <p className="mt-1">
            Review your answers carefully. An expression of interest is not a
            guarantee of selection; shortlisted applicants will be contacted by
            email or WhatsApp.
          </p>
        </div>

        <div className="flex justify-end">
          <VolunteerInterestSubmitButton isPending={isPending} />
        </div>
      </form>
    </FormProvider>
  );
}
