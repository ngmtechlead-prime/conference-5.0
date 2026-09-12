import { LoaderCircle } from "lucide-react";

interface RegistrationSubmitButtonProps {
  isSubmitting: boolean;
}

export function RegistrationSubmitButton({
  isSubmitting,
}: RegistrationSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      aria-disabled={isSubmitting}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F1990] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1990] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {isSubmitting ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
      ) : null}
      <span>Complete Registration</span>
      {isSubmitting ? <span className="sr-only">Submitting</span> : null}
    </button>
  );
}
