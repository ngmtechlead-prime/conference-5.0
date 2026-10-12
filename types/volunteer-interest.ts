import type { z } from "zod";
import type { volunteerInterestSchema } from "@/lib/schemas/volunteer-interest";

export type VolunteerInterestInput = z.input<typeof volunteerInterestSchema>;
export type VolunteerInterestData = z.output<typeof volunteerInterestSchema>;
export type VolunteerRole = VolunteerInterestData["primaryRole"];

export interface CreateVolunteerInterestRequest {
  formData: VolunteerInterestInput;
}

export interface CreateVolunteerInterestSuccess {
  success: true;
  interestId: string;
  message: string;
}

export type VolunteerInterestFieldErrors = Record<string, string[]>;

export interface VolunteerInterestApiErrorBody {
  success?: false;
  code?: string;
  error?: string;
  message?: string;
  fieldErrors?: VolunteerInterestFieldErrors;
  details?: {
    fieldErrors?: VolunteerInterestFieldErrors;
    formErrors?: string[];
  };
}
