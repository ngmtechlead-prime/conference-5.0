"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  HeartHandshake,
  Loader2,
  MapPin,
  Save,
  Sparkles,
  User,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import {
  VOLUNTEER_STATUS_OPTIONS,
  getApplicantCategoryLabel,
  getAvailabilityWindowLabel,
  getCompetencyLabel,
  getContributionModeLabel,
  getContributionStageLabel,
  getEventAvailabilityLabel,
  getExperienceLevelLabel,
  getLgaLabel,
  getRoleLabel,
  getStateLabel,
  getStatusLabel,
  getWeeklyCommitmentLabel,
  type VolunteerInterestExportSource,
} from "@/lib/volunteer-interest-export";

interface Field {
  label: string;
  value: React.ReactNode;
  multiline?: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-sky-50 text-sky-800",
  UNDER_REVIEW: "bg-amber-50 text-amber-800",
  SHORTLISTED: "bg-violet-50 text-violet-800",
  CONTACTED: "bg-indigo-50 text-indigo-800",
  SELECTED: "bg-emerald-50 text-emerald-800",
  WAITLISTED: "bg-orange-50 text-orange-800",
  NOT_SELECTED: "bg-rose-50 text-rose-800",
};

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}

function displayValue(value: React.ReactNode) {
  if (value === null || value === undefined || value === "") return "—";
  return value;
}

function yesNoLabel(value: boolean | null | undefined) {
  if (value === null || value === undefined) return "—";
  return value ? "Yes" : "No";
}

function optionList(
  values: string[],
  getLabel: (value: string) => string,
) {
  if (values.length === 0) return "—";
  return (
    <span className="flex flex-wrap gap-2">
      {values.map((value) => (
        <span key={value} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
          {getLabel(value)}
        </span>
      ))}
    </span>
  );
}

function profileLink(value: string | null) {
  if (!value) return "—";
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return value;
  } catch {
    return value;
  }

  return (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#0F1990] underline decoration-blue-200 underline-offset-2 hover:decoration-[#0F1990]"
    >
      {value}
    </a>
  );
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
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-50 p-2">
          <Icon className="h-5 w-5 text-[#0F1990]" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <dl className="grid gap-x-8 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.label}
            className={`border-b border-gray-100 py-3 last:border-b-0 ${field.multiline ? "sm:col-span-2" : ""}`}
          >
            <dt className="mb-1 text-sm text-gray-500">{field.label}</dt>
            <dd className={`wrap-break-word text-sm font-medium text-gray-900 ${field.multiline ? "whitespace-pre-wrap leading-6" : ""}`}>
              {displayValue(field.value)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function VolunteerInterestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [interest, setInterest] = useState<VolunteerInterestExportSource | null>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchInterest() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/admin/volunteer-interests/${id}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = (await response.json()) as VolunteerInterestExportSource & {
          error?: string;
        };
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch volunteer interest");
        }

        setInterest(data);
        setStatus(data.status);
        setNotes(data.adminNotes ?? "");
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return;
        }
        setInterest(null);
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to fetch volunteer interest",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    fetchInterest();
    return () => controller.abort();
  }, [id, reloadKey]);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!interest) return;

    setIsSaving(true);
    setSaveError("");
    setSaveMessage("");

    try {
      const response = await fetch(`/api/admin/volunteer-interests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes: notes }),
      });
      const data = (await response.json()) as VolunteerInterestExportSource & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(data.error || "Failed to save review");
      }

      setInterest(data);
      setStatus(data.status);
      setNotes(data.adminNotes ?? "");
      setSaveMessage("Review saved successfully.");
    } catch (requestError) {
      setSaveError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to save review",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center" role="status">
        <Loader2 className="h-8 w-8 animate-spin text-[#0F1990]" aria-hidden="true" />
        <span className="sr-only">Loading volunteer interest</span>
      </div>
    );
  }

  if (!interest) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-12 text-center">
        <p role="alert" className="text-gray-600">
          {error || "Volunteer interest not found"}
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Link href="/admin/volunteer-interests" className="text-sm font-medium text-[#0F1990] hover:underline">
            Back to volunteer interests
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

  const isDirty = status !== interest.status || notes !== (interest.adminNotes ?? "");

  return (
    <div className="space-y-6">
      <header>
        <Link
          href="/admin/volunteer-interests"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0F1990]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to volunteer interests
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {interest.firstName} {interest.lastName}
            </h1>
            <p className="mt-1 text-gray-600">Volunteer interest submission</p>
          </div>
          <span className={`inline-flex self-start rounded-full px-3 py-1.5 text-sm font-medium ${STATUS_STYLES[interest.status] ?? "bg-gray-100 text-gray-800"}`}>
            {getStatusLabel(interest.status)}
          </span>
        </div>
      </header>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <DetailSection
            title="A. About You"
            icon={User}
            fields={[
              { label: "First name", value: interest.firstName },
              { label: "Last name", value: interest.lastName },
              { label: "Email address", value: interest.email },
              { label: "WhatsApp phone number", value: interest.phoneNumber },
              { label: "State", value: getStateLabel(interest.state) },
              { label: "LGA", value: getLgaLabel(interest.state, interest.lga) },
              { label: "City / town / community", value: interest.city },
              { label: "Full address", value: interest.address, multiline: true },
              { label: "Applicant category", value: getApplicantCategoryLabel(interest.applicantCategory) },
              { label: "Category (other)", value: interest.applicantCategoryOther },
              { label: "School, organisation, or place of work", value: interest.affiliationName },
              { label: "Course of study or job title", value: interest.courseOrJobTitle },
            ]}
          />

          <DetailSection
            title="B. Preferred Role and Competencies"
            icon={Sparkles}
            fields={[
              { label: "Primary role", value: getRoleLabel(interest.primaryRole) },
              { label: "Secondary / fallback role", value: getRoleLabel(interest.secondaryRole) },
              { label: "Other role description", value: interest.otherRoleDescription, multiline: true },
              { label: "Competencies", value: optionList(interest.competencies, getCompetencyLabel), multiline: true },
              { label: "Other competency", value: interest.otherCompetency, multiline: true },
            ]}
          />

          <DetailSection
            title="C. Experience and Motivation"
            icon={HeartHandshake}
            fields={[
              { label: "Relevant experience level", value: getExperienceLevelLabel(interest.experienceLevel) },
              { label: "Has volunteered before", value: yesNoLabel(interest.hasVolunteeredBefore) },
              { label: "Relevant experience or examples", value: interest.relevantExperience, multiline: true },
              { label: "Previous volunteering experience", value: interest.volunteerExperience, multiline: true },
              { label: "Why they want to volunteer", value: interest.motivation, multiline: true },
              { label: "Proposed contribution", value: interest.proposedContribution, multiline: true },
              { label: "Portfolio or professional profile", value: profileLink(interest.portfolioUrl), multiline: true },
              { label: "Additional social or profile URL", value: profileLink(interest.additionalProfileUrl), multiline: true },
            ]}
          />

          <DetailSection
            title="D. Availability and Consent"
            icon={ClipboardCheck}
            fields={[
              { label: "Contribution stages", value: optionList(interest.contributionStages, getContributionStageLabel), multiline: true },
              { label: "Preferred contribution mode", value: getContributionModeLabel(interest.contributionMode) },
              { label: "Weekly pre-conference commitment", value: getWeeklyCommitmentLabel(interest.weeklyCommitment) },
              { label: "Typical availability windows", value: optionList(interest.availabilityWindows, getAvailabilityWindowLabel), multiline: true },
              { label: "Main conference date availability", value: getEventAvailabilityLabel(interest.eventAvailability) },
              { label: "Commitment acknowledged", value: formatDate(interest.commitmentAcknowledgedAt) },
              { label: "Privacy consent recorded", value: formatDate(interest.privacyConsentAt) },
              { label: "Privacy notice version", value: interest.privacyNoticeVersion },
            ]}
          />
        </div>

        <aside className="space-y-6 xl:sticky xl:top-6">
          <form onSubmit={handleSave} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <CheckCircle2 className="h-5 w-5 text-[#0F1990]" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Admin review</h2>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Status</span>
              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setSaveMessage("");
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0F1990]"
              >
                {VOLUNTEER_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Private admin notes</span>
              <textarea
                value={notes}
                maxLength={5000}
                rows={8}
                onChange={(event) => {
                  setNotes(event.target.value);
                  setSaveMessage("");
                }}
                placeholder="Add internal review notes. These are never shown publicly."
                className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0F1990]"
              />
              <span className="mt-1 block text-right text-xs text-gray-400">{notes.length}/5000</span>
            </label>

            {saveError && <p role="alert" className="mt-3 text-sm text-red-700">{saveError}</p>}
            {saveMessage && <p role="status" className="mt-3 text-sm text-emerald-700">{saveMessage}</p>}

            <button
              type="submit"
              disabled={isSaving || !isDirty || !status}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F1990] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0d1680] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="h-4 w-4" aria-hidden="true" />
              )}
              {isSaving ? "Saving review…" : "Save review"}
            </button>
          </form>

          <DetailSection
            title="Record information"
            icon={CalendarClock}
            fields={[
              { label: "Submitted", value: formatDate(interest.createdAt) },
              { label: "Last updated", value: formatDate(interest.updatedAt) },
              { label: "Reviewed", value: formatDate(interest.reviewedAt) },
              { label: "Reviewed by", value: interest.reviewedBy },
            ]}
          />

          <section className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>
                The applicant&apos;s full address is sensitive and is intentionally available only in this protected detail view and administrator exports.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
