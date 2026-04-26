export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi",
  "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export const EDUCATION_LEVELS = [
  { value: "secondary", label: "Secondary School" },
  { value: "diploma", label: "Diploma / OND / NCE" },
  { value: "bachelors", label: "Bachelor's Degree / HND" },
  { value: "masters", label: "Master's Degree" },
  { value: "doctorate", label: "Doctorate / PhD" },
  { value: "professional", label: "Professional Certification" },
];

export const OCCUPATION_OPTIONS = [
  { value: "employed", label: "Employed Full-time" },
  { value: "employed_part", label: "Employed Part-time" },
  { value: "self_employed", label: "Self-employed / Entrepreneur" },
  { value: "unemployed", label: "Unemployed" },
  { value: "student", label: "Student" },
  { value: "freelancer", label: "Freelancer / Consultant" },
];

export const INNOVATION_STAGES = [
  { value: "idea", label: "Idea Stage" },
  { value: "prototype", label: "Prototype / MVP" },
  { value: "early_traction", label: "Early Traction" },
  { value: "pilot", label: "Pilot Phase" },
];

export const SECTOR_OPTIONS = [
  { value: "agriculture", label: "Agriculture & AgriTech" },
  { value: "education", label: "Education & EdTech" },
  { value: "health", label: "Healthcare & HealthTech" },
  { value: "fintech", label: "Financial Services & FinTech" },
  { value: "energy", label: "Energy & CleanTech" },
  { value: "environment", label: "Environment & Sustainability" },
  { value: "logistics", label: "Logistics & Transportation" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "media", label: "Media & Entertainment" },
  { value: "technology", label: "Technology & Software" },
  { value: "other", label: "Other" },
];

export const SDG_OPTIONS = [
  { value: "sdg1", label: "SDG 1 - No Poverty" },
  { value: "sdg2", label: "SDG 2 - Zero Hunger" },
  { value: "sdg3", label: "SDG 3 - Good Health" },
  { value: "sdg4", label: "SDG 4 - Quality Education" },
  { value: "sdg5", label: "SDG 5 - Gender Equality" },
  { value: "sdg6", label: "SDG 6 - Clean Water" },
  { value: "sdg7", label: "SDG 7 - Clean Energy" },
  { value: "sdg8", label: "SDG 8 - Economic Growth" },
  { value: "sdg9", label: "SDG 9 - Industry & Innovation" },
  { value: "sdg10", label: "SDG 10 - Reduced Inequalities" },
  { value: "sdg11", label: "SDG 11 - Sustainable Cities" },
  { value: "sdg13", label: "SDG 13 - Climate Action" },
];

export const FUNDING_RANGES = [
  { value: "0-500k", label: "₦0 - ₦500,000" },
  { value: "500k-1m", label: "₦500,000 - ₦1,000,000" },
  { value: "1m-5m", label: "₦1,000,000 - ₦5,000,000" },
  { value: "5m-10m", label: "₦5,000,000 - ₦10,000,000" },
  { value: "10m-plus", label: "₦10,000,000+" },
];

export const SUPPORT_TYPES = [
  { value: "mentorship", label: "Business Mentorship & Coaching" },
  { value: "investor", label: "Investor & Funder Introductions" },
  { value: "technical", label: "Technical / Product Development Support" },
  { value: "market", label: "Market Access & Partnerships" },
  { value: "legal", label: "Legal & Compliance Advisory" },
  { value: "media", label: "Media & Public Exposure" },
  { value: "network", label: "Peer Network & Community" },
  { value: "training", label: "Training / Capacity Building" },
];

export const AVAILABILITY_OPTIONS = [
  { value: "full", label: "Yes - I commit to full participation across all phases" },
  { value: "mostly", label: "Mostly - I have minor scheduling constraints" },
];

export const RELOCATION_OPTIONS = [
  { value: "yes", label: "Yes, absolutely" },
  { value: "yes_support", label: "Yes, but I may need logistical support" },
  { value: "lagos", label: "I am based in Lagos already" },
  { value: "unsure", label: "I am unsure - please advise" },
];

export const MENTORSHIP_OPTIONS = [
  { value: "welcome", label: "Yes - I actively welcome mentorship" },
  { value: "selectively", label: "Yes - selectively, depending on the focus" },
  { value: "independent", label: "I prefer to work independently" },
];

export const HEARD_ABOUT_OPTIONS = [
  { value: "social_media", label: "Social Media" },
  { value: "ngm_website", label: "NGM Website" },
  { value: "friend", label: "Friend / Colleague" },
  { value: "email", label: "Email Newsletter" },
  { value: "event", label: "Event / Conference" },
  { value: "news", label: "News / Media" },
  { value: "other", label: "Other" },
];

export const FORM_STEPS = [
  { number: 1, title: "Applicant Profile" },
  { number: 2, title: "Innovation & Pitch" },
  { number: 3, title: "Funding & Media" },
  { number: 4, title: "Commitment" },
];

export const LOCAL_STORAGE_KEY = "dare_nigeria_application";
