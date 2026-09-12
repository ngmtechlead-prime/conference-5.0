import "server-only";

import { SPONSORED_ATTENDEE_EMAILS } from "@/lib/constants/registration-eligibility";

export function isSponsoredAttendeeEmail(normalizedEmail: string): boolean {
  return SPONSORED_ATTENDEE_EMAILS.includes(normalizedEmail);
}
