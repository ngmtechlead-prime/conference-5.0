export interface VolunteerInterestOption<Value extends string = string> {
  value: Value;
  label: string;
}

function optionValues<
  const Options extends readonly VolunteerInterestOption[],
>(options: Options) {
  return options.map((option) => option.value) as [
    Options[number]["value"],
    ...Options[number]["value"][],
  ];
}

export const VOLUNTEER_ROLE_OPTIONS = [
  {
    value: "TICKET_SALES_REGISTRATION",
    label: "Ticket Sales and Registration",
  },
  {
    value: "PARTNERSHIP_SPONSORSHIP",
    label: "Partnership and Sponsorship",
  },
  {
    value: "MARKETING_COMMUNICATIONS_PUBLICITY",
    label: "Marketing, Communications and Publicity",
  },
  {
    value: "EVENT_HALL_SELECTION_MANAGEMENT",
    label: "Event Hall Selection and Management",
  },
  {
    value: "HOSPITALITY",
    label: "Hospitality: Breakfast, Lunch and Post-event",
  },
  { value: "EVENT_MEDICAL_TEAM", label: "Event Medical Team" },
  { value: "OPERATIONS_TEAM", label: "Operations Team" },
  { value: "TECHNICAL_IT_SUPPORT", label: "Technical and IT Support" },
  { value: "PROGRAMS_TEAM", label: "Programs Team" },
  { value: "PRE_EVENT_TEAM", label: "Pre-event Team" },
  { value: "COMPETITION_TEAM", label: "Competition Team" },
  {
    value: "PROTOCOL_LOGISTICS_SECURITY",
    label: "Protocol, Logistics and Security",
  },
  { value: "VIP_MANAGEMENT", label: "VIP Management" },
  { value: "CREATIVE_GRAPHICS_TEAM", label: "Creative Graphics Team" },
  {
    value: "SALES_ADVERTISEMENT_MERCHANDISE",
    label: "Sales, Advertisement and Merchandise",
  },
  { value: "OTHER", label: "Other — please specify" },
] as const satisfies readonly VolunteerInterestOption[];

export const VOLUNTEER_ROLE_VALUES = optionValues(VOLUNTEER_ROLE_OPTIONS);
export type VolunteerRoleValue = (typeof VOLUNTEER_ROLE_VALUES)[number];

export const VOLUNTEER_APPLICANT_CATEGORY_OPTIONS = [
  {
    value: "SECONDARY_SCHOOL_STUDENT",
    label: "Secondary school student",
  },
  { value: "UNDERGRADUATE_STUDENT", label: "Undergraduate student" },
  { value: "GRADUATE_STUDENT", label: "Graduate student" },
  {
    value: "EARLY_CAREER_PROFESSIONAL",
    label: "Early-career professional (0–5 years)",
  },
  {
    value: "EXPERIENCED_PROFESSIONAL",
    label: "Experienced professional (5+ years)",
  },
  { value: "OTHER", label: "Other" },
] as const satisfies readonly VolunteerInterestOption[];

export const VOLUNTEER_APPLICANT_CATEGORY_VALUES = optionValues(
  VOLUNTEER_APPLICANT_CATEGORY_OPTIONS,
);

export const VOLUNTEER_COMPETENCY_OPTIONS = [
  {
    value: "TICKET_SALES_REGISTRATION",
    label: "Ticket sales or registration",
  },
  {
    value: "PARTNERSHIP_SPONSORSHIP_MANAGEMENT",
    label: "Partnership or sponsorship management",
  },
  {
    value: "MARKETING_COMMUNICATIONS_PUBLICITY",
    label: "Marketing, communications or publicity",
  },
  {
    value: "EVENT_HALL_SELECTION_MANAGEMENT",
    label: "Event hall selection or management",
  },
  {
    value: "HOSPITALITY_CATERING_SUPPORT",
    label: "Hospitality or catering support",
  },
  { value: "EVENT_MEDICAL_SUPPORT", label: "Event medical support" },
  { value: "EVENT_OPERATIONS", label: "Event operations" },
  { value: "TECHNICAL_IT_SUPPORT", label: "Technical or IT support" },
  {
    value: "PROGRAM_PLANNING_COORDINATION",
    label: "Program planning or coordination",
  },
  {
    value: "PRE_EVENT_PLANNING_COORDINATION",
    label: "Pre-event planning or coordination",
  },
  { value: "COMPETITION_COORDINATION", label: "Competition coordination" },
  {
    value: "PROTOCOL_LOGISTICS_SECURITY",
    label: "Protocol, logistics or security",
  },
  {
    value: "VIP_MANAGEMENT_GUEST_RELATIONS",
    label: "VIP management or guest relations",
  },
  {
    value: "CREATIVE_GRAPHIC_DESIGN",
    label: "Creative or graphic design",
  },
  {
    value: "SALES_ADVERTISEMENT_MERCHANDISE",
    label: "Sales, advertisement or merchandise",
  },
  { value: "OTHER", label: "Other" },
] as const satisfies readonly VolunteerInterestOption[];

export const VOLUNTEER_COMPETENCY_VALUES = optionValues(
  VOLUNTEER_COMPETENCY_OPTIONS,
);

export const VOLUNTEER_EXPERIENCE_LEVEL_OPTIONS = [
  { value: "NO_FORMAL_EXPERIENCE", label: "No formal experience yet" },
  { value: "LESS_THAN_ONE_YEAR", label: "Less than 1 year" },
  { value: "ONE_TO_TWO_YEARS", label: "1–2 years" },
  { value: "THREE_TO_FIVE_YEARS", label: "3–5 years" },
  { value: "SIX_PLUS_YEARS", label: "6+ years" },
] as const satisfies readonly VolunteerInterestOption[];

export const VOLUNTEER_EXPERIENCE_LEVEL_VALUES = optionValues(
  VOLUNTEER_EXPERIENCE_LEVEL_OPTIONS,
);

export const VOLUNTEER_CONTRIBUTION_STAGE_OPTIONS = [
  { value: "PRE_CONFERENCE_PLANNING", label: "Pre-conference planning" },
  {
    value: "CONFERENCE_WEEK_EVENT_DAY",
    label: "Conference week / event day",
  },
  {
    value: "POST_CONFERENCE_FOLLOW_UP",
    label: "Post-conference follow-up",
  },
] as const satisfies readonly VolunteerInterestOption[];

export const VOLUNTEER_CONTRIBUTION_STAGE_VALUES = optionValues(
  VOLUNTEER_CONTRIBUTION_STAGE_OPTIONS,
);

export const VOLUNTEER_CONTRIBUTION_MODE_OPTIONS = [
  { value: "ON_SITE", label: "On-site" },
  { value: "REMOTE", label: "Remote" },
  { value: "HYBRID_FLEXIBLE", label: "Hybrid / flexible" },
] as const satisfies readonly VolunteerInterestOption[];

export const VOLUNTEER_CONTRIBUTION_MODE_VALUES = optionValues(
  VOLUNTEER_CONTRIBUTION_MODE_OPTIONS,
);

export const VOLUNTEER_WEEKLY_COMMITMENT_OPTIONS = [
  { value: "UNDER_THREE_HOURS", label: "Under 3 hours" },
  { value: "THREE_TO_FIVE_HOURS", label: "3–5 hours" },
  { value: "SIX_TO_TEN_HOURS", label: "6–10 hours" },
  { value: "MORE_THAN_TEN_HOURS", label: "More than 10 hours" },
] as const satisfies readonly VolunteerInterestOption[];

export const VOLUNTEER_WEEKLY_COMMITMENT_VALUES = optionValues(
  VOLUNTEER_WEEKLY_COMMITMENT_OPTIONS,
);

export const VOLUNTEER_AVAILABILITY_WINDOW_OPTIONS = [
  { value: "WEEKDAY_DAYTIME", label: "Weekday daytime" },
  { value: "WEEKDAY_EVENINGS", label: "Weekday evenings" },
  { value: "SATURDAYS", label: "Saturdays" },
  { value: "SUNDAYS", label: "Sundays" },
  { value: "VARIES_CAN_DISCUSS", label: "Varies / can be discussed" },
] as const satisfies readonly VolunteerInterestOption[];

export const VOLUNTEER_AVAILABILITY_WINDOW_VALUES = optionValues(
  VOLUNTEER_AVAILABILITY_WINDOW_OPTIONS,
);

export const VOLUNTEER_EVENT_AVAILABILITY_OPTIONS = [
  { value: "AVAILABLE", label: "Yes" },
  { value: "NEEDS_CONFIRMATION", label: "Maybe / needs confirmation" },
  { value: "NOT_AVAILABLE", label: "No" },
] as const satisfies readonly VolunteerInterestOption[];

export const VOLUNTEER_EVENT_AVAILABILITY_VALUES = optionValues(
  VOLUNTEER_EVENT_AVAILABILITY_OPTIONS,
);

export const VOLUNTEER_INTEREST_PRIVACY_NOTICE_VERSION =
  "volunteer-interest-2026-v1";

export const VOLUNTEER_INTEREST_EVENT = {
  name: "NGM Conference 6.0",
  supportEmail: "conference@ngmplatform.com",
} as const;

export function getVolunteerRoleLabel(role: VolunteerRoleValue): string {
  return (
    VOLUNTEER_ROLE_OPTIONS.find((option) => option.value === role)?.label ?? role
  );
}
