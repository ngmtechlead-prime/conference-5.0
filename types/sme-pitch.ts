export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  stateOfOrigin: string;
  maritalStatus: string;
  residentialAddress: string;
  stateOfResidence: string;
  email: string;
  phoneNumber: string;
  socialMediaUrl?: string;
  governmentIdName?: string;
}

export interface BusinessInfo {
  isRegistered: "yes" | "in_progress" | "no";
  businessName: string;
  ownershipStatus: string;
  cacNumber?: string;
  industrySector: string;
  stageOfBusiness: string;
  yearsOfOperation: string;
  businessState: string;
  businessAddress: string;
  employeeCount: string;
  websiteSocialMedia?: string;
}

export interface FounderBusinessData {
  personalInfo: PersonalInfo;
  businessInfo: BusinessInfo;
}

export interface BusinessPitch {
  problemSolving: string;
  solutionDescription: string;
  competitiveAdvantage: string;
  targetCustomers: string;
  revenueModel: string;
  tractionMilestones: string;
  businessGoals: string;
}

export interface FundingSupport {
  receivedExternalFunding: "yes" | "no";
  fundingDetails?: string;
  fundingPlan: string;
  supportTypesNeeded: string[];
  openToMentorship: string;
}

export interface PitchFundingData {
  businessPitch: BusinessPitch;
  fundingSupport: FundingSupport;
}

export interface DocumentUploads {
  businessRegistrationName?: string;
  businessProfileName?: string;
  financialStatementsName?: string;
  businessSummaryName?: string;
  videoPitchUrl: string;
  ticketEvidenceName?: string;
  governmentIdName?: string;
}

export interface DocumentsMediaData {
  documents: DocumentUploads;
}

export interface AvailabilityInfo {
  availableForAllStages: string;
  howHeardAbout: string;
  additionalInfo?: string;
}

export interface DeclarationInfo {
  agreements: {
    accurateInformation: boolean;
    authorizedRepresentative: boolean;
    understandsDisqualification: boolean;
    agreesToParticipate: boolean;
    willingToJoinNGM: boolean;
    acceptsTerms: boolean;
    consentsToDataUse: boolean;
  };
  digitalSignature: string;
  signatureDate: string;
}

export interface DeclarationData {
  availability: AvailabilityInfo;
  declaration: DeclarationInfo;
}

export interface SMEPitchApplicationData {
  step1: FounderBusinessData;
  step2: PitchFundingData;
  step3: DocumentsMediaData;
  step4: DeclarationData;
  currentStep: number;
  lastUpdated: string;
}

export type FormStep = 1 | 2 | 3 | 4;
