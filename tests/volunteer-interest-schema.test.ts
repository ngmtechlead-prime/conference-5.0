import assert from "node:assert/strict";
import test from "node:test";
import {
  getLgasForState,
  NIGERIA_LGA_COUNT,
  NIGERIA_STATE_COUNT,
  NIGERIA_STATE_NAMES,
} from "@/lib/constants/nigeria-locations";
import {
  VOLUNTEER_COMPETENCY_OPTIONS,
  VOLUNTEER_ROLE_OPTIONS,
  VOLUNTEER_ROLE_VALUES,
} from "@/lib/constants/volunteer-interest";
import { volunteerInterestSchema } from "@/lib/schemas/volunteer-interest";

const words = (word: string, count: number) =>
  Array.from({ length: count }, () => word).join(" ");

function validMinimalInterest() {
  return {
    firstName: "Amina",
    lastName: "Yusuf",
    email: "AMINA@example.com",
    phoneNumber: "+2348138021890",
    state: "Abia",
    lga: "abia-aba-north",
    city: "Aba",
    address: "12 Example Street, Aba",
    applicantCategory: "UNDERGRADUATE_STUDENT" as const,
    affiliationName: "Example University",
    courseOrJobTitle: "Computer Science",
    primaryRole: "TECHNICAL_IT_SUPPORT" as const,
    secondaryRole: "TICKET_SALES_REGISTRATION" as const,
    competencies: ["TECHNICAL_IT_SUPPORT"] as const,
    idempotencyKey: "550e8400-e29b-41d4-a716-446655440000",
  };
}

function validInterest() {
  return {
    firstName: "Amina",
    lastName: "Yusuf",
    email: "AMINA@example.com",
    phoneNumber: "+2348138021890",
    state: "Abia",
    lga: "abia-aba-north",
    city: "Aba",
    address: "12 Example Street, Aba",
    applicantCategory: "UNDERGRADUATE_STUDENT" as const,
    affiliationName: "Example University",
    courseOrJobTitle: "Computer Science",
    primaryRole: "TECHNICAL_IT_SUPPORT" as const,
    secondaryRole: "TICKET_SALES_REGISTRATION" as const,
    competencies: ["TECHNICAL_IT_SUPPORT"] as const,
    experienceLevel: "ONE_TO_TWO_YEARS" as const,
    relevantExperience: words("experience", 40),
    hasVolunteeredBefore: false,
    motivation: words("motivation", 30),
    proposedContribution: words("contribution", 30),
    portfolioUrl: "https://example.com/amina",
    contributionStages: ["PRE_CONFERENCE_PLANNING"] as const,
    contributionMode: "HYBRID_FLEXIBLE" as const,
    weeklyCommitment: "THREE_TO_FIVE_HOURS" as const,
    availabilityWindows: ["WEEKDAY_EVENINGS"] as const,
    eventAvailability: "AVAILABLE" as const,
    commitmentAcknowledged: true,
    privacyConsent: true,
    idempotencyKey: "550e8400-e29b-41d4-a716-446655440000",
  };
}

test("schema accepts all 37 states/FCT and all 774 LGAs under their parent", () => {
  assert.equal(NIGERIA_STATE_COUNT, 37);
  assert.equal(NIGERIA_LGA_COUNT, 774);
  assert.ok(NIGERIA_STATE_NAMES.includes("Federal Capital Territory"));

  let acceptedLgas = 0;
  for (const state of NIGERIA_STATE_NAMES) {
    for (const lga of getLgasForState(state)) {
      const result = volunteerInterestSchema.safeParse({
        ...validInterest(),
        state,
        lga: lga.id,
      });
      assert.equal(result.success, true, `${state}: ${lga.id}`);
      acceptedLgas += 1;
    }
  }

  assert.equal(acceptedLgas, 774);
});

test("minimal input may omit experience, availability, and consent sections", () => {
  const result = volunteerInterestSchema.parse(validMinimalInterest());

  assert.equal(result.experienceLevel, undefined);
  assert.equal(result.relevantExperience, undefined);
  assert.equal(result.hasVolunteeredBefore, undefined);
  assert.equal(result.volunteerExperience, undefined);
  assert.equal(result.motivation, undefined);
  assert.equal(result.proposedContribution, undefined);
  assert.equal(result.portfolioUrl, undefined);
  assert.equal(result.additionalProfileUrl, undefined);
  assert.deepEqual(result.contributionStages, []);
  assert.equal(result.contributionMode, undefined);
  assert.equal(result.weeklyCommitment, undefined);
  assert.deepEqual(result.availabilityWindows, []);
  assert.equal(result.eventAvailability, undefined);
  assert.equal(result.commitmentAcknowledged, undefined);
  assert.equal(result.privacyConsent, undefined);
});

test("browser empty strings and false optional checkboxes are accepted", () => {
  const result = volunteerInterestSchema.parse({
    ...validMinimalInterest(),
    experienceLevel: "",
    relevantExperience: "",
    volunteerExperience: "",
    motivation: "",
    proposedContribution: "",
    portfolioUrl: "",
    additionalProfileUrl: "",
    contributionMode: "",
    weeklyCommitment: "",
    eventAvailability: "",
    commitmentAcknowledged: false,
    privacyConsent: false,
  });

  assert.equal(result.experienceLevel, undefined);
  assert.equal(result.relevantExperience, undefined);
  assert.equal(result.portfolioUrl, undefined);
  assert.equal(result.contributionMode, undefined);
  assert.equal(result.commitmentAcknowledged, false);
  assert.equal(result.privacyConsent, false);
});

test("valid input is normalized", () => {
  const result = volunteerInterestSchema.parse(validInterest());
  assert.equal(result.email, "amina@example.com");
  assert.equal(result.phoneNumber, "+2348138021890");
});

test("phone number must use the Nigerian +234 mobile format", () => {
  const validResult = volunteerInterestSchema.safeParse({
    ...validMinimalInterest(),
    phoneNumber: "+2348138021890",
  });
  assert.equal(validResult.success, true);

  const invalidPhoneNumbers = [
    "08138021890",
    "+234 813 802 1890",
    "+2338138021890",
    "+2346138021890",
    "+234813802189",
    "+23481380218900",
  ];

  for (const phoneNumber of invalidPhoneNumbers) {
    const result = volunteerInterestSchema.safeParse({
      ...validMinimalInterest(),
      phoneNumber,
    });

    assert.equal(result.success, false, phoneNumber);
    assert.ok(
      result.error?.issues.some((issue) => issue.path[0] === "phoneNumber"),
      phoneNumber,
    );
  }
});

test("role options match the approved volunteer teams", () => {
  assert.deepEqual(
    VOLUNTEER_ROLE_OPTIONS.map(({ label }) => label),
    [
      "Ticket Sales and Registration",
      "Partnership and Sponsorship",
      "Marketing, Communications and Publicity",
      "Event Hall Selection and Management",
      "Hospitality: Breakfast, Lunch and Post-event",
      "Event Medical Team",
      "Operations Team",
      "Technical and IT Support",
      "Programs Team",
      "Pre-event Team",
      "Competition Team",
      "Protocol, Logistics and Security",
      "VIP Management",
      "Creative Graphics Team",
      "Sales, Advertisement and Merchandise",
      "Other — please specify",
    ],
  );
});

test("competency options align with the approved volunteer teams", () => {
  assert.deepEqual(
    VOLUNTEER_COMPETENCY_OPTIONS.map(({ label }) => label),
    [
      "Ticket sales or registration",
      "Partnership or sponsorship management",
      "Marketing, communications or publicity",
      "Event hall selection or management",
      "Hospitality or catering support",
      "Event medical support",
      "Event operations",
      "Technical or IT support",
      "Program planning or coordination",
      "Pre-event planning or coordination",
      "Competition coordination",
      "Protocol, logistics or security",
      "VIP management or guest relations",
      "Creative or graphic design",
      "Sales, advertisement or merchandise",
      "Other",
    ],
  );
});

test("every controlled primary role is accepted", () => {
  for (const primaryRole of VOLUNTEER_ROLE_VALUES) {
    const input = validInterest();
    const result = volunteerInterestSchema.safeParse({
      ...input,
      primaryRole,
      secondaryRole: undefined,
      ...(primaryRole === "OTHER"
        ? { otherRoleDescription: "Another useful role" }
        : {}),
    });
    assert.equal(result.success, true, primaryRole);
  }
});

test("unknown states and cross-state LGAs are rejected", () => {
  const crossStateResult = volunteerInterestSchema.safeParse({
    ...validInterest(),
    state: "Lagos",
  });
  assert.equal(crossStateResult.success, false);
  assert.ok(
    crossStateResult.error?.issues.some((issue) => issue.path[0] === "lga"),
  );

  const unknownStateResult = volunteerInterestSchema.safeParse({
    ...validInterest(),
    state: "Atlantis",
  });
  assert.equal(unknownStateResult.success, false);
  assert.ok(
    unknownStateResult.error?.issues.some((issue) => issue.path[0] === "state"),
  );
});

test("conditional fields and unique selections are enforced", () => {
  const result = volunteerInterestSchema.safeParse({
    ...validInterest(),
    secondaryRole: "TECHNICAL_IT_SUPPORT",
    competencies: ["OTHER", "OTHER"],
    hasVolunteeredBefore: true,
  });
  assert.equal(result.success, false);
  const paths = result.error?.issues.map((issue) => issue.path[0]);
  assert.ok(paths?.includes("secondaryRole"));
  assert.ok(paths?.includes("competencies"));
  assert.ok(paths?.includes("otherCompetency"));
  assert.ok(!paths?.includes("volunteerExperience"));
});

test("optional fields still enforce supplied word, URL, and controlled-value constraints", () => {
  const result = volunteerInterestSchema.safeParse({
    ...validMinimalInterest(),
    experienceLevel: "EXPERT",
    relevantExperience: "Too short",
    hasVolunteeredBefore: true,
    volunteerExperience: "Too short",
    motivation: "Too short",
    proposedContribution: "Too short",
    portfolioUrl: "ftp://example.com/profile",
    contributionStages: ["DURING_CONFERENCE"],
    contributionMode: "SOMETIMES_REMOTE",
    weeklyCommitment: "WHEN_AVAILABLE",
    availabilityWindows: ["OVERNIGHT"],
    eventAvailability: "MAYBE",
  });

  assert.equal(result.success, false);
  const paths = new Set(result.error?.issues.map((issue) => issue.path[0]));
  assert.ok(paths.has("experienceLevel"));
  assert.ok(paths.has("relevantExperience"));
  assert.ok(paths.has("volunteerExperience"));
  assert.ok(paths.has("motivation"));
  assert.ok(paths.has("proposedContribution"));
  assert.ok(paths.has("portfolioUrl"));
  assert.ok(paths.has("contributionStages"));
  assert.ok(paths.has("contributionMode"));
  assert.ok(paths.has("weeklyCommitment"));
  assert.ok(paths.has("availabilityWindows"));
  assert.ok(paths.has("eventAvailability"));
});

test("volunteer experience is rejected unless prior volunteering is true", () => {
  for (const hasVolunteeredBefore of [false, undefined]) {
    const result = volunteerInterestSchema.safeParse({
      ...validMinimalInterest(),
      hasVolunteeredBefore,
      volunteerExperience: words("volunteering", 20),
    });

    assert.equal(result.success, false);
    assert.ok(
      result.error?.issues.some(
        (issue) => issue.path[0] === "volunteerExperience",
      ),
    );
  }
});

test("unknown fields and non-http URLs are rejected", () => {
  const result = volunteerInterestSchema.safeParse({
    ...validInterest(),
    portfolioUrl: "ftp://example.com/profile",
    unexpected: true,
  });
  assert.equal(result.success, false);
  assert.ok(
    result.error?.issues.some((issue) => issue.path[0] === "portfolioUrl"),
  );
  assert.ok(
    result.error?.issues.some((issue) => issue.code === "unrecognized_keys"),
  );
});
