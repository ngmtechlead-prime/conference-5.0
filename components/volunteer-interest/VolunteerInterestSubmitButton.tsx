import { LoaderCircle, Send } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import type { VolunteerInterestInput } from "@/types/volunteer-interest";

interface VolunteerInterestSubmitButtonProps {
  isPending: boolean;
}

export function VolunteerInterestSubmitButton({
  isPending,
}: VolunteerInterestSubmitButtonProps) {
  const { control } = useFormContext<VolunteerInterestInput>();
  const [commitmentAcknowledged, privacyConsent] = useWatch({
    control,
    name: ["commitmentAcknowledged", "privacyConsent"],
  });
  const isDisabled =
    isPending || !commitmentAcknowledged || !privacyConsent;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F1990] px-7 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1990] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {isPending ? (
        <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
      ) : (
        <Send className="size-4" aria-hidden="true" />
      )}
      <span>{isPending ? "Submitting interest…" : "Submit expression of interest"}</span>
      <span className="sr-only" aria-live="polite">
        {isPending ? "Submission in progress" : ""}
      </span>
    </button>
  );
}
