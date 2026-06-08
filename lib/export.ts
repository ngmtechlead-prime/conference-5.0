import * as XLSX from "xlsx";

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

function formatFieldValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "";
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

function labelFor(key: string): string {
  return FIELD_LABELS[key] ?? key.replace(/([A-Z])/g, " $1").trim();
}

type NestedData = Record<string, unknown>;

function collectLeafFields(
  obj: NestedData,
  result: Record<string, string>,
  excludeKeys: string[] = ["agreements"],
) {
  for (const [key, value] of Object.entries(obj)) {
    if (excludeKeys.includes(key)) continue;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      collectLeafFields(value as NestedData, result, excludeKeys);
    } else {
      const label = labelFor(key);
      result[label] = formatFieldValue(value);
    }
  }
}

export type ApplicationExportRow = Record<string, string>;

export function flattenApplication(app: {
  id: string;
  competition: string;
  status: string;
  createdAt: string;
  applicantName?: string;
  applicantEmail?: string;
  data?: unknown;
}): ApplicationExportRow {
  const competitionLabel =
    app.competition === "DARE_NIGERIA"
      ? "DARE Nigeria"
      : app.competition === "SME_PITCH"
        ? "SME Pitch"
        : "Case Study";

  const row: ApplicationExportRow = {
    ID: app.id,
    Competition: competitionLabel,
    Status: app.status.replace(/_/g, " "),
    "Applicant Name": app.applicantName ?? "",
    "Applicant Email": app.applicantEmail ?? "",
    Submitted: new Date(app.createdAt).toLocaleString(),
  };

  if (app.data && typeof app.data === "object") {
    collectLeafFields(app.data as NestedData, row);
  }

  return row;
}

function escapeCsvValue(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportToCSV(rows: ApplicationExportRow[], filename: string) {
  if (rows.length === 0) return;

  const allKeys = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const header = allKeys.map(escapeCsvValue).join(",");
  const body = rows
    .map((row) =>
      allKeys.map((key) => escapeCsvValue(row[key] ?? "")).join(","),
    )
    .join("\n");

  const csv = `${header}\n${body}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  triggerDownload(blob, `${filename}.csv`);
}

export function exportToExcel(rows: ApplicationExportRow[], filename: string) {
  if (rows.length === 0) return;

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Applications");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
