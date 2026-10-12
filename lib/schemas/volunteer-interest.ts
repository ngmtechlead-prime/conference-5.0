import { z } from "zod";
import { isLgaInState, isNigeriaState } from "@/lib/constants/nigeria-locations";
import {
  VOLUNTEER_APPLICANT_CATEGORY_VALUES,
  VOLUNTEER_AVAILABILITY_WINDOW_VALUES,
  VOLUNTEER_COMPETENCY_VALUES,
  VOLUNTEER_CONTRIBUTION_MODE_VALUES,
  VOLUNTEER_CONTRIBUTION_STAGE_VALUES,
  VOLUNTEER_EVENT_AVAILABILITY_VALUES,
  VOLUNTEER_EXPERIENCE_LEVEL_VALUES,
  VOLUNTEER_ROLE_VALUES,
  VOLUNTEER_WEEKLY_COMMITMENT_VALUES,
} from "@/lib/constants/volunteer-interest";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Must be at least 2 characters")
  .max(80, "Must be 80 characters or fewer")
  .regex(
    /^[\p{L}\s'-]+$/u,
    "Use letters, spaces, apostrophes, or hyphens only",
  );

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, "Email address must be 254 characters or fewer")
  .email("Enter a valid email address");

const phoneSchema = z
  .string()
  .trim()
  .regex(
    /^\+234[789]\d{9}$/,
    "Enter a valid Nigerian phone number in the format +2348138021890",
  );

function uniqueControlledValues<
  Values extends readonly [string, ...string[]],
>(
  values: Values,
  minimum: number,
  maximum: number,
  requiredMessage: string,
) {
  return z
    .array(z.enum(values))
    .min(minimum, requiredMessage)
    .max(maximum, `Select no more than ${maximum}`)
    .refine(
      (items) => new Set(items).size === items.length,
      "Remove duplicate selections",
    );
}

const emptyStringSchema = z
  .string()
  .trim()
  .length(0)
  .transform(() => undefined);

function optionalStringValue<Schema extends z.ZodType<string>>(
  schema: Schema,
) {
  return z.union([emptyStringSchema, schema]).optional();
}

function wordBoundedText(
  label: string,
  minimumWords: number,
  maximumWords: number,
  maximumCharacters: number,
) {
  return z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(
      maximumCharacters,
      `${label} must be ${maximumCharacters} characters or fewer`,
    )
    .superRefine((value, context) => {
      const wordCount = value.split(/\s+/u).filter(Boolean).length;

      if (wordCount < minimumWords) {
        context.addIssue({
          code: "custom",
          message: `${label} must contain at least ${minimumWords} words`,
        });
      } else if (wordCount > maximumWords) {
        context.addIssue({
          code: "custom",
          message: `${label} must contain no more than ${maximumWords} words`,
        });
      }
    });
}

const optionalUrlSchema = optionalStringValue(
  z
    .string()
    .trim()
    .max(2_048, "URL must be 2048 characters or fewer")
    .url("Enter a valid URL")
    .refine(
      (value) => /^https?:\/\//i.test(value),
      "URL must start with http:// or https://",
    ),
);

export const volunteerInterestSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    phoneNumber: phoneSchema,
    state: z
      .string()
      .trim()
      .refine(isNigeriaState, "Select a valid Nigerian state or the FCT"),
    lga: z.string().trim().min(1, "Select your LGA"),
    city: z
      .string()
      .trim()
      .min(2, "City, town, or community must be at least 2 characters")
      .max(100, "City, town, or community must be 100 characters or fewer"),
    address: z
      .string()
      .trim()
      .min(10, "Address must be at least 10 characters")
      .max(250, "Address must be 250 characters or fewer"),
    applicantCategory: z.enum(VOLUNTEER_APPLICANT_CATEGORY_VALUES, {
      message: "Select your applicant category",
    }),
    applicantCategoryOther: z
      .string()
      .trim()
      .min(2, "Specify your applicant category")
      .max(100, "Applicant category must be 100 characters or fewer")
      .optional(),
    affiliationName: z
      .string()
      .trim()
      .min(2, "Affiliation must be at least 2 characters")
      .max(150, "Affiliation must be 150 characters or fewer")
      .optional(),
    courseOrJobTitle: z
      .string()
      .trim()
      .min(2, "Course or job title must be at least 2 characters")
      .max(120, "Course or job title must be 120 characters or fewer")
      .optional(),
    primaryRole: z.enum(VOLUNTEER_ROLE_VALUES, {
      message: "Select your primary role",
    }),
    secondaryRole: z.enum(VOLUNTEER_ROLE_VALUES).optional(),
    otherRoleDescription: z
      .string()
      .trim()
      .min(2, "Describe the other role")
      .max(120, "Other role description must be 120 characters or fewer")
      .optional(),
    competencies: uniqueControlledValues(
      VOLUNTEER_COMPETENCY_VALUES,
      1,
      5,
      "Select at least one competency",
    ),
    otherCompetency: z
      .string()
      .trim()
      .min(2, "Describe your other competency")
      .max(120, "Other competency must be 120 characters or fewer")
      .optional(),
    experienceLevel: optionalStringValue(
      z.enum(VOLUNTEER_EXPERIENCE_LEVEL_VALUES, {
        message: "Select a valid relevant experience level",
      }),
    ),
    relevantExperience: optionalStringValue(
      wordBoundedText("Relevant experience", 40, 180, 2_500),
    ),
    hasVolunteeredBefore: z.boolean().optional(),
    volunteerExperience: optionalStringValue(
      wordBoundedText("Previous volunteering experience", 20, 120, 1_800),
    ),
    motivation: optionalStringValue(
      wordBoundedText("Motivation", 30, 100, 1_500),
    ),
    proposedContribution: optionalStringValue(
      wordBoundedText("Proposed contribution", 30, 120, 1_800),
    ),
    portfolioUrl: optionalUrlSchema,
    additionalProfileUrl: optionalUrlSchema,
    contributionStages: uniqueControlledValues(
      VOLUNTEER_CONTRIBUTION_STAGE_VALUES,
      0,
      VOLUNTEER_CONTRIBUTION_STAGE_VALUES.length,
      "Select a valid contribution stage",
    )
      .optional()
      .default([]),
    contributionMode: optionalStringValue(
      z.enum(VOLUNTEER_CONTRIBUTION_MODE_VALUES, {
        message: "Select a valid preferred contribution mode",
      }),
    ),
    weeklyCommitment: optionalStringValue(
      z.enum(VOLUNTEER_WEEKLY_COMMITMENT_VALUES, {
        message: "Select a valid weekly commitment",
      }),
    ),
    availabilityWindows: uniqueControlledValues(
      VOLUNTEER_AVAILABILITY_WINDOW_VALUES,
      0,
      VOLUNTEER_AVAILABILITY_WINDOW_VALUES.length,
      "Select a valid availability window",
    )
      .optional()
      .default([]),
    eventAvailability: optionalStringValue(
      z.enum(VOLUNTEER_EVENT_AVAILABILITY_VALUES, {
        message: "Select a valid conference-date availability",
      }),
    ),
    commitmentAcknowledged: z.boolean().optional(),
    privacyConsent: z.boolean().optional(),
    idempotencyKey: z.string().uuid("A valid submission key is required"),
  })
  .strict()
  .superRefine((data, context) => {
    if (isNigeriaState(data.state) && !isLgaInState(data.state, data.lga)) {
      context.addIssue({
        code: "custom",
        path: ["lga"],
        message: "Select an LGA that belongs to the selected state",
      });
    }

    if (data.applicantCategory === "OTHER") {
      if (!data.applicantCategoryOther) {
        context.addIssue({
          code: "custom",
          path: ["applicantCategoryOther"],
          message: "Specify your applicant category",
        });
      }
    } else if (data.applicantCategoryOther !== undefined) {
      context.addIssue({
        code: "custom",
        path: ["applicantCategoryOther"],
        message: "Remove the other applicant category value",
      });
    }

    if (data.secondaryRole === data.primaryRole) {
      context.addIssue({
        code: "custom",
        path: ["secondaryRole"],
        message: "Secondary role must differ from the primary role",
      });
    }

    const hasOtherRole =
      data.primaryRole === "OTHER" || data.secondaryRole === "OTHER";
    if (hasOtherRole) {
      if (!data.otherRoleDescription) {
        context.addIssue({
          code: "custom",
          path: ["otherRoleDescription"],
          message: "Describe the other role",
        });
      }
    } else if (data.otherRoleDescription !== undefined) {
      context.addIssue({
        code: "custom",
        path: ["otherRoleDescription"],
        message: "Remove the other role description",
      });
    }

    if (data.competencies.includes("OTHER")) {
      if (!data.otherCompetency) {
        context.addIssue({
          code: "custom",
          path: ["otherCompetency"],
          message: "Describe your other competency",
        });
      }
    } else if (data.otherCompetency !== undefined) {
      context.addIssue({
        code: "custom",
        path: ["otherCompetency"],
        message: "Remove the other competency value",
      });
    }

    if (
      data.hasVolunteeredBefore !== true &&
      data.volunteerExperience !== undefined
    ) {
      context.addIssue({
        code: "custom",
        path: ["volunteerExperience"],
        message: "Remove the previous volunteering experience value",
      });
    }
  });
