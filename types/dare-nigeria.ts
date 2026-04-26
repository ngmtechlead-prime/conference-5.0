export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  stateOfOrigin: string;
  stateOfResidence: string;
  email: string;
  phoneNumber: string;
  linkedinUrl?: string;
  governmentId?: File | null;
  governmentIdName?: string;
}

export interface EducationBackground {
  highestEducation: string;
  occupation: string;
  fieldOfExperience: string;
  previousAcceleratorParticipation: "yes" | "no";
}

export interface ApplicantProfileData {
  personalInfo: PersonalInfo;
  education: EducationBackground;
}

export interface InnovationProfile {
  name: string;
  stage: string;
  sector: string;
  sdgAlignment: string[];
}

export interface PitchData {
  problemStatement: string;
  businessDescription: string;
  solution: string;
  targetBeneficiaries: string;
  impactPotential: string;
  successMetrics: string;
  revenueModel: string;
  scalability: string;
  uniqueness: string;
}

export interface TeamData {
  type: "solo" | "cofounders" | "team";
  background: string;
  progressSoFar: string;
  biggestChallenge: string;
}

export interface InnovationPitchData {
  innovation: InnovationProfile;
  pitch: PitchData;
  team: TeamData;
}

export interface FundingData {
  receivedExternalFunding: "no" | "yes";
  estimatedFundingNeed: string;
  fundingUsePlan: string;
  supportTypesNeeded: string[];
}

export interface DocumentUploads {
  innovationSummary?: File | null;
  innovationSummaryName?: string;
  pitchDeck?: File | null;
  pitchDeckName?: string;
  prototypeDemo?: File | null;
  prototypeDemoName?: string;
  videoPitch?: File | null;
  videoPitchName?: string;
  videoPitchUrl?: string;
  ticketEvidence?: File | null;
  ticketEvidenceName?: string;
}

export interface FundingMediaData {
  funding: FundingData;
  documents: DocumentUploads;
}

export interface AvailabilityData {
  fullAvailability: string;
  willingToRelocate: string;
  openToMentorship: string;
}

export interface DeclarationData {
  howHeardAbout: string;
  whyDare: string;
  agreements: {
    isNigerianCitizen: boolean;
    accurateInformation: boolean;
    ideaStage: boolean;
    originalCreator: boolean;
    understandsDisqualification: boolean;
    commitsToParticipate: boolean;
    consentsToDataUse: boolean;
    acceptsTerms: boolean;
  };
  digitalSignature: string;
  signatureDate: string;
}

export interface CommitmentData {
  availability: AvailabilityData;
  declaration: DeclarationData;
}

export interface DareNigeriaApplicationData {
  step1: ApplicantProfileData;
  step2: InnovationPitchData;
  step3: FundingMediaData;
  step4: CommitmentData;
  termsAccepted: boolean;
  currentStep: number;
  lastUpdated: string;
}

export type FormStep = 1 | 2 | 3 | 4;
