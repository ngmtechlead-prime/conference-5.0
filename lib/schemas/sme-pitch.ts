import { z } from "zod";

const calculateAge = (dateString: string): number => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().refine((date) => {
    if (!date) return false;
    const age = calculateAge(date);
    return age >= 18 && age <= 65;
  }, "You must be between 18 and 65 years old"),
  gender: z.string().min(1, "Please select a gender"),
  nationality: z.string().min(1, "Please select a nationality"),
  stateOfOrigin: z.string().min(1, "Please select state of origin"),
  maritalStatus: z.string().min(1, "Please select marital status"),
  residentialAddress: z
    .string()
    .min(10, "Please enter your full residential address"),
  stateOfResidence: z.string().min(1, "Please select state of residence"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  socialMediaUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  governmentIdName: z.string().optional(),
  governmentIdKey: z.string().optional(),
});

export const businessInfoSchema = z.object({
  isRegistered: z.enum(["yes", "in_progress", "no"], {
    message: "Please select an option",
  }),
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  ownershipStatus: z.string().min(1, "Please select ownership status"),
  cacNumber: z.string().optional(),
  industrySector: z.string().min(1, "Please select industry/sector"),
  stageOfBusiness: z.string().min(1, "Please select business stage"),
  yearsOfOperation: z.string().min(1, "Please select years of operation"),
  businessState: z.string().min(1, "Please select business location state"),
  businessAddress: z.string().min(10, "Please enter the full business address"),
  employeeCount: z.string().min(1, "Please select employee count"),
  websiteSocialMedia: z.string().optional(),
});

export const step1Schema = z.object({
  personalInfo: personalInfoSchema,
  businessInfo: businessInfoSchema,
});

export const businessPitchSchema = z.object({
  problemSolving: z
    .string()
    .min(50, "Please provide more detail (min 50 characters)")
    .max(500, "Maximum 500 characters (~50 words)"),
  solutionDescription: z
    .string()
    .min(50, "Please provide more detail (min 50 characters)")
    .max(500, "Maximum 500 characters (~50 words)"),
  competitiveAdvantage: z
    .string()
    .min(50, "Please provide more detail (min 50 characters)")
    .max(500, "Maximum 500 characters (~50 words)"),
  targetCustomers: z
    .string()
    .min(50, "Please provide more detail (min 50 characters)")
    .max(500, "Maximum 500 characters (~50 words)"),
  revenueModel: z
    .string()
    .min(50, "Please provide more detail (min 50 characters)")
    .max(500, "Maximum 500 characters (~50 words)"),
  tractionMilestones: z
    .string()
    .min(50, "Please provide more detail (min 50 characters)")
    .max(500, "Maximum 500 characters (~50 words)"),
  businessGoals: z
    .string()
    .min(50, "Please provide more detail (min 50 characters)")
    .max(500, "Maximum 500 characters (~50 words)"),
});

export const fundingSupportSchema = z.object({
  receivedExternalFunding: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),
  fundingDetails: z.string().optional(),
  fundingPlan: z
    .string()
    .min(50, "Please provide more detail (min 50 characters)")
    .max(500, "Maximum 500 characters (~50 words)"),
  supportTypesNeeded: z
    .array(z.string())
    .min(1, "Please select at least one support type"),
  openToMentorship: z.string().min(1, "Please select an option"),
});

export const step2Schema = z.object({
  businessPitch: businessPitchSchema,
  fundingSupport: fundingSupportSchema,
});

export const documentsSchema = z.object({
  businessRegistrationName: z.string().optional(),
  businessRegistrationKey: z.string().optional(),
  businessProfileName: z.string().optional(),
  businessProfileKey: z.string().optional(),
  financialStatementsName: z.string().optional(),
  financialStatementsKey: z.string().optional(),
  businessSummaryName: z.string().optional(),
  businessSummaryKey: z.string().optional(),
  videoPitchUrl: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Video pitch link is required"),
  ticketEvidenceName: z.string().optional(),
  ticketEvidenceKey: z.string().optional(),
  governmentIdName: z.string().optional(),
  governmentIdKey: z.string().optional(),
});

export const step3Schema = z.object({
  documents: documentsSchema,
});

export const availabilitySchema = z.object({
  availableForAllStages: z.string().min(1, "Please select an option"),
  howHeardAbout: z.string().min(1, "Please select an option"),
  additionalInfo: z
    .string()
    .max(600, "Maximum 600 characters (~100 words)")
    .optional(),
});

export const declarationSchema = z.object({
  agreements: z.object({
    accurateInformation: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    authorizedRepresentative: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    understandsDisqualification: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    agreesToParticipate: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    willingToJoinNGM: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    acceptsTerms: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    consentsToDataUse: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
  }),
  digitalSignature: z.string().min(3, "Please enter your full name"),
  signatureDate: z.string().min(1, "Please select the date"),
});

export const step4Schema = z.object({
  availability: availabilitySchema,
  declaration: declarationSchema,
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
