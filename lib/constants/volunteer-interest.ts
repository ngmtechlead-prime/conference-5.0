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
  { value: "CREATIVE_GRAPHICS_DESIGN", label: "Creative and Graphics Design" },
  {
    value: "CONTENT_WRITING_COPYWRITING",
    label: "Content Writing and Copywriting",
  },
  {
    value: "CONFERENCE_OPERATIONS_LOGISTICS",
    label: "Conference Operations and Logistics",
  },
  { value: "MARKETING_PROMOTION", label: "Marketing and Promotion" },
  {
    value: "SOCIAL_MEDIA_INFLUENCE_PROMOTION",
    label: "Social Media Influence and Promotion",
  },
  {
    value: "MEDIA_PUBLICITY_PUBLIC_RELATIONS",
    label: "Media, Publicity and Public Relations",
  },
  {
    value: "FUNDRAISING_SPONSORSHIP",
    label: "Fundraising and Sponsorship",
  },
  {
    value: "BUSINESS_DEVELOPMENT_CORPORATE_PARTNERSHIPS",
    label: "Business Development and Corporate Partnerships",
  },
  {
    value: "TICKETING_REGISTRATION",
    label: "Ticketing and Registration",
  },
  {
    value: "PROGRAMME_PLANNING_COORDINATION",
    label: "Programme Planning and Coordination",
  },
  {
    value: "PHOTOGRAPHY_VIDEOGRAPHY",
    label: "Photography and Videography",
  },
  { value: "TECHNICAL_IT_SUPPORT", label: "Technical and IT Support" },
  {
    value: "VOLUNTEER_COORDINATION_MANAGEMENT",
    label: "Volunteer Coordination and Management",
  },
  {
    value: "PROTOCOL_GUEST_RELATIONS",
    label: "Protocol and Guest Relations",
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
  { value: "GRAPHIC_DESIGN", label: "Graphic design" },
  { value: "UI_UX_DESIGN", label: "UI/UX design" },
  {
    value: "CONTENT_WRITING_COPYWRITING",
    label: "Content writing or copywriting",
  },
  { value: "PHOTOGRAPHY", label: "Photography" },
  {
    value: "VIDEO_RECORDING_EDITING",
    label: "Video recording or editing",
  },
  { value: "DIGITAL_MARKETING", label: "Digital marketing" },
  {
    value: "SOCIAL_MEDIA_COMMUNITY_MANAGEMENT",
    label: "Social media or community management",
  },
  {
    value: "MEDIA_PUBLIC_RELATIONS",
    label: "Media relations or public relations",
  },
  {
    value: "EVENT_OPERATIONS_LOGISTICS",
    label: "Event operations or logistics",
  },
  {
    value: "PROJECT_PROGRAMME_MANAGEMENT",
    label: "Project or programme management",
  },
  { value: "FUNDRAISING_SALES", label: "Fundraising or sales" },
  {
    value: "SPONSORSHIP_PARTNERSHIP_MANAGEMENT",
    label: "Sponsorship or partnership management",
  },
  {
    value: "REGISTRATION_CUSTOMER_SERVICE",
    label: "Registration or customer service",
  },
  {
    value: "WEB_DEVELOPMENT_IT_SUPPORT",
    label: "Web development or IT support",
  },
  { value: "DATA_TOOLS_AI_AUTOMATION", label: "Data tools or AI automation" },
  {
    value: "PEOPLE_VOLUNTEER_MANAGEMENT",
    label: "People or volunteer management",
  },
  {
    value: "PROTOCOL_GUEST_RELATIONS",
    label: "Protocol or guest relations",
  },
  {
    value: "PUBLIC_SPEAKING_FACILITATION",
    label: "Public speaking or facilitation",
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
