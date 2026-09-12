import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function registrationFieldId(name: string) {
  return `registration-${name.replaceAll(".", "-")}`;
}

export function registrationErrorId(name: string) {
  return `${registrationFieldId(name)}-error`;
}

export function registrationHintId(name: string) {
  return `${registrationFieldId(name)}-hint`;
}

export function registrationDescribedBy({
  name,
  error,
  hint,
}: {
  name: string;
  error?: string;
  hint?: string;
}) {
  return [hint ? registrationHintId(name) : null, error ? registrationErrorId(name) : null]
    .filter(Boolean)
    .join(" ") || undefined;
}

export function registrationControlClass(hasError: boolean) {
  return cn(
    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition-colors",
    "placeholder:text-gray-400 focus-visible:border-[#0F1990] focus-visible:ring-2 focus-visible:ring-[#0F1990]/20",
    hasError
      ? "border-red-500 bg-red-50/40"
      : "border-gray-300 hover:border-gray-400",
  );
}

interface RegistrationFieldProps {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function RegistrationField({
  name,
  label,
  required = false,
  error,
  hint,
  children,
  className,
}: RegistrationFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={registrationFieldId(name)}
        className="block text-sm font-semibold text-gray-800"
      >
        {label}
        {required ? (
          <span className="ml-1 text-red-600" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={registrationHintId(name)} className="text-xs leading-5 text-gray-600">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={registrationErrorId(name)}
          className="text-sm font-medium text-red-700"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
