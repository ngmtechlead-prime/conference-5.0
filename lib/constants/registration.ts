export interface RegistrationOption<Value extends string = string> {
  value: Value;
  label: string;
}

export const TICKET_TYPE_OPTIONS = [
  {
    value: "UNDERGRADUATE",
    label: "Undergraduate",
    description: "For attendees who are currently enrolled in an undergraduate programme.",
  },
  {
    value: "GRADUATE_PROFESSIONAL",
    label: "Graduates / Professionals / Others",
    description: "For graduates, working professionals, entrepreneurs, and other attendees.",
  },
] as const;

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
] as const satisfies readonly RegistrationOption[];

export const MARITAL_STATUS_OPTIONS = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "other", label: "Other" },
] as const satisfies readonly RegistrationOption[];

export const ACTIVITY_OPTIONS = [
  { value: "startup_pitch_competition", label: "Startup Pitch Competition" },
  { value: "panel_discussions", label: "Panel Discussions" },
  { value: "workshops_skill_sessions", label: "Workshops/Skill Sessions" },
  { value: "networking_sessions", label: "Networking Sessions" },
  { value: "one_on_one_mentorship", label: "One-on-One Mentorship" },
] as const satisfies readonly RegistrationOption[];

export const DISCOVERY_SOURCE_OPTIONS = [
  {
    value: "social_media",
    label: "Social Media (Instagram/Twitter/LinkedIn)",
  },
  { value: "referral_friend", label: "Referral/Friend" },
  { value: "email_newsletter", label: "Email Newsletter" },
  {
    value: "school_campus_representative",
    label: "School/Campus Representative",
  },
  { value: "other", label: "Other" },
] as const satisfies readonly RegistrationOption[];

export const INDUSTRY_SECTOR_OPTIONS = [
  { value: "technology", label: "Technology" },
  {
    value: "financial_services_fintech",
    label: "Financial Services / Fintech",
  },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "agriculture", label: "Agriculture" },
  { value: "energy_utilities", label: "Energy / Utilities" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail_ecommerce", label: "Retail / E-commerce" },
  {
    value: "media_creative_industries",
    label: "Media / Creative Industries",
  },
  { value: "professional_services", label: "Professional Services" },
  {
    value: "government_public_sector",
    label: "Government / Public Sector",
  },
  { value: "nonprofit_social_impact", label: "Nonprofit / Social Impact" },
  {
    value: "construction_real_estate",
    label: "Construction / Real Estate",
  },
  {
    value: "transportation_logistics",
    label: "Transportation / Logistics",
  },
  { value: "hospitality_tourism", label: "Hospitality / Tourism" },
  {
    value: "student_not_yet_in_industry",
    label: "Student / Not Yet in Industry",
  },
  { value: "other", label: "Other" },
] as const satisfies readonly RegistrationOption[];

export const PROFESSIONAL_CATEGORY_OPTIONS = [
  { value: "recent_graduate", label: "Recent Graduate" },
  {
    value: "entry_level_professional",
    label: "Entry-Level Professional",
  },
  { value: "mid_level_professional", label: "Mid-Level Professional" },
  {
    value: "senior_professional_executive",
    label: "Senior Professional / Executive",
  },
  {
    value: "entrepreneur_business_owner",
    label: "Entrepreneur / Business Owner",
  },
  {
    value: "freelancer_self_employed",
    label: "Freelancer / Self-Employed",
  },
  { value: "public_servant", label: "Public Servant" },
  { value: "academic_researcher", label: "Academic / Researcher" },
  {
    value: "job_seeker_between_roles",
    label: "Job Seeker / Between Roles",
  },
  { value: "other", label: "Other" },
] as const satisfies readonly RegistrationOption[];

export const REGISTRATION_EVENT = {
  name: "NGM Conference 5.0",
  date: "October 3, 2026",
  location: "Lagos, Nigeria",
  supportEmail: "conference@ngmplatform.com",
} as const;

export const REGISTRATION_PRIVACY_NOTICE_VERSION =
  "conference-registration-2026-v1";
