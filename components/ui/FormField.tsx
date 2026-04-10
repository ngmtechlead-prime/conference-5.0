"use client";

import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: FieldError;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  required = false,
  error,
  hint,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full px-4 py-2.5 text-sm border rounded-lg transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-[#0F1990]/20 focus:border-[#0F1990]",
        error
          ? "border-red-300 bg-red-50"
          : "border-gray-300 bg-white hover:border-gray-400",
        className,
      )}
      {...props}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  error,
  options,
  placeholder = "Select an option",
  className,
  ...props
}: SelectProps) {
  return (
    <select
      className={cn(
        "w-full px-4 py-2.5 text-sm border rounded-lg transition-colors appearance-none bg-no-repeat",
        "focus:outline-none focus:ring-2 focus:ring-[#0F1990]/20 focus:border-[#0F1990]",
        error
          ? "border-red-300 bg-red-50"
          : "border-gray-300 bg-white hover:border-gray-400",
        "bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:8px_8px] bg-[right_1rem_center]",
        className,
      )}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  maxLength?: number;
  currentLength?: number;
}

export function Textarea({
  error,
  className,
  maxLength,
  currentLength = 0,
  ...props
}: TextareaProps) {
  return (
    <div className="relative">
      <textarea
        className={cn(
          "w-full px-4 py-2.5 text-sm border rounded-lg transition-colors resize-none",
          "focus:outline-none focus:ring-2 focus:ring-[#0F1990]/20 focus:border-[#0F1990]",
          error
            ? "border-red-300 bg-red-50"
            : "border-gray-300 bg-white hover:border-gray-400",
          className,
        )}
        {...props}
      />
      {maxLength && (
        <span className="absolute bottom-2 right-3 text-xs text-gray-400">
          {currentLength} / {maxLength}
        </span>
      )}
    </div>
  );
}

interface RadioGroupProps {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  error,
}: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            "flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-colors",
            value === opt.value
              ? "border-[#0F1990] bg-blue-50"
              : error
                ? "border-red-300"
                : "border-gray-200 hover:border-gray-300",
          )}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-[#0F1990] focus:ring-[#0F1990]"
          />
          <span className="text-sm text-gray-700">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

interface CheckboxGroupProps {
  options: { value: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: boolean;
  columns?: 1 | 2 | 3;
}

export function CheckboxGroup({
  options,
  values,
  onChange,
  error,
  columns = 2,
}: CheckboxGroupProps) {
  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...values, value]);
    } else {
      onChange(values.filter((v) => v !== value));
    }
  };

  return (
    <div
      className={cn(
        "grid gap-2",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            "flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-colors",
            values.includes(opt.value)
              ? "border-[#0F1990] bg-blue-50"
              : error
                ? "border-red-300"
                : "border-gray-200 hover:border-gray-300",
          )}
        >
          <input
            type="checkbox"
            value={opt.value}
            checked={values.includes(opt.value)}
            onChange={(e) => handleChange(opt.value, e.target.checked)}
            className="w-4 h-4 rounded text-[#0F1990] focus:ring-[#0F1990]"
          />
          <span className="text-sm text-gray-700">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

interface FileUploadProps {
  accept?: string;
  maxSize?: string;
  hint?: string;
  fileName?: string;
  onFileSelect: (file: File | null) => void;
  error?: boolean;
}

export function FileUpload({
  accept,
  maxSize,
  hint,
  fileName,
  onFileSelect,
  error,
}: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
        error
          ? "border-red-300 bg-red-50"
          : "border-gray-300 hover:border-gray-400",
      )}
    >
      {fileName ? (
        <div className="space-y-2">
          <p className="text-sm text-gray-700">{fileName}</p>
          <button
            type="button"
            onClick={() => onFileSelect(null)}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-gray-600">
              <span className="text-[#0F1990] font-semibold">
                Upload a file
              </span>{" "}
              or drag and drop
            </p>
            {hint && <p className="text-xs text-gray-500">{hint}</p>}
            {maxSize && <p className="text-xs text-gray-400">Max {maxSize}</p>}
          </div>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
