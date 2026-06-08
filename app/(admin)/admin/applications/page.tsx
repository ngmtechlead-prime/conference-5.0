"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { flattenApplication, exportToCSV, exportToExcel } from "@/lib/export";

interface Application {
  id: string;
  competition: string;
  status: string;
  createdAt: string;
  applicantName: string;
  applicantEmail: string;
  data?: unknown;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [competition, setCompetition] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        exportMenuRef.current &&
        !exportMenuRef.current.contains(e.target as Node)
      ) {
        setShowExportMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFiltered = !!(search || competition || status);

  async function handleExport(format: "csv" | "excel") {
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      const params = new URLSearchParams();
      params.set("export", "true");
      if (isFiltered) {
        if (search) params.set("search", search);
        if (competition) params.set("competition", competition);
        if (status) params.set("status", status);
      }
      const res = await fetch(`/api/admin/applications?${params}`);
      const data = await res.json();
      const rows = (data.applications as typeof applications).map(
        flattenApplication,
      );
      const competitionSlug = competition
        ? competition.toLowerCase().replace(/_/g, "-") + "-"
        : "";
      const filename = `${competitionSlug}applications-${isFiltered ? "filtered-" : ""}${new Date().toISOString().slice(0, 10)}`;
      if (format === "csv") {
        exportToCSV(rows, filename);
      } else {
        exportToExcel(rows, filename);
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  }

  useEffect(() => {
    async function fetchApplications() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (competition) params.set("competition", competition);
        if (status) params.set("status", status);
        params.set("page", page.toString());

        const res = await fetch(`/api/admin/applications?${params}`);
        const data = await res.json();
        setApplications(data.applications);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplications();
  }, [search, competition, status, page]);

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    UNDER_REVIEW: "bg-blue-100 text-blue-800",
    ACCEPTED: "bg-green-100 text-green-800",
    DECLINED: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-1">
            Manage and review competition applications
          </p>
        </div>

        <div className="relative" ref={exportMenuRef}>
          <button
            onClick={() => setShowExportMenu((v) => !v)}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-[#0F1990] text-white rounded-lg hover:bg-[#0d1680] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Export
            <ChevronDown className="w-4 h-4" />
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                {isFiltered ? "Export Filtered" : "Export All"}
              </div>
              <button
                onClick={() => handleExport("csv")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Download as CSV
              </button>
              <button
                onClick={() => handleExport("excel")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Download as Excel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F1990] focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={competition}
                onChange={(e) => {
                  setCompetition(e.target.value);
                  setPage(1);
                }}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F1990] focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Competitions</option>
                <option value="DARE_NIGERIA">DARE Nigeria</option>
                <option value="SME_PITCH">SME Pitch</option>
                <option value="CASE_STUDY">Case Study</option>
              </select>
            </div>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F1990] focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="DECLINED">Declined</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1990]" />
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No applications found
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Competition
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {app.applicantName || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {app.applicantEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">
                          {app.competition === "DARE_NIGERIA"
                            ? "DARE Nigeria"
                            : app.competition === "SME_PITCH"
                              ? "SME Pitch"
                              : "Case Study"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[app.status] || "bg-gray-100 text-gray-800"}`}
                        >
                          {app.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/applications/${app.id}`}
                          className="text-[#0F1990] hover:underline text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {(page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(page * pagination.limit, pagination.total)} of{" "}
                  {pagination.total} results
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === pagination.totalPages}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
