import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function volunteerFieldId(name: string) {
  return `volunteer-interest-${name.replaceAll(".", "-")}`;
}

export function volunteerErrorId(name: string) {
  return `${volunteerFieldId(name)}-error`;
}

export function volunteerHintId(name: string) {
  return `${volunteerFieldId(name)}-hint`;
}

export function volunteerCounterId(name: string) {
  return `${volunteerFieldId(name)}-counter`;
}

export function volunteerDescribedBy({
  name,
  error,
  hint,
  counter,
}: {
  name: string;
  error?: string;
  hint?: boolean;
  counter?: boolean;
}) {
  return (
    [
      hint ? volunteerHintId(name) : null,
      counter ? volunteerCounterId(name) : null,
      error ? volunteerErrorId(name) : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined
  );
}

export function volunteerControlClass(hasError: boolean) {
  return cn(
    "min-h-11 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-950 shadow-sm outline-none transition-colors",
    "placeholder:text-gray-400 focus-visible:border-[#0F1990] focus-visible:ring-2 focus-visible:ring-[#0F1990]/20",
    "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500",
    hasError
      ? "border-red-500 bg-red-50/40"
      : "border-gray-300 hover:border-gray-400",
  );
}

interface VolunteerInterestFieldProps {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
  counter?: ReactNode;
}

export function VolunteerInterestField({
  name,
  label,
  required = false,
  error,
  hint,
  children,
  className,
  counter,
}: VolunteerInterestFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={volunteerFieldId(name)}
        className="block text-sm font-semibold text-gray-900"
      >
        {label}
        {required ? (
          <>
            <span className="ml-1 text-red-700" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>
      {children}
      {hint ? (
        <div
          id={volunteerHintId(name)}
          className="text-xs leading-5 text-gray-600"
        >
          {hint}
        </div>
      ) : null}
      {counter ? (
        <div
          id={volunteerCounterId(name)}
          className="text-right text-xs tabular-nums text-gray-600"
          aria-live="polite"
        >
          {counter}
        </div>
      ) : null}
      {error ? <VolunteerFieldError name={name} message={error} /> : null}
    </div>
  );
}

interface VolunteerChoiceFieldProps {
  name: string;
  legend: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
  counter?: ReactNode;
}

export function VolunteerChoiceField({
  name,
  legend,
  required = false,
  error,
  hint,
  children,
  className,
  counter,
}: VolunteerChoiceFieldProps) {
  return (
    <fieldset
      id={volunteerFieldId(name)}
      aria-invalid={error ? true : undefined}
      aria-describedby={volunteerDescribedBy({
        name,
        error,
        hint: Boolean(hint),
        counter: Boolean(counter),
      })}
      className={cn("min-w-0 space-y-3", className)}
    >
      <legend className="text-sm font-semibold text-gray-900">
        {legend}
        {required ? (
          <>
            <span className="ml-1 text-red-700" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </legend>
      {hint ? (
        <div
          id={volunteerHintId(name)}
          className="text-xs leading-5 text-gray-600"
        >
          {hint}
        </div>
      ) : null}
      {children}
      {counter ? (
        <div
          id={volunteerCounterId(name)}
          className="text-xs font-medium text-gray-600"
          aria-live="polite"
        >
          {counter}
        </div>
      ) : null}
      {error ? <VolunteerFieldError name={name} message={error} /> : null}
    </fieldset>
  );
}

export function VolunteerFieldError({
  name,
  message,
}: {
  name: string;
  message: string;
}) {
  return (
    <p id={volunteerErrorId(name)} className="text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

export function getWordCount(value: unknown) {
  if (typeof value !== "string") return 0;
  const normalized = value.trim();
  return normalized ? normalized.split(/\s+/).length : 0;
}

export function SectionHeading({
  number,
  title,
  description,
  id,
}: {
  number: number;
  title: string;
  description?: string;
  id: string;
}) {
  return (
    <div className="border-b border-gray-200 pb-5">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0F1990] text-sm font-bold text-white"
        >
          {number}
        </span>
        <div>
          <h2
            id={id}
            className="text-xl font-bold tracking-tight text-gray-950"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
