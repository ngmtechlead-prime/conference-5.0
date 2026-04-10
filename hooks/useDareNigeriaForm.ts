"use client";

import { useState, useEffect, useCallback } from "react";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/dare-nigeria";
import type {
  DareNigeriaApplicationData,
  ApplicantProfileData,
  InnovationPitchData,
  FundingMediaData,
  CommitmentData,
} from "@/types/dare-nigeria";

const getInitialFormData = (): DareNigeriaApplicationData => ({
  step1: {
    personalInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      nationality: "Nigerian",
      stateOfOrigin: "",
      stateOfResidence: "",
      email: "",
      phoneNumber: "",
      linkedinUrl: "",
      governmentIdName: "",
    },
    education: {
      highestEducation: "",
      occupation: "",
      fieldOfExperience: "",
      previousAcceleratorParticipation: "no",
    },
  },
  step2: {
    innovation: {
      name: "",
      stage: "",
      sector: "",
      sdgAlignment: [],
    },
    pitch: {
      problemStatement: "",
      businessDescription: "",
      solution: "",
      targetBeneficiaries: "",
      impactPotential: "",
      successMetrics: "",
      revenueModel: "",
      scalability: "",
      uniqueness: "",
    },
    team: {
      type: "solo",
      background: "",
      progressSoFar: "",
      biggestChallenge: "",
    },
  },
  step3: {
    funding: {
      receivedExternalFunding: "no",
      estimatedFundingNeed: "",
      fundingUsePlan: "",
      supportTypesNeeded: [],
    },
    documents: {
      innovationSummaryName: "",
      pitchDeckName: "",
      prototypeDemoName: "",
      videoPitchName: "",
      videoPitchUrl: "",
      ticketEvidenceName: "",
    },
  },
  step4: {
    availability: {
      fullAvailability: "",
      willingToRelocate: "",
      openToMentorship: "",
    },
    declaration: {
      howHeardAbout: "",
      whyDare: "",
      agreements: {
        isNigerianCitizen: false,
        accurateInformation: false,
        ideaStage: false,
        originalCreator: false,
        understandsDisqualification: false,
        commitsToParticipate: false,
        consentsToDataUse: false,
        acceptsTerms: false,
      },
      digitalSignature: "",
      signatureDate: "",
    },
  },
  termsAccepted: false,
  currentStep: 1,
  lastUpdated: new Date().toISOString(),
});

export function useDareNigeriaForm() {
  const [formData, setFormData] = useState<DareNigeriaApplicationData>(
    getInitialFormData()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as DareNigeriaApplicationData;
        setFormData(parsed);
        setTermsAccepted(parsed.termsAccepted);
      }
    } catch (error) {
      console.error("Error loading saved form data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveToLocalStorage = useCallback(
    (data: Partial<DareNigeriaApplicationData>) => {
      const updated = {
        ...formData,
        ...data,
        lastUpdated: new Date().toISOString(),
      };
      setFormData(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error("Error saving form data:", error);
      }
    },
    [formData]
  );

  const acceptTerms = useCallback(() => {
    setTermsAccepted(true);
    saveToLocalStorage({ termsAccepted: true });
  }, [saveToLocalStorage]);

  const updateStep1 = useCallback(
    (data: ApplicantProfileData) => {
      saveToLocalStorage({
        step1: data,
        currentStep: 2,
      });
    },
    [saveToLocalStorage]
  );

  const updateStep2 = useCallback(
    (data: InnovationPitchData) => {
      saveToLocalStorage({
        step2: data,
        currentStep: 3,
      });
    },
    [saveToLocalStorage]
  );

  const updateStep3 = useCallback(
    (data: FundingMediaData) => {
      saveToLocalStorage({
        step3: data,
        currentStep: 4,
      });
    },
    [saveToLocalStorage]
  );

  const updateStep4 = useCallback(
    (data: CommitmentData) => {
      saveToLocalStorage({
        step4: data,
      });
    },
    [saveToLocalStorage]
  );

  const setCurrentStep = useCallback(
    (step: number) => {
      saveToLocalStorage({ currentStep: step });
    },
    [saveToLocalStorage]
  );

  const clearFormData = useCallback(() => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setFormData(getInitialFormData());
      setTermsAccepted(false);
    } catch (error) {
      console.error("Error clearing form data:", error);
    }
  }, []);

  return {
    formData,
    isLoading,
    termsAccepted,
    acceptTerms,
    updateStep1,
    updateStep2,
    updateStep3,
    updateStep4,
    setCurrentStep,
    clearFormData,
  };
}
