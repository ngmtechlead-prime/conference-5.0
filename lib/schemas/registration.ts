import { z } from "zod";
import {
  ACTIVITY_OPTIONS,
  DISCOVERY_SOURCE_OPTIONS,
  GENDER_OPTIONS,
  INDUSTRY_SECTOR_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  PROFESSIONAL_CATEGORY_OPTIONS,
} from "@/lib/constants/registration";

function optionValues<
  const Options extends readonly { value: string; label: string }[],
>(options: Options) {
  return options.map((option) => option.value) as [
    Options[number]["value"],
    ...Options[number]["value"][],
  ];
}

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
  .transform((value) => value.replace(/[\s().-]/g, ""))
  .pipe(
    z
      .string()
      .regex(
        /^\+[1-9]\d{7,14}$/,
        "Enter an international phone number with country code, for example +2348012345678",
      ),
  );

const genderSchema = z.enum(optionValues(GENDER_OPTIONS), {
  message: "Select your gender",
});

const maritalStatusSchema = z.enum(optionValues(MARITAL_STATUS_OPTIONS), {
  message: "Select your marital status",
});

const activitySchema = z.enum(optionValues(ACTIVITY_OPTIONS), {
  message: "Select the activity that interests you most",
});

const discoverySourceSchema = z.enum(optionValues(DISCOVERY_SOURCE_OPTIONS), {
  message: "Select how you heard about NGM Conference",
});

const industrySectorSchema = z.enum(optionValues(INDUSTRY_SECTOR_OPTIONS), {
  message: "Select your industry sector",
});

const professionalCategorySchema = z.enum(
  optionValues(PROFESSIONAL_CATEGORY_OPTIONS),
  { message: "Select your professional category" },
);

const undergraduateSchema = z
  .object({
    institutionName: z
      .string()
      .trim()
      .min(2, "Select your university or polytechnic")
      .max(150, "Institution name must be 150 characters or fewer"),
    fieldOfStudy: z
      .string()
      .trim()
      .min(2, "Enter your field of study or major")
      .max(120, "Field of study must be 120 characters or fewer"),
    studentStatusConfirmed: z
      .boolean()
      .refine((value) => value, "Confirm your current student status"),
  })
  .strict();

const professionalSchema = z
  .object({
    professionalInformation: z
      .string()
      .trim()
      .min(2, "Enter your current role, organization, or current status")
      .max(200, "Professional information must be 200 characters or fewer"),
    industrySector: industrySectorSchema,
    professionalCategory: professionalCategorySchema,
  })
  .strict();

const commonShape = {
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  confirmEmail: emailSchema,
  phoneNumber: phoneSchema,
  gender: genderSchema,
  maritalStatus: maritalStatusSchema,
  maritalStatusOther: z
    .string()
    .trim()
    .min(1, "Enter your marital status")
    .max(60, "Marital status must be 60 characters or fewer")
    .optional(),
  residentialAddress: z
    .string()
    .trim()
    .min(10, "Residential address must be at least 10 characters")
    .max(300, "Residential address must be 300 characters or fewer"),
  activityOfInterest: activitySchema,
  discoverySource: discoverySourceSchema,
  discoverySourceOther: z
    .string()
    .trim()
    .min(1, "Tell us how you heard about NGM Conference")
    .max(100, "Discovery source must be 100 characters or fewer")
    .optional(),
  referral: z
    .string()
    .trim()
    .max(100, "Referral code or name must be 100 characters or fewer")
    .optional(),
  privacyConsent: z
    .boolean()
    .refine((value) => value, "Consent is required to register"),
  idempotencyKey: z.string().uuid(),
};

export const conferenceRegistrationSchema = z
  .discriminatedUnion("ticketType", [
    z
      .object({
        ...commonShape,
        ticketType: z.literal("UNDERGRADUATE"),
        undergraduate: undergraduateSchema,
      })
      .strict(),
    z
      .object({
        ...commonShape,
        ticketType: z.literal("GRADUATE_PROFESSIONAL"),
        professional: professionalSchema,
      })
      .strict(),
  ])
  .superRefine((data, context) => {
    if (data.email !== data.confirmEmail) {
      context.addIssue({
        code: "custom",
        path: ["confirmEmail"],
        message: "Email addresses must match",
      });
    }

    if (data.maritalStatus === "other") {
      if (!data.maritalStatusOther) {
        context.addIssue({
          code: "custom",
          path: ["maritalStatusOther"],
          message: "Enter your marital status",
        });
      }
    } else if (data.maritalStatusOther !== undefined) {
      context.addIssue({
        code: "custom",
        path: ["maritalStatusOther"],
        message: "Remove the other marital status value",
      });
    }

    if (data.discoverySource === "other") {
      if (!data.discoverySourceOther) {
        context.addIssue({
          code: "custom",
          path: ["discoverySourceOther"],
          message: "Tell us how you heard about NGM Conference",
        });
      }
    } else if (data.discoverySourceOther !== undefined) {
      context.addIssue({
        code: "custom",
        path: ["discoverySourceOther"],
        message: "Remove the other discovery source value",
      });
    }
  });
