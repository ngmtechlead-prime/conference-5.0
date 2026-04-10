# Conference 5.0 Website Portal - Project Plan

## Overview

This document outlines the requirements for the **NGM 5.0 Conference Website Portal**, which includes registration for two competitions:

1. **DARE Nigeria Challenge** (NGM X Dr. Kola Adesina Competition)
2. **SME Pitch Competition**

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Form Handling**: react-hook-form + zod
- **State Management**: React Query + Context
- **Authentication**: NextAuth.js (if needed for applicant dashboard)
- **Icons**: Lucide React
- **UI Components**: shadcn/ui (recommended)

---

## Site Structure

### Global Components

- [x] **Navbar** - Logo, Speakers, Agenda, Competitions (dropdown), Gallery, Contact, Buy Tickets CTA
- [x] **Footer** - Organized sections: Conference, Competitions, Get Involved, Support

### Pages Required

| Route | Description | Status |
|-------|-------------|--------|
| `/` | Main conference landing page | 🔲 Pending |
| `/speakers` | Speakers listing | 🔲 Pending |
| `/agenda` | Conference agenda/schedule | 🔲 Pending |
| `/competitions/dare-nigeria` | DARE Nigeria Challenge landing | ✅ Done |
| `/competitions/dare-nigeria/apply` | Multi-step registration form | 🔲 Pending |
| `/competitions/sme-pitch` | SME Pitch Competition landing | ✅ Done |
| `/competitions/sme-pitch/apply` | SME Pitch registration form | 🔲 Pending |
| `/gallery` | Photo/video gallery | 🔲 Pending |
| `/contact` | Contact page | 🔲 Pending |
| `/tickets` | Ticket purchase/pricing | 🔲 Pending |
| `/sponsors` | Become a sponsor | 🔲 Pending |
| `/merchandise` | Shop merchandise | 🔲 Pending |
| `/privacy` | Privacy policy | 🔲 Pending |
| `/terms` | Terms & conditions | 🔲 Pending |

---

## Competition 1: DARE Nigeria Challenge

### Landing Page (`/competitions/dare-nigeria`)

#### Sections (Extracted from Design)

| Section | Component | Status |
|---------|-----------|--------|
| Hero | `Hero.tsx` | ✅ Created |
| About Dr. Kola Adesina & Challenge Info | `About.tsx` | ✅ Created |
| Prizes (₦2M, ₦10M, ₦1M) | `Prizes.tsx` | ✅ Created |
| Who Can Apply (Eligibility) | `WhoCanApply.tsx` | ✅ Created |
| FAQ Accordion | `FAQ.tsx` | ✅ Created |
| Apply Now CTA | `ApplyNow.tsx` | ✅ Created |

#### Hero Section Content
- **Headline**: "Do You Have a Bold Idea That Can Change Nigeria?"
- **Subtext**: Apply for the NGM Dr. Kola Adesina DARE Nigeria Challenge 2026
- **CTA**: "Apply Now" button

#### Eligibility Criteria
- **Age Range**: 18-40 years old
- **Citizenship**: Nigerian citizens only
- **Business Stage**: Idea or prototype stage (no institutional funding)
- **Existing Venture**: Must have started working on innovation
- **Team Size**: Solo or team applications accepted
- **Great Service**: Innovation should address a real Nigerian problem

#### Prize Structure
| Position | Prize Amount |
|----------|--------------|
| 1st Place | ₦2,000,000 |
| 2nd Place | ₦10,000,000 |
| 3rd Place | ₦1,000,000 |

---

### Registration Form (`/competitions/dare-nigeria/apply`)

Multi-step wizard with **4 steps**:

#### Step 1: Applicant Profile

**Personal Information**
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| First Name | Text | As on government ID | ✅ |
| Last Name | Text | As on government ID | ✅ |
| Date of Birth | Date | Must be between 18-40 years old | ✅ |
| Gender | Select | Options TBD | ✅ |
| Nationality | Select | Must be Nigerian | ✅ |
| State of Origin | Select | Nigerian states list | ✅ |
| State of Current Residence | Select | Nigerian states list | ✅ |
| Email Address | Email | Valid email format | ✅ |
| Phone Number | Tel | WhatsApp-enabled preferred | ✅ |
| LinkedIn Profile URL | URL | Valid LinkedIn URL | ❌ |
| Government-Issued ID | File Upload | National ID, Voter's Card, Passport, Driver's License (Max 5MB) | ✅ |

**Educational & Professional Background**
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Highest Level of Education Completed | Select | Dropdown options | ✅ |
| Current Occupation / Employment Status | Select | Dropdown options | ✅ |
| Field / Industry of Professional Experience | Textarea | Free text | ✅ |
| Previous accelerator/incubator participation | Radio | Yes / No | ✅ |

---

#### Step 2: Innovation & Pitch

**Your Innovation Profile**
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Name of Innovation / Business Project | Text | Max length TBD | ✅ |
| Innovation Stage | Select | Dropdown options | ✅ |
| Sector / Industry | Select | Dropdown options | ✅ |
| SDG Alignment | Checkbox (Multi-select) | See SDG list below | ✅ |

**SDG Options**
- SDG 1 - No Poverty
- SDG 2 - Zero Hunger
- SDG 3 - Good Health
- SDG 4 - Quality Education
- SDG 5 - Gender Equality
- SDG 6 - Clean Water
- SDG 7 - Clean Energy
- SDG 8 - Economic Growth
- SDG 9 - Industry & Innovation
- SDG 10 - Reduced Inequalities
- SDG 11 - Sustainable Cities
- SDG 13 - Climate Action

**The Pitch**
| Field | Type | Character Limit | Required |
|-------|------|-----------------|----------|
| Problem Statement | Textarea | ~250 words | ✅ |
| Your Solution | Textarea | ~250 words | ✅ |
| Target Beneficiaries / Market | Textarea | ~150 words | ✅ |
| Impact Potential | Textarea | ~150 words | ✅ |
| Revenue or Sustainability Model | Textarea | ~150 words | ✅ |
| What makes your innovation uniquely Nigerian? | Textarea | ~100 words | ✅ |

**Team & Execution Readiness**
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Applying as individual or team? | Radio | Solo (Sole Founder) / Team (2+ members) | ✅ |
| Background & positioning | Textarea | ~150 words | ✅ |
| Progress so far | Textarea | ~150 words | ✅ |
| Biggest execution challenge | Textarea | ~150 words | ✅ |

---

#### Step 3: Funding & Media

**Funding & Support**
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Received external funding? | Radio | No / Yes - received some support | ✅ |
| Estimated total funding need | Select | Dropdown ranges | ✅ |
| How will you use seed funding? | Textarea | ~150 words | ✅ |
| What type of support do you need? | Checkbox (Multi-select) | See options below | ✅ |

**Support Type Options**
- Business Mentorship & Coaching
- Investor & Funder Introductions
- Technical / Product Development Support
- Market Access & Partnerships
- Legal & Compliance Advisory
- Media & Public Exposure
- Peer Network & Community
- Training / Capacity Building

**Document & Media Uploads**
| Field | Type | Accepted Formats | Max Size | Required |
|-------|------|------------------|----------|----------|
| Innovation Summary / One-Page Pitch | File | PDF, DOC, DOCX | 5MB | ✅ |
| Pitch Deck | File | PDF, PPT, PPTX | 10MB | ❌ |
| Prototype / Demo / Supporting Evidence | File | PDF, JPG, PNG | 10MB | ❌ |
| Short Video Pitch (30-90 seconds) | File | MP4, MOV | 100MB | ✅ |
| Video Link (Alternative) | URL | YouTube, Google Drive, Dropbox | N/A | ❌ |
| Conference Ticket Payment Evidence | File | PDF, JPG, PNG | 5MB | ✅ |

---

#### Step 4: Availability & Commitment

**Availability & Commitment**
| Field | Type | Options | Required |
|-------|------|---------|----------|
| Full availability for all phases? | Radio | Yes - full commitment / Mostly - minor constraints | ✅ |
| Willing to travel/relocate to Lagos? | Radio | Yes / Yes - need logistical support / Based in Lagos / Unsure | ✅ |
| Open to structured mentorship? | Radio | Yes - actively welcome / Yes - selectively / Prefer independent | ✅ |

**Final Questions & Declaration**
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| How did you hear about the challenge? | Select | Dropdown options | ✅ |
| Why do you DARE? (Personal conviction) | Textarea | Max 100 words | ✅ |

**Applicant Declaration & Agreement (Checkboxes)**
All checkboxes must be checked:
- [ ] I am a Nigerian citizen between ages 18-40
- [ ] All information provided is accurate, truthful, and complete
- [ ] My innovation is at idea/prototype stage with NO institutional funding
- [ ] I am the original creator or lead representative
- [ ] I understand false/misleading info = disqualification
- [ ] I commit to participating in all phases if shortlisted
- [ ] I consent to NGM Platform and Dr. Kola Adesina's team using my information
- [ ] I accept the Terms and Conditions of the DARE Nigeria Challenge 2026

**Final Submission**
| Field | Type | Required |
|-------|------|----------|
| Full Name (Digital Signature) | Text | ✅ |
| Date | Date | ✅ |

---

## Competition 2: SME Pitch Competition

### Landing Page (`/competitions/sme-pitch`)

#### Sections (Extracted from Design)

| Section | Component | Status |
|---------|-----------|--------|
| Hero | `Hero.tsx` | ✅ Created |
| More Than a Pitch Competition | `MoreThanPitch.tsx` | ✅ Created |
| What You Stand to Win | `WhatYouWin.tsx` | ✅ Created |
| Who This Is For | `WhoThisIsFor.tsx` | ✅ Created |
| How We Select Our Winners | `HowWeSelect.tsx` | ✅ Created |
| Past Winners Testimonials | `PastWinners.tsx` | ✅ Created |
| FAQ Accordion | `FAQ.tsx` | ✅ Created |
| Apply Now CTA | `ApplyNow.tsx` | ✅ Created |

### Registration Form (`/competitions/sme-pitch/apply`)

Multi-step wizard with **4 steps**:

#### Step 1: Founder & Business

**Personal Information**
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| First Name | Text | As on government ID | ✅ |
| Last Name | Text | As on government ID | ✅ |
| Date of Birth | Date | Must be between 18-65 years old | ✅ |
| Gender | Select | Male/Female | ✅ |
| Nationality | Select | Must be Nigerian | ✅ |
| State of Origin | Select | Nigerian states list | ✅ |
| Marital Status | Select | Single/Married/Divorced/Widowed | ✅ |
| Residential Address | Textarea | Free text | ✅ |
| State of Current Residence | Select | Nigerian states list | ✅ |
| Email Address | Email | Valid email format | ✅ |
| Phone Number | Tel | WhatsApp-enabled preferred | ✅ |
| Social Media Profile URL | URL | Valid URL | ❌ |
| Government-Issued ID | File Upload | Max 5MB | ✅ |

**Business Information**
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Is your business registered? | Radio | Yes registered / No, in progress / No, not registered | ✅ |
| Business Name | Text | Free text | ✅ |
| Business Ownership Status | Select | Dropdown options | ✅ |
| CAC Registration Number | Text | For registered businesses only | ❌ |
| Industry/Sector | Select | Dropdown options | ✅ |
| Stage of Business | Select | Dropdown options | ✅ |
| Years of Operation | Select | Dropdown options | ✅ |
| State where business is located | Select | Nigerian states list | ✅ |
| Full address of the business | Textarea | Free text | ✅ |
| Number of People Working in Business | Select | Dropdown ranges | ✅ |
| Business Website/Social Media | Text | Free text | ❌ |

---

#### Step 2: Pitch & Funding

**Business Pitch**
| Field | Type | Character Limit | Required |
|-------|------|-----------------|----------|
| What problem is your business solving? | Textarea | ~50 words | ✅ |
| Describe your solution and what makes it innovative | Textarea | ~50 words | ✅ |
| What sets your business apart from alternatives? | Textarea | ~50 words | ✅ |
| Target customers and market opportunity | Textarea | ~50 words | ✅ |
| What is your revenue model? | Textarea | ~50 words | ✅ |
| Traction or milestones achieved so far | Textarea | ~50 words | ✅ |
| Key business goals for next 12 months | Textarea | ~50 words | ✅ |

**Funding & Support**
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Previously received external funding? | Radio | Yes / No | ✅ |
| If yes, provide details | Textarea | ~50 words | ❌ |
| How much funding seeking and usage plan | Textarea | ~50 words | ✅ |
| What type of support would benefit most? | Checkbox (Multi-select) | See options below | ✅ |
| Open to mentorship? | Radio | Yes absolutely / Yes selectively / Not at this stage | ✅ |

**Support Type Options**
- Seed/Growth Funding
- Investor Introductions
- Business Mentoring
- Market Access & Distribution
- Media & Brand Exposure
- Strategic Partnerships
- Legal & Compliance Advisory
- Technical / Product Development Support

---

#### Step 3: Documents & Media

| Field | Type | Accepted Formats | Max Size | Required |
|-------|------|------------------|----------|----------|
| Evidence of Business Registration | File | PDF, JPG, PNG | 5MB | ❌ |
| Business Profile | File | PDF, PPT, PPTX | 10MB | ✅ |
| Financial Statements or Revenue Projections | File | PDF, Excel | 5MB | ✅ |
| One-Page Business Summary | File | PDF, DOC, DOCX | 10MB | ✅ |
| Shareable Video Pitch Link (60-120 sec) | URL | YouTube, Google Drive, Dropbox | N/A | ✅ |
| Conference Ticket Payment Evidence | File | PDF, JPG, PNG | 5MB | ✅ |
| Government-Issued ID | File | PDF, JPG, PNG | 5MB | ✅ |

**Video Link Disclaimer:**
⚠️ Providing a video link that cannot be accessed (private video, broken link, requires login) will result in **instant disqualification**. Ensure permissions are set to "Anyone with the link can view."

---

#### Step 4: Availability & Final Declaration

**Availability**
| Field | Type | Options | Required |
|-------|------|---------|----------|
| Available for ALL stages of competition? | Radio | Yes - available for all stages / No - scheduling conflicts | ✅ |
| How did you hear about the competition? | Select | Dropdown options | ✅ |
| Additional information for panel | Textarea | Max 100 words | ❌ |

**Applicant Declaration (Checkboxes)**
All checkboxes must be checked:
- [ ] All information provided is accurate, complete, and truthful
- [ ] I am a founder or authorised representative of the business
- [ ] I understand false/misleading info = immediate disqualification
- [ ] I agree to participate in all stages if shortlisted
- [ ] I am willing to join the NGM entrepreneurship club/NGM platform
- [ ] I accept the Terms and Conditions of the NGM SME Pitch Competition
- [ ] I consent to NGM using my submitted information for competition purposes

**Final Submission**
| Field | Type | Required |
|-------|------|----------|
| Full Name (Digital Signature) | Text | ✅ |
| Date | Date | ✅ |

---

### Success Page (`/competitions/sme-pitch/apply/success`)

**Content:**
- Illustration: Paper airplane (ApplicationReceivedIcon component)
- Headline: "Application **Received**" (Received in green)
- Message: "Thank you for applying to the NGM CONFERENCE 5.0 SME PITCH COMPETITION. Your application has been successfully received. We will be reaching out to you via email soon to confirm whether you will proceed to the next round."
- CTA: "Return to Homepage →"

---

## Technical Implementation

### Form Architecture

```
components/
├── competitions/
│   └── dare-nigeria/
│       ├── forms/
│       │   ├── ApplicantProfileForm.tsx    # Step 1
│       │   ├── InnovationPitchForm.tsx     # Step 2
│       │   ├── FundingMediaForm.tsx        # Step 3
│       │   └── CommitmentForm.tsx          # Step 4
│       ├── FormWizard.tsx                   # Multi-step wrapper
│       └── FormProgress.tsx                 # Step indicator
```

### Data Schema (TypeScript Types)

```typescript
interface DareNigeriaApplication {
  // Step 1: Applicant Profile
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    nationality: string;
    stateOfOrigin: string;
    stateOfResidence: string;
    email: string;
    phoneNumber: string;
    linkedinUrl?: string;
    governmentId: File;
  };
  education: {
    highestEducation: string;
    occupation: string;
    fieldOfExperience: string;
    previousAcceleratorParticipation: boolean;
  };

  // Step 2: Innovation & Pitch
  innovation: {
    name: string;
    stage: string;
    sector: string;
    sdgAlignment: string[];
  };
  pitch: {
    problemStatement: string;
    solution: string;
    targetBeneficiaries: string;
    impactPotential: string;
    revenueModel: string;
    uniquelyNigerian: string;
  };
  team: {
    type: 'solo' | 'team';
    background: string;
    progressSoFar: string;
    biggestChallenge: string;
  };

  // Step 3: Funding & Media
  funding: {
    receivedExternalFunding: boolean;
    estimatedFundingNeed: string;
    fundingUsePlan: string;
    supportTypesNeeded: string[];
  };
  documents: {
    innovationSummary: File;
    pitchDeck?: File;
    supportingEvidence?: File;
    videoPitch?: File;
    videoPitchUrl?: string;
    ticketEvidence: File;
  };

  // Step 4: Commitment
  commitment: {
    fullAvailability: string;
    willingToRelocate: string;
    openToMentorship: string;
  };
  declaration: {
    howHeardAbout: string;
    whyDare: string;
    agreements: boolean[];
    digitalSignature: string;
    signatureDate: Date;
  };
}
```

### API Endpoints (Backend Integration)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/competitions/dare-nigeria/apply` | Submit application |
| GET | `/api/competitions/dare-nigeria/application/:id` | Get application status |
| POST | `/api/upload` | File upload handler |

### File Upload Strategy
- Use direct upload to cloud storage (S3/Cloudinary)
- Implement file type and size validation client-side
- Show upload progress indicators
- Support drag-and-drop

---

## UI/UX Requirements

### Design System
- **Primary Colors**: Navy Blue (#1a365d), Green accent
- **Typography**: Clean, modern sans-serif
- **Spacing**: Consistent padding/margins following 8px grid
- **Form Elements**: Clean inputs with clear labels and validation messages

### Form UX
- Progress indicator showing current step (1/4, 2/4, etc.)
- Save progress between steps (localStorage or server-side)
- "Previous Step" and "Save & Continue" navigation
- Field validation with inline error messages
- Character counters for textarea fields
- File upload with preview and remove option

### Responsive Design
- Mobile-first approach
- Form should work well on mobile devices
- Touch-friendly file upload areas

---

## Dependencies to Install

```bash
pnpm add react-hook-form zod @hookform/resolvers
pnpm add @tanstack/react-query
pnpm add lucide-react
pnpm add clsx tailwind-merge
# Optional: shadcn/ui components
```

---

## Development Phases

### Phase 1: Foundation ✅
- [x] Project setup (Next.js, TailwindCSS)
- [x] Navbar component
- [x] Footer component

### Phase 2: DARE Nigeria Landing Page 🔄
- [x] Hero section
- [x] About section
- [x] Prizes section
- [x] Who Can Apply section
- [x] FAQ section
- [x] Apply Now CTA
- [ ] Page integration and routing

### Phase 3: DARE Nigeria Registration Form
- [ ] Form wizard infrastructure
- [ ] Step 1: Applicant Profile form
- [ ] Step 2: Innovation & Pitch form
- [ ] Step 3: Funding & Media form
- [ ] Step 4: Commitment form
- [ ] Form validation (Zod schemas)
- [ ] File upload components
- [ ] Form state persistence

### Phase 4: Conference Main Pages
- [ ] Main landing page
- [ ] Speakers page
- [ ] Agenda page
- [ ] Gallery page
- [ ] Contact page
- [ ] Tickets/Pricing page

### Phase 5: SME Pitch Competition
- [x] Landing page
- [ ] Registration form wizard
  - [ ] Step 1: Founder & Business form
  - [ ] Step 2: Pitch & Funding form
  - [ ] Step 3: Documents & Media form
  - [ ] Step 4: Declaration form
- [ ] Success page
- [ ] Form validation (Zod schemas)
- [ ] Constants and types

### Phase 6: Backend Integration
- [ ] API routes for form submission
- [ ] File upload to cloud storage
- [ ] Email notifications
- [ ] Admin dashboard (if needed)

### Phase 7: Polish & Launch
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Production deployment

---

## Open Questions

1. **Backend**: What backend/database will store applications? (Supabase, Firebase, custom API?)
2. **File Storage**: Where should uploaded files be stored? (S3, Cloudinary, Vercel Blob?)
3. **Authentication**: Do applicants need accounts to track their application status?
4. **Email Notifications**: Should applicants receive confirmation emails?
5. **Admin Panel**: Is there a need for an admin dashboard to review applications?
6. **SME Pitch**: When will designs for the SME Pitch Competition be available?
7. **Ticket Integration**: How are conference tickets purchased? Link to external platform?

---

## Notes

- All form data should be validated both client-side (UX) and server-side (security)
- Consider implementing draft/save functionality for long forms
- Video uploads may require compression or external hosting recommendations
- Conference ticket payment evidence suggests tickets are purchased elsewhere first

---

*Last Updated: April 2026*
