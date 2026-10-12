import * as XLSX from "xlsx";
import {
  NIGERIA_STATE_OPTIONS as SHARED_STATE_OPTIONS,
  getLgaById,
  getLgasForState,
} from "@/lib/constants/nigeria-locations";
import {
  VOLUNTEER_APPLICANT_CATEGORY_OPTIONS as SHARED_APPLICANT_CATEGORY_OPTIONS,
  VOLUNTEER_AVAILABILITY_WINDOW_OPTIONS as SHARED_AVAILABILITY_WINDOW_OPTIONS,
  VOLUNTEER_COMPETENCY_OPTIONS as SHARED_COMPETENCY_OPTIONS,
  VOLUNTEER_CONTRIBUTION_MODE_OPTIONS as SHARED_CONTRIBUTION_MODE_OPTIONS,
  VOLUNTEER_CONTRIBUTION_STAGE_OPTIONS as SHARED_CONTRIBUTION_STAGE_OPTIONS,
  VOLUNTEER_EVENT_AVAILABILITY_OPTIONS as SHARED_EVENT_AVAILABILITY_OPTIONS,
  VOLUNTEER_EXPERIENCE_LEVEL_OPTIONS as SHARED_EXPERIENCE_LEVEL_OPTIONS,
  VOLUNTEER_ROLE_OPTIONS as SHARED_ROLE_OPTIONS,
  VOLUNTEER_WEEKLY_COMMITMENT_OPTIONS as SHARED_WEEKLY_COMMITMENT_OPTIONS,
} from "@/lib/constants/volunteer-interest";

export interface SelectOption {
  value: string;
  label: string;
}

export interface VolunteerInterestExportSource {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  state: string;
  lga: string;
  city: string;
  address: string;
  applicantCategory: string;
  applicantCategoryOther: string | null;
  affiliationName: string | null;
  courseOrJobTitle: string | null;
  primaryRole: string;
  secondaryRole: string | null;
  otherRoleDescription: string | null;
  competencies: string[];
  otherCompetency: string | null;
  experienceLevel: string | null;
  relevantExperience: string | null;
  hasVolunteeredBefore: boolean | null;
  volunteerExperience: string | null;
  motivation: string | null;
  proposedContribution: string | null;
  portfolioUrl: string | null;
  additionalProfileUrl: string | null;
  contributionStages: string[];
  contributionMode: string | null;
  weeklyCommitment: string | null;
  availabilityWindows: string[];
  eventAvailability: string | null;
  commitmentAcknowledgedAt: string | null;
  privacyConsentAt: string | null;
  privacyNoticeVersion: string;
  status: string;
  adminNotes: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export type VolunteerInterestListItem = Pick<
  VolunteerInterestExportSource,
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "state"
  | "lga"
  | "primaryRole"
  | "applicantCategory"
  | "experienceLevel"
  | "eventAvailability"
  | "status"
  | "createdAt"
>;

export type VolunteerInterestExportRow = Record<string, string>;

function copyOptions(
  options: readonly SelectOption[],
): SelectOption[] {
  return options.map(({ value, label }) => ({ value, label }));
}

function humanize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export const VOLUNTEER_ROLE_OPTIONS = copyOptions(SHARED_ROLE_OPTIONS);
export const VOLUNTEER_COMPETENCY_OPTIONS = copyOptions(
  SHARED_COMPETENCY_OPTIONS,
);
export const VOLUNTEER_APPLICANT_CATEGORY_OPTIONS = copyOptions(
  SHARED_APPLICANT_CATEGORY_OPTIONS,
);
export const VOLUNTEER_EXPERIENCE_LEVEL_OPTIONS = copyOptions(
  SHARED_EXPERIENCE_LEVEL_OPTIONS,
);
export const VOLUNTEER_CONTRIBUTION_STAGE_OPTIONS = copyOptions(
  SHARED_CONTRIBUTION_STAGE_OPTIONS,
);
export const VOLUNTEER_CONTRIBUTION_MODE_OPTIONS = copyOptions(
  SHARED_CONTRIBUTION_MODE_OPTIONS,
);
export const VOLUNTEER_WEEKLY_COMMITMENT_OPTIONS = copyOptions(
  SHARED_WEEKLY_COMMITMENT_OPTIONS,
);
export const VOLUNTEER_AVAILABILITY_WINDOW_OPTIONS = copyOptions(
  SHARED_AVAILABILITY_WINDOW_OPTIONS,
);
export const VOLUNTEER_EVENT_AVAILABILITY_OPTIONS = copyOptions(
  SHARED_EVENT_AVAILABILITY_OPTIONS,
);
export const VOLUNTEER_STATUS_OPTIONS: SelectOption[] = [
  { value: "NEW", label: "New" },
  { value: "UNDER_REVIEW", label: "Under review" },
  { value: "SHORTLISTED", label: "Shortlisted" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "SELECTED", label: "Selected" },
  { value: "WAITLISTED", label: "Waitlisted" },
  { value: "NOT_SELECTED", label: "Not selected" },
];
export const NIGERIA_STATE_OPTIONS = copyOptions(SHARED_STATE_OPTIONS);

const optionLabels = new Map(
  [
    VOLUNTEER_ROLE_OPTIONS,
    VOLUNTEER_COMPETENCY_OPTIONS,
    VOLUNTEER_APPLICANT_CATEGORY_OPTIONS,
    VOLUNTEER_EXPERIENCE_LEVEL_OPTIONS,
    VOLUNTEER_CONTRIBUTION_STAGE_OPTIONS,
    VOLUNTEER_CONTRIBUTION_MODE_OPTIONS,
    VOLUNTEER_WEEKLY_COMMITMENT_OPTIONS,
    VOLUNTEER_AVAILABILITY_WINDOW_OPTIONS,
    VOLUNTEER_EVENT_AVAILABILITY_OPTIONS,
    VOLUNTEER_STATUS_OPTIONS,
  ]
    .flat()
    .map((option) => [option.value, option.label]),
);

export function getLgaOptions(state: string): SelectOption[] {
  return getLgasForState(state).map(({ id, name }) => ({
    value: id,
    label: name,
  }));
}

function labelFromOptions(
  options: SelectOption[],
  value: string | null | undefined,
): string {
  if (!value) return "—";
  return options.find((option) => option.value === value)?.label ?? humanize(value);
}

export function getOptionLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return optionLabels.get(value) ?? humanize(value);
}

export function getRoleLabel(value: string | null | undefined): string {
  return labelFromOptions(VOLUNTEER_ROLE_OPTIONS, value);
}

export function getCompetencyLabel(value: string): string {
  return labelFromOptions(VOLUNTEER_COMPETENCY_OPTIONS, value);
}

export function getApplicantCategoryLabel(value: string): string {
  return labelFromOptions(VOLUNTEER_APPLICANT_CATEGORY_OPTIONS, value);
}

export function getExperienceLevelLabel(
  value: string | null | undefined,
): string {
  return labelFromOptions(VOLUNTEER_EXPERIENCE_LEVEL_OPTIONS, value);
}

export function getContributionStageLabel(value: string): string {
  return labelFromOptions(VOLUNTEER_CONTRIBUTION_STAGE_OPTIONS, value);
}

export function getContributionModeLabel(
  value: string | null | undefined,
): string {
  return labelFromOptions(VOLUNTEER_CONTRIBUTION_MODE_OPTIONS, value);
}

export function getWeeklyCommitmentLabel(
  value: string | null | undefined,
): string {
  return labelFromOptions(VOLUNTEER_WEEKLY_COMMITMENT_OPTIONS, value);
}

export function getAvailabilityWindowLabel(value: string): string {
  return labelFromOptions(VOLUNTEER_AVAILABILITY_WINDOW_OPTIONS, value);
}

export function getEventAvailabilityLabel(
  value: string | null | undefined,
): string {
  return labelFromOptions(VOLUNTEER_EVENT_AVAILABILITY_OPTIONS, value);
}

export function getStatusLabel(value: string): string {
  return labelFromOptions(VOLUNTEER_STATUS_OPTIONS, value);
}

export function getStateLabel(state: string): string {
  return (
    NIGERIA_STATE_OPTIONS.find((option) => option.value === state)?.label ??
    humanize(state)
  );
}

export function getLgaLabel(state: string, lga: string): string {
  const location = getLgaById(lga);
  return location?.state === state ? location.name : humanize(lga);
}

function formatDate(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-GB");
}

function formatValues(
  values: string[],
  getLabel: (value: string) => string,
): string {
  return values.map(getLabel).join("; ");
}

export function flattenVolunteerInterest(
  interest: VolunteerInterestExportSource,
): VolunteerInterestExportRow {
  return {
    ID: interest.id,
    "First Name": interest.firstName,
    "Last Name": interest.lastName,
    Email: interest.email,
    "Phone Number": interest.phoneNumber,
    State: getStateLabel(interest.state),
    LGA: getLgaLabel(interest.state, interest.lga),
    City: interest.city,
    Address: interest.address,
    "Applicant Category": getApplicantCategoryLabel(interest.applicantCategory),
    "Applicant Category (Other)": interest.applicantCategoryOther ?? "",
    "School, Organisation, or Place of Work": interest.affiliationName ?? "",
    "Course of Study or Job Title": interest.courseOrJobTitle ?? "",
    "Primary Role": getRoleLabel(interest.primaryRole),
    "Secondary Role": getRoleLabel(interest.secondaryRole),
    "Other Role Description": interest.otherRoleDescription ?? "",
    Competencies: formatValues(interest.competencies, getCompetencyLabel),
    "Other Competency": interest.otherCompetency ?? "",
    "Experience Level": interest.experienceLevel
      ? getExperienceLevelLabel(interest.experienceLevel)
      : "",
    "Relevant Experience": interest.relevantExperience ?? "",
    "Volunteered Before":
      interest.hasVolunteeredBefore === null
        ? ""
        : interest.hasVolunteeredBefore
          ? "Yes"
          : "No",
    "Previous Volunteering Experience": interest.volunteerExperience ?? "",
    Motivation: interest.motivation ?? "",
    "Proposed Contribution": interest.proposedContribution ?? "",
    "Portfolio or Professional Profile": interest.portfolioUrl ?? "",
    "Additional Social or Profile URL": interest.additionalProfileUrl ?? "",
    "Contribution Stages": formatValues(
      interest.contributionStages,
      getContributionStageLabel,
    ),
    "Contribution Mode": interest.contributionMode
      ? getContributionModeLabel(interest.contributionMode)
      : "",
    "Weekly Commitment": interest.weeklyCommitment
      ? getWeeklyCommitmentLabel(interest.weeklyCommitment)
      : "",
    "Availability Windows": formatValues(
      interest.availabilityWindows,
      getAvailabilityWindowLabel,
    ),
    "Event Availability": interest.eventAvailability
      ? getEventAvailabilityLabel(interest.eventAvailability)
      : "",
    "Commitment Acknowledged At": formatDate(
      interest.commitmentAcknowledgedAt,
    ),
    "Privacy Consent At": formatDate(interest.privacyConsentAt),
    "Privacy Notice Version": interest.privacyNoticeVersion,
    Status: getStatusLabel(interest.status),
    "Private Admin Notes": interest.adminNotes ?? "",
    "Reviewed At": formatDate(interest.reviewedAt),
    "Reviewed By": interest.reviewedBy ?? "",
    Submitted: formatDate(interest.createdAt),
    "Last Updated": formatDate(interest.updatedAt),
  };
}

function neutralizeSpreadsheetFormula(value: string): string {
  return /^\s*[=+\-@]/u.test(value) ? `'${value}` : value;
}

function escapeCsvValue(value: string): string {
  const safeValue = neutralizeSpreadsheetFormula(value);
  if (
    safeValue.includes(",") ||
    safeValue.includes('"') ||
    safeValue.includes("\n") ||
    safeValue.includes("\r")
  ) {
    return `"${safeValue.replace(/"/g, '""')}"`;
  }
  return safeValue;
}

export function exportVolunteerInterestsToCSV(
  rows: VolunteerInterestExportRow[],
  filename: string,
) {
  if (rows.length === 0) return;

  const columns = Object.keys(rows[0]);
  const header = columns.map(escapeCsvValue).join(",");
  const body = rows
    .map((row) =>
      columns.map((column) => escapeCsvValue(row[column] ?? "")).join(","),
    )
    .join("\n");
  const blob = new Blob([`\uFEFF${header}\n${body}`], {
    type: "text/csv;charset=utf-8;",
  });

  triggerDownload(blob, `${filename}.csv`);
}

export function exportVolunteerInterestsToExcel(
  rows: VolunteerInterestExportRow[],
  filename: string,
) {
  if (rows.length === 0) return;

  const safeRows = rows.map((row) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key,
        neutralizeSpreadsheetFormula(value),
      ]),
    ),
  );
  const worksheet = XLSX.utils.json_to_sheet(safeRows);
  worksheet["!cols"] = Object.keys(rows[0]).map((column) => ({
    wch: Math.min(Math.max(column.length + 2, 14), 42),
  }));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Volunteer Interests");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
