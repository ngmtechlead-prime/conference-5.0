"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarClock,
  GraduationCap,
  Loader2,
  ShieldCheck,
  Ticket,
  User,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import type { RegistrationExportSource } from "@/lib/registration-export";

const VALUE_LABELS: Record<string, string> = {
  UNDERGRADUATE: "Undergraduate",
  GRADUATE_PROFESSIONAL: "Graduate / Professional / Other",
  male: "Male",
  female: "Female",
  single: "Single",
  married: "Married",
  other: "Other",
  startup_pitch_competition: "Startup Pitch Competition",
  panel_discussions: "Panel Discussions",
  workshops_skill_sessions: "Workshops / Skill Sessions",
  networking_sessions: "Networking Sessions",
  one_on_one_mentorship: "One-on-One Mentorship",
  social_media: "Social Media",
  referral_friend: "Referral / Friend",
  email_newsletter: "Email Newsletter",
  school_campus_representative: "School / Campus Representative",
};

interface Field {
  label: string;
  value: string | boolean | null;
  multiline?: boolean;
}

function formatValue(value: Field["value"]): string {
  if (value === null || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return VALUE_LABELS[value] ?? value.replace(/_/g, " ");
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DetailSection({
  title,
  icon: Icon,
  fields,
}: {
  title: string;
  icon: React.ElementType;
  fields: Field[];
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-gray-100 p-2">
          <Icon className="h-5 w-5 text-gray-600" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <dl className="grid gap-x-8 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.label}
            className={field.multiline ? "border-b border-gray-100 py-3 sm:col-span-2" : "border-b border-gray-100 py-3"}
          >
            <dt className="mb-1 text-sm text-gray-500">{field.label}</dt>
            <dd
              className={`text-sm font-medium text-gray-900 ${
                field.multiline ? "whitespace-pre-wrap" : "wrap-break-word"
              }`}
            >
              {formatValue(field.value)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function RegistrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [registration, setRegistration] =
    useState<RegistrationExportSource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRegistration() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/admin/registrations/${id}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = (await response.json()) as RegistrationExportSource & {
          error?: string;
        };

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch registration");
        }

        setRegistration(data);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return;
        }
        setRegistration(null);
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to fetch registration",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    fetchRegistration();
    return () => controller.abort();
  }, [id, reloadKey]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center" role="status">
        <Loader2
          className="h-8 w-8 animate-spin text-[#0F1990]"
          aria-hidden="true"
        />
        <span className="sr-only">Loading registration</span>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
        <p role="alert" className="text-gray-600">
          {error || "Registration not found"}
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Link
            href="/admin/registrations"
            className="text-sm font-medium text-[#0F1990] hover:underline"
          >
            Back to registrations
          </Link>
          {error && (
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              className="text-sm font-medium text-[#0F1990] underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  const isUndergraduate = registration.ticketType === "UNDERGRADUATE";

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/registrations"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0F1990]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to registrations
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {registration.firstName} {registration.lastName}
            </h1>
            <p className="mt-1 text-gray-600">
              Registration {registration.publicReference}
            </p>
          </div>
          <span className="inline-flex self-start rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-[#0F1990]">
            {VALUE_LABELS[registration.ticketType]}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DetailSection
          title="Personal information"
          icon={User}
          fields={[
            { label: "First name", value: registration.firstName },
            { label: "Last name", value: registration.lastName },
            { label: "Email address", value: registration.email },
            { label: "Normalized email", value: registration.normalizedEmail },
            { label: "Phone number", value: registration.phoneNumber },
            { label: "Gender", value: registration.gender },
            { label: "Marital status", value: registration.maritalStatus },
            {
              label: "Marital status (other)",
              value: registration.maritalStatusOther,
            },
            {
              label: "Residential address",
              value: registration.residentialAddress,
              multiline: true,
            },
          ]}
        />

        <DetailSection
          title="Registration preferences"
          icon={Ticket}
          fields={[
            { label: "Ticket type", value: registration.ticketType },
            {
              label: "Activity of interest",
              value: registration.activityOfInterest,
            },
            {
              label: "Discovery source",
              value: registration.discoverySource,
            },
            {
              label: "Discovery source (other)",
              value: registration.discoverySourceOther,
            },
            { label: "Referral", value: registration.referral },
          ]}
        />

        {isUndergraduate ? (
          <DetailSection
            title="Undergraduate information"
            icon={GraduationCap}
            fields={[
              {
                label: "Institution name",
                value: registration.institutionName,
              },
              { label: "Field of study", value: registration.fieldOfStudy },
              {
                label: "Student status confirmed",
                value: registration.studentStatusConfirmed,
              },
            ]}
          />
        ) : (
          <DetailSection
            title="Professional information"
            icon={BriefcaseBusiness}
            fields={[
              {
                label: "Professional information",
                value: registration.professionalInformation,
                multiline: true,
              },
              { label: "Industry sector", value: registration.industrySector },
              {
                label: "Professional category",
                value: registration.professionalCategory,
              },
            ]}
          />
        )}

        <DetailSection
          title="Consent"
          icon={ShieldCheck}
          fields={[
            {
              label: "Privacy consent recorded",
              value: formatDate(registration.privacyConsentAt),
            },
            {
              label: "Privacy notice version",
              value: registration.privacyNoticeVersion,
            },
          ]}
        />
      </div>

      <DetailSection
        title="Record information"
        icon={CalendarClock}
        fields={[
          { label: "Internal ID", value: registration.id },
          {
            label: "Registration reference",
            value: registration.publicReference,
          },
          { label: "Created", value: formatDate(registration.createdAt) },
          { label: "Last updated", value: formatDate(registration.updatedAt) },
        ]}
      />
    </div>
  );
}
