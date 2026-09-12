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
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  exportRegistrationsToCSV,
  exportRegistrationsToExcel,
  flattenRegistration,
  type RegistrationExportSource,
} from "@/lib/registration-export";

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface RegistrationsResponse {
  registrations: RegistrationExportSource[];
  pagination: Pagination;
  error?: string;
}

const TICKET_LABELS: Record<RegistrationExportSource["ticketType"], string> = {
  UNDERGRADUATE: "Undergraduate",
  GRADUATE_PROFESSIONAL: "Graduate / Professional / Other",
};

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<
    RegistrationExportSource[]
  >([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [search, setSearch] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const exportMenuRef = useRef<HTMLDivElement>(null);

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
    const timer = window.setTimeout(async () => {
      setIsLoading(true);
      setError("");

      try {
        const query = new URLSearchParams({ page: String(page) });
        if (search.trim()) query.set("search", search.trim());
        if (ticketType) query.set("ticketType", ticketType);

        const response = await fetch(`/api/admin/registrations?${query}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = (await response.json()) as RegistrationsResponse;

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch registrations");
        }

        setRegistrations(data.registrations);
        setPagination(data.pagination);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return;
        }
        setRegistrations([]);
        setPagination(null);
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to fetch registrations",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [page, reloadKey, search, ticketType]);

  async function handleExport(format: "csv" | "excel") {
    setIsExporting(true);
    setShowExportMenu(false);
    setError("");

    try {
      const query = new URLSearchParams({ export: "true" });
      if (search.trim()) query.set("search", search.trim());
      if (ticketType) query.set("ticketType", ticketType);

      const response = await fetch(`/api/admin/registrations?${query}`, {
        cache: "no-store",
      });
      const data = (await response.json()) as RegistrationsResponse;

      if (!response.ok) {
        throw new Error(data.error || "Failed to export registrations");
      }
      if (data.registrations.length === 0) {
        throw new Error("There are no matching registrations to export");
      }

      const rows = data.registrations.map(flattenRegistration);
      const ticketSlug = ticketType
        ? `${ticketType.toLowerCase().replace(/_/g, "-")}-`
        : "";
      const filtered = search.trim() || ticketType ? "filtered-" : "";
      const filename = `${ticketSlug}registrations-${filtered}${new Date()
        .toISOString()
        .slice(0, 10)}`;

      if (format === "csv") {
        exportRegistrationsToCSV(rows, filename);
      } else {
        exportRegistrationsToExcel(rows, filename);
      }
    } catch (exportError) {
      setError(
        exportError instanceof Error
          ? exportError.message
          : "Failed to export registrations",
      );
    } finally {
      setIsExporting(false);
    }
  }

  const isFiltered = Boolean(search.trim() || ticketType);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Conference Registrations
          </h1>
          <p className="mt-1 text-gray-600">
            Search, review, and export sponsored ticket registrations
          </p>
        </div>

        <div className="relative self-start sm:self-auto" ref={exportMenuRef}>
          <button
            type="button"
            onClick={() => setShowExportMenu((visible) => !visible)}
            disabled={isExporting}
            aria-expanded={showExportMenu}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-lg bg-[#0F1990] px-4 py-2 text-white transition-colors hover:bg-[#0d1680] disabled:cursor-not-allowed disabled:opacity-60"
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
              className="absolute right-0 z-10 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
            >
              <div className="border-b border-gray-100 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {isFiltered ? "Export filtered" : "Export all"}
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

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search registrations</span>
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              maxLength={200}
              placeholder="Search by name, email, phone, reference, or profile…"
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0F1990]"
            />
          </label>

          <label className="relative">
            <span className="sr-only">Filter by ticket type</span>
            <Filter
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <select
              value={ticketType}
              onChange={(event) => {
                setTicketType(event.target.value);
                setPage(1);
              }}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0F1990] md:w-auto"
            >
              <option value="">All ticket types</option>
              <option value="UNDERGRADUATE">Undergraduate</option>
              <option value="GRADUATE_PROFESSIONAL">
                Graduate / Professional / Other
              </option>
            </select>
          </label>
        </div>
      </div>

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
            <Loader2
              className="h-8 w-8 animate-spin text-[#0F1990]"
              aria-hidden="true"
            />
            <span className="sr-only">Loading registrations</span>
          </div>
        ) : registrations.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No registrations found
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Attendee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Ticket type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Registered
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {registrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {registration.firstName} {registration.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {registration.email}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">
                        {registration.publicReference}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#0F1990]">
                          {TICKET_LABELS[registration.ticketType]}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {registration.phoneNumber}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {new Date(registration.createdAt).toLocaleString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/registrations/${registration.id}`}
                          className="whitespace-nowrap text-sm font-medium text-[#0F1990] hover:underline"
                        >
                          View details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination && (
              <div className="flex flex-col gap-3 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total,
                  )}{" "}
                  of {pagination.total} results
                </p>
                {pagination.totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous page"
                      onClick={() => setPage((current) => Math.max(1, current - 1))}
                      disabled={pagination.page <= 1}
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
                      onClick={() =>
                        setPage((current) =>
                          Math.min(pagination.totalPages, current + 1),
                        )
                      }
                      disabled={pagination.page >= pagination.totalPages}
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
