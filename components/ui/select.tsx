"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { Check, ChevronDown, Search } from "lucide-react";
import { useMemo, type Ref } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
}

interface SelectProps {
  ref?: Ref<HTMLInputElement>;
  id?: string;
  name?: string;
  options: readonly SelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  searchable?: boolean;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className?: string;
}

export function Select({
  ref,
  id,
  name,
  options,
  value,
  onValueChange,
  onBlur,
  placeholder = "Select an option",
  searchPlaceholder = "Search options...",
  emptyMessage = "No options found.",
  searchable = false,
  required,
  disabled,
  autoComplete,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  className,
}: SelectProps) {
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  return (
    <ComboboxPrimitive.Root<SelectOption>
      items={options}
      value={selectedOption}
      onValueChange={(option) => {
        if (option) {
          onValueChange(option.value);
        }
      }}
      itemToStringLabel={(option) => option.label}
      itemToStringValue={(option) => option.value}
      name={name}
      required={required}
      disabled={disabled}
      autoComplete={autoComplete}
      autoHighlight
    >
      <div className="relative">
        {searchable ? (
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-gray-400"
          />
        ) : null}
        <ComboboxPrimitive.Input
          ref={ref}
          id={id}
          onBlur={onBlur}
          placeholder={searchable ? searchPlaceholder : placeholder}
          readOnly={!searchable}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          className={cn(
            "w-full rounded-lg border bg-white py-3 pr-10 text-sm text-gray-900 shadow-sm outline-none transition-colors",
            searchable ? "pl-10" : "pl-4",
            "placeholder:text-gray-400 focus-visible:border-[#0F1990] focus-visible:ring-2 focus-visible:ring-[#0F1990]/20",
            ariaInvalid
              ? "border-red-500 bg-red-50/40"
              : "border-gray-300 hover:border-gray-400",
            className,
          )}
        />
        <ComboboxPrimitive.Trigger
          aria-label="Show options"
          className="absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-r-lg text-gray-500 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0F1990]/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronDown aria-hidden="true" className="size-4" />
        </ComboboxPrimitive.Trigger>
      </div>

      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Positioner
          sideOffset={6}
          align="start"
          className="z-50 w-(--anchor-width) max-w-(--available-width)"
        >
          <ComboboxPrimitive.Popup className="max-h-[min(20rem,var(--available-height))] overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-900 shadow-lg outline-none data-ending-style:opacity-0 data-starting-style:opacity-0">
            <ComboboxPrimitive.Empty className="px-4 py-6 text-center text-sm text-gray-500">
              {emptyMessage}
            </ComboboxPrimitive.Empty>
            <ComboboxPrimitive.List className="max-h-[min(20rem,var(--available-height))] overflow-y-auto p-1">
              {(option: SelectOption) => (
                <ComboboxPrimitive.Item
                  key={option.value}
                  value={option}
                  className="relative flex cursor-default items-center rounded-md py-2 pl-3 pr-9 text-sm outline-none data-highlighted:bg-blue-50 data-highlighted:text-[#0F1990]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{option.label}</span>
                    {option.group ? (
                      <span className="block text-xs text-gray-500">
                        {option.group}
                      </span>
                    ) : null}
                  </span>
                  <ComboboxPrimitive.ItemIndicator className="absolute right-3 flex size-4 items-center justify-center text-[#0F1990]">
                    <Check aria-hidden="true" className="size-4" />
                  </ComboboxPrimitive.ItemIndicator>
                </ComboboxPrimitive.Item>
              )}
            </ComboboxPrimitive.List>
          </ComboboxPrimitive.Popup>
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  );
}
