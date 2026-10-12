"use client";

import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  NIGERIA_STATE_OPTIONS,
  VOLUNTEER_APPLICANT_CATEGORY_OPTIONS,
  VOLUNTEER_COMPETENCY_OPTIONS,
  VOLUNTEER_EVENT_AVAILABILITY_OPTIONS,
  VOLUNTEER_EXPERIENCE_LEVEL_OPTIONS,
  VOLUNTEER_ROLE_OPTIONS,
  VOLUNTEER_STATUS_OPTIONS,
  VOLUNTEER_WEEKLY_COMMITMENT_OPTIONS,
  exportVolunteerInterestsToCSV,
  exportVolunteerInterestsToExcel,
  flattenVolunteerInterest,
  getApplicantCategoryLabel,
  getEventAvailabilityLabel,
  getExperienceLevelLabel,
  getLgaLabel,
  getLgaOptions,
  getRoleLabel,
  getStateLabel,
  getStatusLabel,
  type SelectOption,
  type VolunteerInterestExportSource,
  type VolunteerInterestListItem,
} from "@/lib/volunteer-interest-export";

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface InterestsResponse<T> {
  interests?: T[];
  pagination?: Pagination;
  error?: string;
}

interface Filters {
  state: string;
  lga: string;
  primaryRole: string;
  secondaryRole: string;
  competency: string;
  applicantCategory: string;
  experienceLevel: string;
  hasVolunteeredBefore: string;
  weeklyCommitment: string;
  eventAvailability: string;
  status: string;
}

type FilterKey = keyof Filters;

const EMPTY_FILTERS: Filters = {
  state: "",
  lga: "",
  primaryRole: "",
  secondaryRole: "",
  competency: "",
  applicantCategory: "",
  experienceLevel: "",
  hasVolunteeredBefore: "",
  weeklyCommitment: "",
  eventAvailability: "",
  status: "",
};

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-sky-50 text-sky-800",
  UNDER_REVIEW: "bg-amber-50 text-amber-800",
  SHORTLISTED: "bg-violet-50 text-violet-800",
  CONTACTED: "bg-indigo-50 text-indigo-800",
  SELECTED: "bg-emerald-50 text-emerald-800",
  WAITLISTED: "bg-orange-50 text-orange-800",
  NOT_SELECTED: "bg-rose-50 text-rose-800",
};

function SelectFilter({
  label,
  value,
  options,
  emptyLabel,
  disabled = false,
  onChange,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  emptyLabel: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-600">{label}</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0F1990] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
      >
        <option value="">{emptyLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}

function appendFilters(query: URLSearchParams, filters: Filters) {
  for (const [key, value] of Object.entries(filters)) {
    if (value) query.set(key, value);
  }
}

export default function VolunteerInterestsPage() {
  const [interests, setInterests] = useState<VolunteerInterestListItem[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  const lgaOptions = useMemo(
    () => getLgaOptions(filters.state),
    [filters.state],
  );
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const isFiltered = Boolean(debouncedSearch || activeFilterCount);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        exportMenuRef.current &&
        !exportMenuRef.current.contains(event.target as Node)
      ) {
        setShowExportMenu(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setShowExportMenu(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchInterests() {
      setIsLoading(true);
      setError("");

      try {
        const query = new URLSearchParams({ page: String(page) });
        if (debouncedSearch) query.set("search", debouncedSearch);
        appendFilters(query, filters);

        const response = await fetch(`/api/admin/volunteer-interests?${query}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = (await response.json()) as InterestsResponse<VolunteerInterestListItem>;
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch volunteer interests");
        }

        const nextPagination = data.pagination ?? null;
        if (
          nextPagination &&
          nextPagination.totalPages > 0 &&
          page > nextPagination.totalPages
        ) {
          setPage(nextPagination.totalPages);
          return;
        }

        setInterests(data.interests ?? []);
        setPagination(nextPagination);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return;
        }
        setInterests([]);
        setPagination(null);
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to fetch volunteer interests",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    fetchInterests();
    return () => controller.abort();
  }, [debouncedSearch, filters, page, reloadKey]);

  function updateFilter(key: FilterKey, value: string) {
    setFilters((current) => ({
      ...current,
      [key]: value,
      ...(key === "state" ? { lga: "" } : {}),
    }));
    setPage(1);
  }

  function clearFilters() {
    setSearch("");
    setDebouncedSearch("");
    setFilters(EMPTY_FILTERS);
    setPage(1);
  }

  async function handleExport(format: "csv" | "excel") {
    setIsExporting(true);
    setShowExportMenu(false);
    setError("");

    try {
      const query = new URLSearchParams({ export: "true" });
      if (debouncedSearch) query.set("search", debouncedSearch);
      appendFilters(query, filters);

      const response = await fetch(`/api/admin/volunteer-interests?${query}`, {
        cache: "no-store",
      });
      const data = (await response.json()) as InterestsResponse<VolunteerInterestExportSource>;
      if (!response.ok) {
        throw new Error(data.error || "Failed to export volunteer interests");
      }
      if (!data.interests?.length) {
        throw new Error("There are no matching volunteer interests to export");
      }

      const rows = data.interests.map(flattenVolunteerInterest);
      const filename = `volunteer-interests-${isFiltered ? "filtered-" : ""}${new Date()
        .toISOString()
        .slice(0, 10)}`;
      if (format === "csv") {
        exportVolunteerInterestsToCSV(rows, filename);
      } else {
        exportVolunteerInterestsToExcel(rows, filename);
      }
    } catch (exportError) {
      setError(
        exportError instanceof Error
          ? exportError.message
          : "Failed to export volunteer interests",
      );
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteer Interests</h1>
          <p className="mt-1 text-gray-600">
            Review and manage Conference 6.0 volunteer applicants
          </p>
        </div>

        <div className="relative self-start" ref={exportMenuRef}>
          <button
            type="button"
            disabled={isExporting}
            aria-expanded={showExportMenu}
            aria-haspopup="menu"
            onClick={() => setShowExportMenu((visible) => !visible)}
            className="flex items-center gap-2 rounded-lg bg-[#0F1990] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0d1680] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Download className="h-4 w-4" aria-hidden="true" />
            )}
            {isExporting ? "Exporting…" : "Export"}
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>

          {showExportMenu && (
            <div
              role="menu"
              className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
            >
              <div className="border-b border-gray-100 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {isFiltered ? "Export active results" : "Export all results"}
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={() => handleExport("csv")}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                Download as CSV
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => handleExport("excel")}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                Download as Excel
              </button>
            </div>
          )}
        </div>
      </div>

      <section aria-label="Volunteer interest filters" className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search volunteer interests</span>
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              maxLength={200}
              placeholder="Search name, email, phone, city, address, or affiliation…"
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0F1990]"
            />
          </label>
          <button
            type="button"
            aria-expanded={showFilters}
            onClick={() => setShowFilters((visible) => !visible)}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-[#0F1990] px-2 py-0.5 text-xs text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
          {isFiltered && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[#0F1990] hover:bg-blue-50"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Clear
            </button>
          )}
        </div>

        {showFilters && (
          <div className="mt-4 grid gap-4 border-t border-gray-100 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <SelectFilter
              label="State"
              value={filters.state}
              options={NIGERIA_STATE_OPTIONS}
              emptyLabel="All states"
              onChange={(value) => updateFilter("state", value)}
            />
            <SelectFilter
              label="LGA"
              value={filters.lga}
              options={lgaOptions}
              emptyLabel={filters.state ? "All LGAs" : "Select a state first"}
              disabled={!filters.state}
              onChange={(value) => updateFilter("lga", value)}
            />
            <SelectFilter
              label="Primary role"
              value={filters.primaryRole}
              options={VOLUNTEER_ROLE_OPTIONS}
              emptyLabel="All primary roles"
              onChange={(value) => updateFilter("primaryRole", value)}
            />
            <SelectFilter
              label="Secondary role"
              value={filters.secondaryRole}
              options={VOLUNTEER_ROLE_OPTIONS}
              emptyLabel="All secondary roles"
              onChange={(value) => updateFilter("secondaryRole", value)}
            />
            <SelectFilter
              label="Competency"
              value={filters.competency}
              options={VOLUNTEER_COMPETENCY_OPTIONS}
              emptyLabel="All competencies"
              onChange={(value) => updateFilter("competency", value)}
            />
            <SelectFilter
              label="Applicant category"
              value={filters.applicantCategory}
              options={VOLUNTEER_APPLICANT_CATEGORY_OPTIONS}
              emptyLabel="All categories"
              onChange={(value) => updateFilter("applicantCategory", value)}
            />
            <SelectFilter
              label="Experience level"
              value={filters.experienceLevel}
              options={VOLUNTEER_EXPERIENCE_LEVEL_OPTIONS}
              emptyLabel="All experience levels"
              onChange={(value) => updateFilter("experienceLevel", value)}
            />
            <SelectFilter
              label="Previous volunteering"
              value={filters.hasVolunteeredBefore}
              options={[
                { value: "true", label: "Yes" },
                { value: "false", label: "No" },
              ]}
              emptyLabel="Any volunteering history"
              onChange={(value) => updateFilter("hasVolunteeredBefore", value)}
            />
            <SelectFilter
              label="Weekly commitment"
              value={filters.weeklyCommitment}
              options={VOLUNTEER_WEEKLY_COMMITMENT_OPTIONS}
              emptyLabel="All commitments"
              onChange={(value) => updateFilter("weeklyCommitment", value)}
            />
            <SelectFilter
              label="Event availability"
              value={filters.eventAvailability}
              options={VOLUNTEER_EVENT_AVAILABILITY_OPTIONS}
              emptyLabel="Any event availability"
              onChange={(value) => updateFilter("eventAvailability", value)}
            />
            <SelectFilter
              label="Review status"
              value={filters.status}
              options={VOLUNTEER_STATUS_OPTIONS}
              emptyLabel="All statuses"
              onChange={(value) => updateFilter("status", value)}
            />
          </div>
        )}
      </section>

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
            className="self-start font-semibold underline sm:self-auto"
          >
            Try again
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center" role="status">
            <Loader2 className="h-8 w-8 animate-spin text-[#0F1990]" aria-hidden="true" />
            <span className="sr-only">Loading volunteer interests</span>
          </div>
        ) : interests.length === 0 ? (
          <div className="px-4 py-16 text-center">
            <p className="font-medium text-gray-700">No volunteer interests found</p>
            <p className="mt-1 text-sm text-gray-500">
              {isFiltered
                ? "Try clearing or changing the active filters."
                : "Submissions will appear here when they are received."}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-280 w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    {[
                      "Applicant",
                      "State / LGA",
                      "Primary Role",
                      "Category",
                      "Experience",
                      "Event Availability",
                      "Status",
                      "Submitted",
                    ].map((heading) => (
                      <th key={heading} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        {heading}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {interests.map((interest) => (
                    <tr key={interest.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <p className="font-medium text-gray-900">
                          {interest.firstName} {interest.lastName}
                        </p>
                        <p className="max-w-52 truncate text-sm text-gray-500" title={interest.email}>
                          {interest.email}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        <p>{getStateLabel(interest.state)}</p>
                        <p className="text-gray-500">{getLgaLabel(interest.state, interest.lga)}</p>
                      </td>
                      <td className="max-w-52 px-4 py-4 text-sm text-gray-700">
                        {getRoleLabel(interest.primaryRole)}
                      </td>
                      <td className="max-w-44 px-4 py-4 text-sm text-gray-700">
                        {getApplicantCategoryLabel(interest.applicantCategory)}
                      </td>
                      <td className="max-w-40 px-4 py-4 text-sm text-gray-700">
                        {getExperienceLevelLabel(interest.experienceLevel)}
                      </td>
                      <td className="max-w-40 px-4 py-4 text-sm text-gray-700">
                        {getEventAvailabilityLabel(interest.eventAvailability)}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[interest.status] ?? "bg-gray-100 text-gray-800"}`}>
                          {getStatusLabel(interest.status)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                        {formatDate(interest.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Link
                          href={`/admin/volunteer-interests/${interest.id}`}
                          className="whitespace-nowrap text-sm font-medium text-[#0F1990] hover:underline"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination && (
              <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500" aria-live="polite">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                  {pagination.total} results
                </p>
                {pagination.totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous page"
                      disabled={pagination.page <= 1}
                      onClick={() => setPage((current) => Math.max(1, current - 1))}
                      className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                      type="button"
                      aria-label="Next page"
                      disabled={pagination.page >= pagination.totalPages}
                      onClick={() => setPage((current) => Math.min(pagination.totalPages, current + 1))}
                      className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
