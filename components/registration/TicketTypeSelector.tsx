import type { FieldError } from "react-hook-form";
import { TICKET_TYPE_OPTIONS } from "@/lib/constants/registration";
import { cn } from "@/lib/utils";
import type { ConferenceTicketType } from "@/types/registration";
import {
  registrationErrorId,
  registrationFieldId,
} from "@/components/registration/RegistrationField";

interface TicketTypeSelectorProps {
  value?: ConferenceTicketType;
  error?: FieldError;
  onChange: (ticketType: ConferenceTicketType) => void;
}

export function TicketTypeSelector({
  value,
  error,
  onChange,
}: TicketTypeSelectorProps) {
  return (
    <fieldset
      id={registrationFieldId("ticketType")}
      aria-describedby={error ? registrationErrorId("ticketType") : undefined}
      aria-invalid={Boolean(error)}
      tabIndex={error ? -1 : undefined}
      className="space-y-4"
    >
      <legend className="text-lg font-bold text-[#0F1990]">
        Ticket Type
        <span className="ml-1 text-red-600" aria-hidden="true">
          *
        </span>
      </legend>
      <p className="text-sm leading-6 text-gray-600">
        Choose the category that best describes your current status.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {TICKET_TYPE_OPTIONS.map((option) => {
          const checked = value === option.value;
          const id = registrationFieldId(`ticketType-${option.value}`);

          return (
            <label
              key={option.value}
              htmlFor={id}
              className={cn(
                "relative flex cursor-pointer gap-3 rounded-xl border-2 p-4 transition-colors",
                "focus-within:ring-2 focus-within:ring-[#0F1990] focus-within:ring-offset-2",
                checked
                  ? "border-[#0F1990] bg-blue-50"
                  : error
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-200 hover:border-gray-400",
              )}
            >
              <input
                id={id}
                type="radio"
                name="ticketType"
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                required
                className="mt-1 size-4 shrink-0 accent-[#0F1990]"
              />
              <span>
                <span className="block text-sm font-bold text-gray-900">
                  {option.label}
                </span>
                <span className="mt-1 block text-xs leading-5 text-gray-600">
                  {option.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>
      {error?.message ? (
        <p
          id={registrationErrorId("ticketType")}
          className="text-sm font-medium text-red-700"
        >
          {error.message}
        </p>
      ) : null}
    </fieldset>
  );
}
