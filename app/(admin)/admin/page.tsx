"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Clock, CheckCircle, XCircle, Users } from "lucide-react";

interface Stats {
  totals: {
    all: number;
    dareNigeria: number;
    smePitch: number;
    caseStudy: number;
  };
  byStatus: {
    pending: number;
    underReview: number;
    accepted: number;
    declined: number;
  };
  recentApplications: Array<{
    id: string;
    competition: string;
    status: string;
    createdAt: string;
    applicantName: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1990]" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-500 py-12">
        Failed to load dashboard data
      </div>
    );
  }

  const statusCards = [
    {
      label: "Total Applications",
      value: stats.totals.all,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Pending Review",
      value: stats.byStatus.pending,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      label: "Accepted",
      value: stats.byStatus.accepted,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      label: "Declined",
      value: stats.byStatus.declined,
      icon: XCircle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of competition applications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Competition Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-[#0F1990]" />
            <h2 className="text-lg font-semibold text-gray-900">
              DARE Nigeria Challenge
            </h2>
          </div>
          <p className="text-3xl font-bold text-[#0F1990]">
            {stats.totals.dareNigeria}
          </p>
          <p className="text-sm text-gray-600 mt-1">applications</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-[#0F1990]" />
            <h2 className="text-lg font-semibold text-gray-900">
              SME Pitch Competition
            </h2>
          </div>
          <p className="text-3xl font-bold text-[#0F1990]">
            {stats.totals.smePitch}
          </p>
          <p className="text-sm text-gray-600 mt-1">applications</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-[#0F1990]" />
            <h2 className="text-lg font-semibold text-gray-900">
              Case Study Competition
            </h2>
          </div>
          <p className="text-3xl font-bold text-[#0F1990]">
            {stats.totals.caseStudy}
          </p>
          <p className="text-sm text-gray-600 mt-1">applications</p>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Applications
          </h2>
          <Link
            href="/admin/applications"
            className="text-sm text-[#0F1990] hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {stats.recentApplications.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No applications yet
            </div>
          ) : (
            stats.recentApplications.map((app) => (
              <Link
                key={app.id}
                href={`/admin/applications/${app.id}`}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {app.applicantName || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {app.competition === "DARE_NIGERIA"
                      ? "DARE Nigeria"
                      : app.competition === "SME_PITCH"
                        ? "SME Pitch"
                        : "Case Study"}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      app.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : app.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : app.status === "DECLINED"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {app.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
