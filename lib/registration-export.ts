import * as XLSX from "xlsx";

export interface RegistrationExportSource {
  id: string;
  publicReference: string;
  ticketType: "UNDERGRADUATE" | "GRADUATE_PROFESSIONAL";
  firstName: string;
  lastName: string;
  email: string;
  normalizedEmail: string;
  phoneNumber: string;
  gender: string;
  maritalStatus: string;
  maritalStatusOther: string | null;
  residentialAddress: string;
  activityOfInterest: string;
  discoverySource: string;
  discoverySourceOther: string | null;
  referral: string | null;
  institutionName: string | null;
  fieldOfStudy: string | null;
  studentStatusConfirmed: boolean | null;
  professionalInformation: string | null;
  industrySector: string | null;
  professionalCategory: string | null;
  privacyConsentAt: string;
  privacyNoticeVersion: string;
  createdAt: string;
  updatedAt: string;
}

export type RegistrationExportRow = Record<string, string>;

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

function formatValue(value: string | boolean | null): string {
  if (value === null || value === "") return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return VALUE_LABELS[value] ?? value.replace(/_/g, " ");
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-GB");
}

export function flattenRegistration(
  registration: RegistrationExportSource,
): RegistrationExportRow {
  return {
    ID: registration.id,
    "Registration Reference": registration.publicReference,
    "Ticket Type": formatValue(registration.ticketType),
    "First Name": registration.firstName,
    "Last Name": registration.lastName,
    Email: registration.email,
    "Normalized Email": registration.normalizedEmail,
    "Phone Number": registration.phoneNumber,
    Gender: formatValue(registration.gender),
    "Marital Status": formatValue(registration.maritalStatus),
    "Marital Status (Other)": registration.maritalStatusOther ?? "",
    "Residential Address": registration.residentialAddress,
    "Activity of Interest": formatValue(registration.activityOfInterest),
    "Discovery Source": formatValue(registration.discoverySource),
    "Discovery Source (Other)": registration.discoverySourceOther ?? "",
    Referral: registration.referral ?? "",
    "Institution Name": registration.institutionName ?? "",
    "Field of Study": registration.fieldOfStudy ?? "",
    "Student Status Confirmed": formatValue(
      registration.studentStatusConfirmed,
    ),
    "Professional Information":
      registration.professionalInformation ?? "",
    "Industry Sector": formatValue(registration.industrySector),
    "Professional Category": formatValue(
      registration.professionalCategory,
    ),
    "Privacy Consent At": formatDate(registration.privacyConsentAt),
    "Privacy Notice Version": registration.privacyNoticeVersion,
    "Registered At": formatDate(registration.createdAt),
    "Last Updated": formatDate(registration.updatedAt),
  };
}

function neutralizeSpreadsheetFormula(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
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

export function exportRegistrationsToCSV(
  rows: RegistrationExportRow[],
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

export function exportRegistrationsToExcel(
  rows: RegistrationExportRow[],
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
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
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
