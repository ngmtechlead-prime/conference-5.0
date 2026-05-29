import type {
  Step1FormData as DareStep1FormData,
  Step2FormData as DareStep2FormData,
  Step3FormData as DareStep3FormData,
  Step4FormData as DareStep4FormData,
} from "@/lib/schemas/dare-nigeria";
import type {
  Step1FormData as SMEStep1FormData,
  Step2FormData as SMEStep2FormData,
  Step3FormData as SMEStep3FormData,
  Step4FormData as SMEStep4FormData,
} from "@/lib/schemas/sme-pitch";
import type { CaseStudyFormData } from "@/lib/schemas/case-study";

// This file must be a module, so we include an empty export.
export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type ApplicationData =
      | {
          step1: DareStep1FormData;
          step2: DareStep2FormData;
          step3: DareStep3FormData;
          step4: DareStep4FormData;
        }
      | {
          step1: SMEStep1FormData;
          step2: SMEStep2FormData;
          step3: SMEStep3FormData;
          step4: SMEStep4FormData;
        }
      | CaseStudyFormData;

    type ApplicationFiles = Record<string, never>;
  }
}
