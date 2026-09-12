-- CreateEnum
CREATE TYPE "ConferenceTicketType" AS ENUM ('UNDERGRADUATE', 'GRADUATE_PROFESSIONAL');

-- CreateTable
CREATE TABLE "ConferenceRegistration" (
    "id" TEXT NOT NULL,
    "publicReference" TEXT NOT NULL,
    "ticketType" "ConferenceTicketType" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "normalizedEmail" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "maritalStatusOther" TEXT,
    "residentialAddress" TEXT NOT NULL,
    "activityOfInterest" TEXT NOT NULL,
    "discoverySource" TEXT NOT NULL,
    "discoverySourceOther" TEXT,
    "referral" TEXT,
    "institutionName" TEXT,
    "fieldOfStudy" TEXT,
    "studentStatusConfirmed" BOOLEAN,
    "professionalInformation" TEXT,
    "industrySector" TEXT,
    "professionalCategory" TEXT,
    "privacyConsentAt" TIMESTAMP(3) NOT NULL,
    "privacyNoticeVersion" TEXT NOT NULL,
    "submissionKeyHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConferenceRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConferenceRegistration_publicReference_key" ON "ConferenceRegistration"("publicReference");

-- CreateIndex
CREATE UNIQUE INDEX "ConferenceRegistration_normalizedEmail_key" ON "ConferenceRegistration"("normalizedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "ConferenceRegistration_submissionKeyHash_key" ON "ConferenceRegistration"("submissionKeyHash");

-- CreateIndex
CREATE INDEX "ConferenceRegistration_ticketType_idx" ON "ConferenceRegistration"("ticketType");

-- CreateIndex
CREATE INDEX "ConferenceRegistration_createdAt_idx" ON "ConferenceRegistration"("createdAt");

-- CreateIndex
CREATE INDEX "ConferenceRegistration_discoverySource_idx" ON "ConferenceRegistration"("discoverySource");
