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
  User,
  Briefcase,
  Lightbulb,
  DollarSign,
  FileCheck,
  ClipboardCheck,
  ExternalLink,
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

const FIELD_LABELS: Record<string, string> = {
  age: "Age",
  comments: "Comments",
  full: "Full",
  ticket: "Ticket",
  id: "ID",
  hasAnalysedCase: "Has Analysed Case?",
  isCommittingToMeetings: "Is Committing to Meetings?",
  hasRegisteredForConference: "Has Registered for Conference?",
  hasParticipatedInNGMCaseStudy: "Has Participated in NGM Case Study?",
  firstName: "First Name",
  lastName: "Last Name",
  dateOfBirth: "Date of Birth",
  gender: "Gender",
  nationality: "Nationality",
  stateOfOrigin: "State of Origin",
  stateOfResidence: "State of Residence",
  maritalStatus: "Marital Status",
  residentialAddress: "Residential Address",
  email: "Email Address",
  phoneNumber: "Phone Number",
  linkedinUrl: "LinkedIn Profile",
  socialMediaUrl: "Social Media",
  governmentIdUrl: "Government ID",
  highestEducation: "Highest Education",
  occupation: "Occupation",
  fieldOfExperience: "Field of Experience",
  previousAcceleratorParticipation: "Previous Accelerator Participation",
  isRegistered: "Business Registered",
  businessName: "Business Name",
  ownershipStatus: "Ownership Status",
  cacNumber: "CAC Number",
  industrySector: "Industry/Sector",
  stageOfBusiness: "Business Stage",
  yearsOfOperation: "Years of Operation",
  businessState: "Business State",
  businessAddress: "Business Address",
  employeeCount: "Number of Employees",
  websiteSocialMedia: "Website/Social Media",
  name: "Innovation Name",
  stage: "Innovation Stage",
  sector: "Sector",
  sdgAlignment: "SDG Alignment",
  problemStatement: "Problem Statement",
  businessDescription: "Business Description",
  solution: "Solution",
  targetBeneficiaries: "Target Beneficiaries",
  impactPotential: "Impact Potential",
  successMetrics: "Success Metrics",
  revenueModel: "Revenue Model",
  scalability: "Scalability",
  uniqueness: "Uniqueness",
  type: "Team Type",
  background: "Team Background",
  progressSoFar: "Progress So Far",
  biggestChallenge: "Biggest Challenge",
  problemSolving: "Problem Being Solved",
  solutionDescription: "Solution Description",
  competitiveAdvantage: "Competitive Advantage",
  targetCustomers: "Target Customers",
  tractionMilestones: "Traction & Milestones",
  businessGoals: "Business Goals",
  receivedExternalFunding: "Received External Funding",
  fundingDetails: "Funding Details",
  estimatedFundingNeed: "Estimated Funding Need",
  fundingUsePlan: "Funding Use Plan",
  fundingPlan: "Funding Plan",
  supportTypesNeeded: "Support Types Needed",
  openToMentorship: "Open to Mentorship",
  innovationSummaryUrl: "Innovation Summary",
  pitchDeckUrl: "Pitch Deck",
  prototypeDemoUrl: "Prototype/Demo",
  videoPitchUrl: "Video Pitch",
  ticketEvidenceUrl: "Conference Ticket Evidence",
  businessRegistrationUrl: "Business Registration",
  businessProfileUrl: "Business Profile",
  financialStatementsUrl: "Financial Statements",
  businessSummaryUrl: "Business Summary",
  fullAvailability: "Full Availability",
  willingToRelocate: "Willing to Relocate",
  availableForAllStages: "Available for All Stages",
  howHeardAbout: "How They Heard About Us",
  whyDare: "Why DARE Nigeria",
  additionalInfo: "Additional Information",
  digitalSignature: "Digital Signature",
  signatureDate: "Signature Date",
};

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string") {
    if (value === "yes") return "Yes";
    if (value === "no") return "No";
    if (value === "solo") return "Solo Founder";
    if (value === "cofounders") return "Co-founders";
    if (value === "team") return "Team";
    return value;
  }
  return String(value);
}

function isUrl(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return value.startsWith("http://") || value.startsWith("https://");
}

function DataField({ label, value }: { label: string; value: unknown }) {
  const displayLabel =
    FIELD_LABELS[label] || label.replace(/([A-Z])/g, " $1").trim();
  const formattedValue = formatValue(value);
  const valueIsUrl = isUrl(value);

  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <p className="text-sm text-gray-500 mb-1">{displayLabel}</p>
      {valueIsUrl ? (
        <a
          href={String(value)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[#0F1990] hover:underline inline-flex items-center gap-1"
        >
          View Link <ExternalLink className="w-3 h-3" />
        </a>
      ) : (
        <p className="text-sm font-medium text-gray-900 whitespace-pre-wrap">
          {formattedValue}
        </p>
      )}
    </div>
  );
}

function DataSection({
  title,
  icon: Icon,
  data,
  excludeKeys = [],
}: {
  title: string;
  icon: React.ElementType;
  data: Record<string, unknown> | undefined;
  excludeKeys?: string[];
}) {
  if (!data) return null;

  const entries = Object.entries(data).filter(
    ([key, value]) =>
      !excludeKeys.includes(key) &&
      value !== undefined &&
      value !== null &&
      value !== "" &&
      typeof value !== "object",
  );

  if (entries.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {entries.map(([key, value]) => (
          <DataField key={key} label={key} value={value} />
        ))}
      </div>
    </div>
  );
}

function NestedDataSection({
  title,
  icon: Icon,
  data,
}: {
  title: string;
  icon: React.ElementType;
  data: Record<string, unknown> | undefined;
}) {
  if (!data) return null;

  const allEntries: Array<{ key: string; value: unknown }> = [];

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.entries(value as Record<string, unknown>).forEach(
        ([nestedKey, nestedValue]) => {
          if (nestedKey !== "agreements") {
            allEntries.push({ key: nestedKey, value: nestedValue });
          }
        },
      );
    } else {
      allEntries.push({ key, value });
    }
  });

  const filteredEntries = allEntries.filter(
    ({ value }) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      typeof value !== "object",
  );

  if (filteredEntries.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {filteredEntries.map(({ key, value }) => (
          <DataField key={key} label={key} value={value} />
        ))}
      </div>
    </div>
  );
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
    step1?: {
      personalInfo?: Record<string, unknown>;
      education?: Record<string, unknown>;
      businessInfo?: Record<string, unknown>;
    };
    step2?: {
      innovation?: Record<string, unknown>;
      pitch?: Record<string, unknown>;
      team?: Record<string, unknown>;
      businessPitch?: Record<string, unknown>;
      fundingSupport?: Record<string, unknown>;
    };
    step3?: {
      funding?: Record<string, unknown>;
      documents?: Record<string, unknown>;
    };
    step4?: {
      availability?: Record<string, unknown>;
      declaration?: Record<string, unknown>;
    };
  };

  const isDareNigeria = application.competition === "DARE_NIGERIA";
  const isCaseStudy = application.competition === "CASE_STUDY";
  const personalInfo = (data?.step1?.personalInfo as {
    firstName: string;
    lastName: string;
  }) || {
    firstName: "",
    lastName: "",
  };
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
              {personalInfo?.firstName} {personalInfo?.lastName}
            </h1>
            <p className="text-gray-600">
              {application.competition === "DARE_NIGERIA"
                ? "DARE Nigeria Challenge"
                : application.competition === "SME_PITCH"
                  ? "SME Pitch Competition"
                  : "Case Study Competition"}
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

      {/* Step 1: Personal Information */}
      <DataSection
        title="Personal Information"
        icon={User}
        data={data?.step1?.personalInfo as Record<string, unknown>}
      />

      {/* Step 1: Education (DARE Nigeria) */}
      {isDareNigeria && (
        <DataSection
          title="Education & Background"
          icon={User}
          data={data?.step1?.education as Record<string, unknown>}
        />
      )}

      {/* Step 1: Business Info (SME Pitch) */}
      {!isDareNigeria && (
        <DataSection
          title="Business Information"
          icon={Briefcase}
          data={data?.step1?.businessInfo as Record<string, unknown>}
        />
      )}

      {/* Step 2: Innovation Profile (DARE Nigeria) */}
      {isDareNigeria && (
        <DataSection
          title="Innovation Profile"
          icon={Lightbulb}
          data={data?.step2?.innovation as Record<string, unknown>}
        />
      )}

      {/* Step 2: Pitch Details (DARE Nigeria) */}
      {isDareNigeria && (
        <DataSection
          title="Pitch Details"
          icon={Lightbulb}
          data={data?.step2?.pitch as Record<string, unknown>}
        />
      )}

      {/* Step 2: Team Information (DARE Nigeria) */}
      {isDareNigeria && (
        <DataSection
          title="Team Information"
          icon={User}
          data={data?.step2?.team as Record<string, unknown>}
        />
      )}

      {/* Step 2: Business Pitch (SME Pitch) */}
      {!isDareNigeria && (
        <DataSection
          title="Business Pitch"
          icon={Lightbulb}
          data={data?.step2?.businessPitch as Record<string, unknown>}
        />
      )}

      {/* Step 2: Funding & Support (SME Pitch) */}
      {!isDareNigeria && (
        <DataSection
          title="Funding & Support Needs"
          icon={DollarSign}
          data={data?.step2?.fundingSupport as Record<string, unknown>}
        />
      )}

      {/* Step 3: Funding (DARE Nigeria) */}
      {isDareNigeria && (
        <DataSection
          title="Funding Requirements"
          icon={DollarSign}
          data={data?.step3?.funding as Record<string, unknown>}
        />
      )}

      {/* Step 3: Documents */}
      <DataSection
        title="Documents & Media Links"
        icon={FileCheck}
        data={data?.step3?.documents as Record<string, unknown>}
      />

      {/* Step 4: Availability */}
      <DataSection
        title="Availability & Commitment"
        icon={ClipboardCheck}
        data={data?.step4?.availability as Record<string, unknown>}
      />

      {/* Step 4: Declaration */}
      <NestedDataSection
        title="Declaration"
        icon={ClipboardCheck}
        data={data?.step4?.declaration as Record<string, unknown>}
      />

      {/* Case Study Application */}
      {isCaseStudy && (
        <DataSection title="Case Study Details" icon={FileText} data={data} />
      )}

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
