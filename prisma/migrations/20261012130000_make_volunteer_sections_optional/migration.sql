-- AlterTable
ALTER TABLE "VolunteerInterest"
    ALTER COLUMN "experienceLevel" DROP NOT NULL,
    ALTER COLUMN "relevantExperience" DROP NOT NULL,
    ALTER COLUMN "hasVolunteeredBefore" DROP NOT NULL,
    ALTER COLUMN "motivation" DROP NOT NULL,
    ALTER COLUMN "proposedContribution" DROP NOT NULL,
    ALTER COLUMN "contributionStages" SET DEFAULT ARRAY[]::TEXT[],
    ALTER COLUMN "contributionMode" DROP NOT NULL,
    ALTER COLUMN "weeklyCommitment" DROP NOT NULL,
    ALTER COLUMN "availabilityWindows" SET DEFAULT ARRAY[]::TEXT[],
    ALTER COLUMN "eventAvailability" DROP NOT NULL,
    ALTER COLUMN "commitmentAcknowledgedAt" DROP NOT NULL,
    ALTER COLUMN "privacyConsentAt" DROP NOT NULL;
