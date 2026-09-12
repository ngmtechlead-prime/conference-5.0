import type { z } from "zod";
import type { conferenceRegistrationSchema } from "@/lib/schemas/registration";

export type ConferenceRegistrationInput = z.input<
  typeof conferenceRegistrationSchema
>;

export type ConferenceRegistrationData = z.output<
  typeof conferenceRegistrationSchema
>;

export type ConferenceTicketType = ConferenceRegistrationData["ticketType"];

export interface CreateRegistrationRequest {
  formData: ConferenceRegistrationData;
}

export interface CreateRegistrationSuccess {
  success: true;
  registrationId: string;
  publicReference: string;
  message: string;
}

export type RegistrationFieldErrors = Record<string, string[]>;

export interface RegistrationApiErrorBody {
  success?: false;
  code?: string;
  error?: string;
  message?: string;
  fieldErrors?: RegistrationFieldErrors;
  details?: {
    fieldErrors?: RegistrationFieldErrors;
    formErrors?: string[];
  };
}
