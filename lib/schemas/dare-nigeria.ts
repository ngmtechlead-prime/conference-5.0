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
    return age >= 18 && age <= 40;
  }, "You must be between 18 and 40 years old"),
  gender: z.string().min(1, "Please select a gender"),
  nationality: z.string().min(1, "Please select a nationality"),
  stateOfOrigin: z.string().min(1, "Please select state of origin"),
  stateOfResidence: z.string().min(1, "Please select state of residence"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  linkedinUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  governmentIdName: z.string().optional(),
  governmentIdKey: z.string().optional(),
});

export const educationSchema = z.object({
  highestEducation: z.string().min(1, "Please select your education level"),
  occupation: z.string().min(1, "Please select your occupation"),
  fieldOfExperience: z
    .string()
    .min(10, "Please describe your field of experience"),
  previousAcceleratorParticipation: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),
});

export const step1Schema = z.object({
  personalInfo: personalInfoSchema,
  education: educationSchema,
});

export const innovationProfileSchema = z.object({
  name: z.string().min(3, "Innovation name must be at least 3 characters"),
  stage: z.string().min(1, "Please select innovation stage"),
  sector: z.string().min(1, "Please select a sector"),
  sdgAlignment: z.array(z.string()).min(1, "Please select at least one SDG"),
});

export const pitchSchema = z.object({
  problemStatement: z
    .string()
    .min(50, "Please provide more detail (min 50 characters)")
    .max(1500, "Maximum 1500 characters"),
  businessDescription: z
    .string()
    .min(50, "Please provide more detail (min 50 characters)")
    .max(1500, "Maximum 1500 characters"),
  solution: z
    .string()
    .min(50, "Please provide more detail (min 50 characters)")
    .max(1500, "Maximum 1500 characters"),
  targetBeneficiaries: z
    .string()
    .min(30, "Please provide more detail (min 30 characters)")
    .max(900, "Maximum 900 characters"),
  impactPotential: z
    .string()
    .min(30, "Please provide more detail (min 30 characters)")
    .max(900, "Maximum 900 characters"),
  successMetrics: z
    .string()
    .min(30, "Please provide more detail (min 30 characters)")
    .max(900, "Maximum 900 characters"),
  revenueModel: z
    .string()
    .min(30, "Please provide more detail (min 30 characters)")
    .max(900, "Maximum 900 characters"),
  scalability: z
    .string()
    .min(30, "Please provide more detail (min 30 characters)")
    .max(900, "Maximum 900 characters"),
  uniqueness: z
    .string()
    .min(30, "Please provide more detail (min 30 characters)")
    .max(600, "Maximum 600 characters"),
});

export const teamSchema = z.object({
  type: z.enum(["solo", "cofounders", "team"], {
    message: "Please select team type",
  }),
  background: z
    .string()
    .min(30, "Please provide more detail (min 30 characters)")
    .max(900, "Maximum 900 characters"),
  progressSoFar: z
    .string()
    .min(30, "Please provide more detail (min 30 characters)")
    .max(900, "Maximum 900 characters"),
  biggestChallenge: z
    .string()
    .min(30, "Please provide more detail (min 30 characters)")
    .max(900, "Maximum 900 characters"),
});

export const step2Schema = z.object({
  innovation: innovationProfileSchema,
  pitch: pitchSchema,
  team: teamSchema,
});

export const fundingSchema = z.object({
  receivedExternalFunding: z.enum(["no", "yes"], {
    message: "Please select an option",
  }),
  estimatedFundingNeed: z
    .string()
    .min(1, "Please select estimated funding need"),
  fundingUsePlan: z
    .string()
    .min(30, "Please provide more detail (min 30 characters)")
    .max(900, "Maximum 900 characters"),
  supportTypesNeeded: z
    .array(z.string())
    .min(1, "Please select at least one support type"),
});

export const documentsSchema = z.object({
  innovationSummaryName: z.string().optional(),
  innovationSummaryKey: z.string().optional(),
  pitchDeckName: z.string().optional(),
  pitchDeckKey: z.string().optional(),
  prototypeDemoName: z.string().optional(),
  prototypeDemoKey: z.string().optional(),
  videoPitchName: z.string().optional(),
  videoPitchKey: z.string().optional(),
  videoPitchUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  ticketEvidenceName: z.string().optional(),
  ticketEvidenceKey: z.string().optional(),
});

export const step3Schema = z.object({
  funding: fundingSchema,
  documents: documentsSchema,
});

export const availabilitySchema = z.object({
  fullAvailability: z.string().min(1, "Please select an option"),
  willingToRelocate: z.string().min(1, "Please select an option"),
  openToMentorship: z.string().min(1, "Please select an option"),
});

export const declarationSchema = z.object({
  howHeardAbout: z.string().min(1, "Please select an option"),
  whyDare: z
    .string()
    .min(30, "Please provide more detail (min 30 characters)")
    .max(600, "Maximum 600 characters"),
  agreements: z.object({
    isNigerianCitizen: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    accurateInformation: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    ideaStage: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    originalCreator: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    understandsDisqualification: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    commitsToParticipate: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    consentsToDataUse: z
      .boolean()
      .refine((val) => val === true, "You must confirm this"),
    acceptsTerms: z
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
