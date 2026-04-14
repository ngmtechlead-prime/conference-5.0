"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  FileText,
  Loader2,
} from "lucide-react";

interface Application {
  id: string;
  competition: string;
  status: string;
  data: Record<string, unknown>;
  files: Record<string, { key: string; filename: string; contentType: string }>;
  filesWithUrls: Array<{
    fieldName: string;
    filename: string;
    contentType: string;
    url: string;
  }>;
  adminNotes: string | null;
  createdAt: string;
  decidedAt: string | null;
}

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notes, setNotes] = useState("");
  const [showDecisionModal, setShowDecisionModal] = useState<
    "accept" | "decline" | null
  >(null);

  useEffect(() => {
    async function fetchApplication() {
      try {
        const res = await fetch(`/api/admin/applications/${id}`);
        const data = await res.json();
        setApplication(data);
        setNotes(data.adminNotes || "");
      } catch (error) {
        console.error("Failed to fetch application:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplication();
  }, [id]);

  const handleDecision = async (decision: "accept" | "decline") => {
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/admin/applications/${id}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, notes }),
      });

      if (res.ok) {
        router.push("/admin/applications");
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to process decision");
      }
    } catch (error) {
      console.error("Decision error:", error);
      alert("An error occurred");
    } finally {
      setIsProcessing(false);
      setShowDecisionModal(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1990]" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Application not found</p>
        <Link
          href="/admin/applications"
          className="text-[#0F1990] hover:underline mt-4 inline-block"
        >
          Back to applications
        </Link>
      </div>
    );
  }

  const data = application.data as {
    step1?: { personalInfo?: Record<string, string> };
    step2?: Record<string, unknown>;
    step3?: Record<string, unknown>;
    step4?: Record<string, unknown>;
  };

  const personalInfo = data?.step1?.personalInfo || {};
  const canDecide =
    application.status === "PENDING" || application.status === "UNDER_REVIEW";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/applications"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-gray-600">
              {application.competition === "DARE_NIGERIA"
                ? "DARE Nigeria Challenge"
                : "SME Pitch Competition"}
            </p>
          </div>
        </div>

        {canDecide && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDecisionModal("decline")}
              className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              Decline
            </button>
            <button
              onClick={() => setShowDecisionModal("accept")}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Accept
            </button>
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span
              className={`inline-flex mt-1 px-3 py-1 text-sm font-medium rounded-full ${
                application.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : application.status === "ACCEPTED"
                    ? "bg-green-100 text-green-800"
                    : application.status === "DECLINED"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
              }`}
            >
              {application.status.replace("_", " ")}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Submitted</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(application.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(personalInfo).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm text-gray-500 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {String(value) || "-"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Application Data */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Full Application Data
        </h2>
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          {JSON.stringify(application.data, null, 2)}
        </pre>
      </div>

      {/* Files */}
      {application.filesWithUrls && application.filesWithUrls.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Uploaded Files
          </h2>
          <div className="space-y-3">
            {application.filesWithUrls.map((file) => (
              <a
                key={file.fieldName}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {file.filename}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {file.fieldName.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Admin Notes */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Admin Notes
        </h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about this application..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F1990] focus:border-transparent"
        />
      </div>

      {/* Decision Modal */}
      {showDecisionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {showDecisionModal === "accept"
                ? "Accept Application"
                : "Decline Application"}
            </h3>
            <p className="text-gray-600 mb-4">
              {showDecisionModal === "accept"
                ? "Are you sure you want to accept this application? An acceptance email will be sent to the applicant."
                : "Are you sure you want to decline this application? A decline email will be sent to the applicant."}
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                showDecisionModal === "accept"
                  ? "Optional: Add next steps or additional info..."
                  : "Optional: Add feedback for the applicant..."
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F1990] focus:border-transparent mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDecisionModal(null)}
                disabled={isProcessing}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDecision(showDecisionModal)}
                disabled={isProcessing}
                className={`px-4 py-2 rounded-lg text-white disabled:opacity-50 flex items-center gap-2 ${
                  showDecisionModal === "accept"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                {showDecisionModal === "accept" ? "Accept" : "Decline"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
