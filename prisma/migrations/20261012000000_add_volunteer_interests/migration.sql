-- CreateEnum
CREATE TYPE "VolunteerRole" AS ENUM ('CREATIVE_GRAPHICS_DESIGN', 'CONTENT_WRITING_COPYWRITING', 'CONFERENCE_OPERATIONS_LOGISTICS', 'MARKETING_PROMOTION', 'SOCIAL_MEDIA_INFLUENCE_PROMOTION', 'MEDIA_PUBLICITY_PUBLIC_RELATIONS', 'FUNDRAISING_SPONSORSHIP', 'BUSINESS_DEVELOPMENT_CORPORATE_PARTNERSHIPS', 'TICKETING_REGISTRATION', 'PROGRAMME_PLANNING_COORDINATION', 'PHOTOGRAPHY_VIDEOGRAPHY', 'TECHNICAL_IT_SUPPORT', 'VOLUNTEER_COORDINATION_MANAGEMENT', 'PROTOCOL_GUEST_RELATIONS', 'OTHER');

-- CreateEnum
CREATE TYPE "VolunteerApplicantCategory" AS ENUM ('SECONDARY_SCHOOL_STUDENT', 'UNDERGRADUATE_STUDENT', 'GRADUATE_STUDENT', 'EARLY_CAREER_PROFESSIONAL', 'EXPERIENCED_PROFESSIONAL', 'OTHER');

-- CreateEnum
CREATE TYPE "VolunteerExperienceLevel" AS ENUM ('NO_FORMAL_EXPERIENCE', 'LESS_THAN_ONE_YEAR', 'ONE_TO_TWO_YEARS', 'THREE_TO_FIVE_YEARS', 'SIX_PLUS_YEARS');

-- CreateEnum
CREATE TYPE "VolunteerContributionMode" AS ENUM ('ON_SITE', 'REMOTE', 'HYBRID_FLEXIBLE');

-- CreateEnum
CREATE TYPE "VolunteerWeeklyCommitment" AS ENUM ('UNDER_THREE_HOURS', 'THREE_TO_FIVE_HOURS', 'SIX_TO_TEN_HOURS', 'MORE_THAN_TEN_HOURS');

-- CreateEnum
CREATE TYPE "VolunteerEventAvailability" AS ENUM ('AVAILABLE', 'NEEDS_CONFIRMATION', 'NOT_AVAILABLE');

-- CreateEnum
CREATE TYPE "VolunteerInterestStatus" AS ENUM ('NEW', 'UNDER_REVIEW', 'SHORTLISTED', 'CONTACTED', 'SELECTED', 'WAITLISTED', 'NOT_SELECTED');

-- CreateTable
CREATE TABLE "VolunteerInterest" (
    "id" TEXT NOT NULL,
    "publicReference" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "normalizedEmail" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "lga" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "applicantCategory" "VolunteerApplicantCategory" NOT NULL,
    "applicantCategoryOther" TEXT,
    "affiliationName" TEXT,
    "courseOrJobTitle" TEXT,
    "primaryRole" "VolunteerRole" NOT NULL,
    "secondaryRole" "VolunteerRole",
    "otherRoleDescription" TEXT,
    "competencies" TEXT[],
    "otherCompetency" TEXT,
    "experienceLevel" "VolunteerExperienceLevel" NOT NULL,
    "relevantExperience" TEXT NOT NULL,
    "hasVolunteeredBefore" BOOLEAN NOT NULL,
    "volunteerExperience" TEXT,
    "motivation" TEXT NOT NULL,
    "proposedContribution" TEXT NOT NULL,
    "portfolioUrl" TEXT,
    "additionalProfileUrl" TEXT,
    "contributionStages" TEXT[],
    "contributionMode" "VolunteerContributionMode" NOT NULL,
    "weeklyCommitment" "VolunteerWeeklyCommitment" NOT NULL,
    "availabilityWindows" TEXT[],
    "eventAvailability" "VolunteerEventAvailability" NOT NULL,
    "commitmentAcknowledgedAt" TIMESTAMP(3) NOT NULL,
    "privacyConsentAt" TIMESTAMP(3) NOT NULL,
    "privacyNoticeVersion" TEXT NOT NULL,
    "status" "VolunteerInterestStatus" NOT NULL DEFAULT 'NEW',
    "adminNotes" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "submissionKeyHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VolunteerInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerInterest_publicReference_key" ON "VolunteerInterest"("publicReference");

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerInterest_normalizedEmail_key" ON "VolunteerInterest"("normalizedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerInterest_submissionKeyHash_key" ON "VolunteerInterest"("submissionKeyHash");

-- CreateIndex
CREATE INDEX "VolunteerInterest_state_idx" ON "VolunteerInterest"("state");

-- CreateIndex
CREATE INDEX "VolunteerInterest_lga_idx" ON "VolunteerInterest"("lga");

-- CreateIndex
CREATE INDEX "VolunteerInterest_primaryRole_idx" ON "VolunteerInterest"("primaryRole");

-- CreateIndex
CREATE INDEX "VolunteerInterest_secondaryRole_idx" ON "VolunteerInterest"("secondaryRole");

-- CreateIndex
CREATE INDEX "VolunteerInterest_status_idx" ON "VolunteerInterest"("status");

-- CreateIndex
CREATE INDEX "VolunteerInterest_applicantCategory_idx" ON "VolunteerInterest"("applicantCategory");

-- CreateIndex
CREATE INDEX "VolunteerInterest_createdAt_idx" ON "VolunteerInterest"("createdAt");
