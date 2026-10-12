# NGM Conference 6.0 Volunteer Expression of Interest Form Plan

## 1. Purpose

Build one public, mobile-friendly Volunteer Expression of Interest form at:

- `/conf-6.0-interest-form`

The form will help NGM identify prospective Conference 6.0 volunteers by:

- preferred role or area of contribution;
- relevant competencies and experience;
- previous volunteering experience;
- motivation and expected contribution; and
- practical availability before and during the conference.

The form should be quick and straightforward to complete while producing structured, filterable data for the NGM team. It is an expression of interest, not an automatic acceptance or final volunteer assignment.

## 2. Findings from the Previous Conference Forms

Both referenced Google Forms were reviewed, including the later page hidden behind the first form's “Next” button.

### 2.1 Form 1 — “NGM Conference 5.0: Expression of Interest”

Fields collected:

1. Full name
2. Email
3. Phone number (WhatsApp)
4. Location of residence (city/state)
5. Applicant category:
   - Secondary School Student
   - Undergraduate Student
   - Graduate Student
   - Early Career Professional (0–5 years experience)
   - Experienced Professional (5 years and above)
   - Other
6. First-choice team
7. Second-choice/fallback team
8. Why the applicant wants to join the conference team, limited to 100 words

Team choices were:

- Marketing, Communications & Publicity
- Sales & Registration
- Sponsorship & Partnership
- Logistics
- Security & Protocol Operations
- Volunteer Management
- Graphics
- Programmes

### 2.2 Form 2 — “NGM Conference 5.0: Interest Application 2”

Fields collected:

1. Full name
2. Email
3. Phone number
4. Skill sets, with at least three required:
   - Graphics Design
   - Video Editing
   - Project Management
   - Content Writing
   - AI Automation
   - UI/UX Design
   - Web Development
   - Other
5. School
6. Course of study
7. Place of work
8. Job title
9. Years of experience
10. Social media links, such as LinkedIn or Instagram

### 2.3 Consolidation Approach

The new form should combine the strongest parts of both forms without repeating questions or creating a long screening questionnaire:

- Retain contact details and capture location as separate State, LGA, City, and Address fields, alongside applicant category, role preferences, skills, experience, motivation, and professional/profile links.
- Replace the old broad team list with the more specific Conference 6.0 role list.
- Retain a second-choice role as an optional fallback because this helps placement.
- Merge school/work questions into two neutral fields that suit students and professionals.
- Add previous volunteering and availability, which were missing from the earlier forms.
- Apart from the required State, LGA, City, and Address fields, avoid collecting unrelated or excessive information such as gender, marital status, identity documents, or a CV upload.
- Prefer controlled options for filtering, with short bounded narrative answers for context.

## 3. Product Goals and Success Criteria

### 3.1 Goals

1. Make the applicant’s preferred area of contribution unambiguous.
2. Capture enough evidence to assess fit without requiring a CV or lengthy application.
3. Keep completion practical on a mobile phone and on a slow connection.
4. Produce data that administrators can search, filter, review, and export.
5. Protect applicants’ personal data and prevent duplicate or abusive submissions.
6. Reuse the project’s established form, API, Prisma, admin, export, and email patterns.

### 3.2 Success Criteria

- A typical applicant can complete the form in approximately 5–8 minutes.
- One primary role is required; a different fallback role is optional.
- All 15 requested role choices are represented.
- Responses use controlled values wherever filtering is important.
- Free-text questions have clear prompts and sensible word/character limits.
- The form is fully usable at a 320px viewport and with keyboard-only navigation.
- Applicants receive an on-screen confirmation without personal data in the URL.
- Administrators can filter candidates by role, skills, experience, availability, and review status.
- Duplicate or repeated submission attempts do not create multiple records.
- `pnpm lint` and `pnpm build` pass before launch.

## 4. Scope

### 4.1 In Scope

- Public form at `/conf-6.0-interest-form`.
- Success page at `/conf-6.0-interest-form/success`.
- Responsive and accessible single-page form.
- Shared client/server validation with Zod.
- React Hook Form for field state and validation behavior.
- React Query mutation for submission, following the project guidelines.
- PostgreSQL persistence through Prisma.
- Public submission Route Handler.
- Rate limiting, request-size limits, normalization, idempotency, and duplicate handling.
- Confirmation email using the existing Resend/email infrastructure.
- Protected admin list and detail pages.
- Search, filters, review status, private notes, CSV export, and Excel export.
- Privacy notice and an optional consent acknowledgement.
- Logging that excludes applicant personal data.

### 4.2 Out of Scope for Version 1

- Applicant accounts or sign-in.
- Applicant editing after submission.
- CV, certificate, or identity-document upload.
- Interview scheduling.
- Automated candidate scoring or AI-based screening.
- Automatic volunteer assignment.
- Bulk email campaigns or WhatsApp messaging.
- Shift scheduling and event-day attendance tracking.

These can be considered later without changing the core interest record.

## 5. Recommended Applicant Experience

Use one form rather than two forms or a multi-step wizard. Divide it visually into four numbered sections so applicants understand the length from the beginning:

1. About you
2. Preferred role and competencies
3. Experience and motivation
4. Availability and consent

The page should show a brief introduction stating:

- the purpose of the form;
- the estimated completion time;
- that submitting interest does not guarantee selection;
- the application deadline, if one exists; and
- the Conference 6.0 date and location once confirmed.

Do not hide later sections behind “Next” buttons. A single page avoids lost progress, makes review easier, and is more straightforward on mobile. Use clear section headings, generous spacing, and a full-width submit button on small screens.

## 6. Final Form Specification

### 6.1 Section A — About You

| Field | Required | Control | Validation / Notes |
|---|---:|---|---|
| First name | Yes | Text | 2–80 characters; autocomplete `given-name` |
| Last name | Yes | Text | 2–80 characters; autocomplete `family-name` |
| Email address | Yes | Email | Normalize to lowercase; max 254 characters; autocomplete `email` |
| WhatsApp phone number | Yes | Telephone | Nigerian mobile format `+2348138021890`; no spaces or separators; autocomplete `tel`; mobile telephone keyboard |
| State | Yes | Dropdown | Select from Nigeria’s 36 states and the Federal Capital Territory; autocomplete `address-level1` |
| LGA | Yes | Dependent dropdown | Show only LGAs belonging to the selected state; disabled until a state is selected |
| City | Yes | Text | City, town, or community; 2–100 characters; autocomplete `address-level2` |
| Address | Yes | Textarea | Residential/contact address; 10–250 characters; autocomplete `street-address` |
| Applicant category | Yes | Select/radio | Controlled values listed below |
| School, organisation, or place of work | No | Text | One neutral field for students and professionals; max 150 characters |
| Course of study or job title | No | Text | One neutral field; max 120 characters |

Applicant-category options:

- Secondary school student
- Undergraduate student
- Graduate student
- Early-career professional (0–5 years)
- Experienced professional (5+ years)
- Other

Location dropdown behavior:

- State options must include all 36 Nigerian states and the Federal Capital Territory.
- LGA options must come from a complete, version-controlled mapping of each state/FCT to its LGAs.
- The LGA dropdown remains disabled with the prompt “Select a state first” until State is selected.
- Selecting or changing State clears any previously selected LGA before loading the matching options.
- State and LGA values must use stable internal identifiers while displaying readable official names.
- The same location mapping must be reused by validation, admin filters, and exports; do not maintain separate lists in individual components.

If “Other” is selected for applicant category, show and require “Please specify your category.”

### 6.2 Section B — Preferred Role and Competencies

#### Primary and fallback roles

| Field | Required | Control | Validation / Notes |
|---|---:|---|---|
| Primary role or area of interest | Yes | Select or single-choice cards | Exactly one role |
| Secondary/fallback role | No | Select | Must differ from the primary role |
| Other role description | Conditional | Text | Required if either role is “Other”; max 120 characters |

Role options:

1. Creative and Graphics Design
2. Content Writing and Copywriting
3. Conference Operations and Logistics
4. Marketing and Promotion
5. Social Media Influence and Promotion
6. Media, Publicity and Public Relations
7. Fundraising and Sponsorship
8. Business Development and Corporate Partnerships
9. Ticketing and Registration
10. Programme Planning and Coordination
11. Photography and Videography
12. Technical and IT Support
13. Volunteer Coordination and Management
14. Protocol and Guest Relations
15. Other — please specify

The role constants should be the single source of truth for the public form, validation, admin labels, filters, and exports.

#### Competencies

Ask: “Which competencies can you confidently contribute?”

- Require 1–5 choices.
- Display one column on mobile and two columns from the small breakpoint upward.
- Include “Other” with a conditional text field.

Recommended competency options:

- Graphic design
- UI/UX design
- Content writing or copywriting
- Photography
- Video recording or editing
- Digital marketing
- Social media or community management
- Media relations or public relations
- Event operations or logistics
- Project or programme management
- Fundraising or sales
- Sponsorship or partnership management
- Registration or customer service
- Web development or IT support
- Data tools or AI automation
- People or volunteer management
- Protocol or guest relations
- Public speaking or facilitation
- Other

This list preserves skills from the second previous form while adding competencies needed for the new role categories.

### 6.3 Section C — Experience and Motivation

| Field | Required | Control | Validation / Notes |
|---|---:|---|---|
| Relevant experience level | No | Select/radio | No formal experience yet; less than 1 year; 1–2 years; 3–5 years; 6+ years |
| Relevant experience or examples | No | Textarea | If supplied, ask for projects, responsibilities, tools, or measurable outcomes; 40–180 words |
| Have you volunteered before? | No | Yes/No radio | Controls the next field |
| Previous volunteering experience | No | Textarea | Shown when “Yes”; optional; if supplied, organisation/event, role, and responsibilities; 20–120 words |
| Why do you want to volunteer for NGM Conference 6.0? | No | Textarea | If supplied, 30–100 words |
| What would you contribute in your preferred role? | No | Textarea | If supplied, 30–120 words; focus on practical contribution |
| Portfolio or professional profile URL | No | URL | LinkedIn, portfolio, Behance, GitHub, or similar |
| Additional social/profile URL | No | URL | Instagram, X, TikTok, or another relevant public profile |

If the applicant has no formal experience, the experience prompt should explicitly allow coursework, personal projects, student leadership, community service, or transferable skills.

Do not require social media links for roles where public online presence is irrelevant. These fields remain optional.

### 6.4 Section D — Availability and Consent

| Field | Required | Control | Validation / Notes |
|---|---:|---|---|
| Contribution stages | No | Checkbox group | Optional choices: pre-conference planning; conference week/event day; post-conference follow-up |
| Preferred contribution mode | No | Radio | On-site; remote; hybrid/flexible |
| Weekly pre-conference commitment | No | Radio/select | Under 3 hours; 3–5 hours; 6–10 hours; more than 10 hours |
| Typical availability windows | No | Checkbox group | Optional choices: weekday daytime; weekday evenings; Saturdays; Sundays; varies/can be discussed |
| Main conference date availability | No | Radio | Yes; maybe/needs confirmation; no |
| Commitment acknowledgement | No | Checkbox | Applicant may acknowledge that selected volunteers must communicate reliably and attend agreed meetings or shifts |
| Privacy consent | No | Checkbox | Links to the privacy notice and records a timestamp/version only when selected |

The main conference date and location must appear in the availability question once confirmed. Keep them in a shared Conference 6.0 constants file so copy does not diverge across the page, email, and admin interface.

### 6.5 Submission Behavior

- Disable the submit button while the mutation is pending.
- Change the button label to “Submitting interest…” and expose pending state to assistive technology.
- Preserve all entered values after network or server errors.
- Show an error summary above the form and an inline message beside each invalid field.
- Focus the first invalid field after unsuccessful client validation.
- Map server field errors back to the corresponding input.
- On success, navigate directly to the success page without query parameters.
- Do not include name, email, phone number, role responses, or other personal data in the URL.

## 7. Data Design for Easy Analysis

### 7.1 Principles

- Store filterable concepts as controlled slugs/enums rather than display labels.
- Store State and LGA as separate controlled values, with City and Address in separate text columns.
- Store primary and secondary roles separately.
- Store competencies and availability choices as arrays of controlled values.
- Keep narrative fields bounded and purposeful.
- Record “Other” descriptions in dedicated columns instead of mixing them into controlled values.
- Export one applicant per row, with array values joined using a consistent delimiter.
- Include human-readable labels in exports, not only internal enum names.

### 7.2 Proposed Prisma Enums

- `VolunteerRole`
- `VolunteerApplicantCategory`
- `VolunteerExperienceLevel`
- `VolunteerContributionMode`
- `VolunteerWeeklyCommitment`
- `VolunteerEventAvailability`
- `VolunteerInterestStatus`

Recommended review statuses:

- `NEW`
- `UNDER_REVIEW`
- `SHORTLISTED`
- `CONTACTED`
- `SELECTED`
- `WAITLISTED`
- `NOT_SELECTED`

### 7.3 Proposed `VolunteerInterest` Model

Core fields:

- `id`
- `firstName`
- `lastName`
- `email`
- `normalizedEmail`
- `phoneNumber`
- `state`
- `lga`
- `city`
- `address`
- `applicantCategory`
- `applicantCategoryOther`
- `affiliationName`
- `courseOrJobTitle`
- `primaryRole`
- `secondaryRole`
- `otherRoleDescription`
- `competencies` as `String[]`
- `otherCompetency`
- `experienceLevel`
- `relevantExperience`
- `hasVolunteeredBefore`
- `volunteerExperience`
- `motivation`
- `proposedContribution`
- `portfolioUrl`
- `additionalProfileUrl`
- `contributionStages` as `String[]`
- `contributionMode`
- `weeklyCommitment`
- `availabilityWindows` as `String[]`
- `eventAvailability`
- `commitmentAcknowledgedAt`
- `privacyConsentAt`
- `privacyNoticeVersion`
- `status`, defaulting to `NEW`
- `adminNotes`
- `reviewedAt`
- `reviewedBy`
- `submissionKeyHash`
- `createdAt`
- `updatedAt`

Constraints and indexes:

- Unique `normalizedEmail` to keep the EOI to one submission per applicant in version 1.
- Unique hashed idempotency key.
- Index `state`, `lga`, `primaryRole`, `secondaryRole`, `status`, `applicantCategory`, and `createdAt`.
- Validate that the selected LGA belongs to the selected state before persistence.
- Validate that the secondary role differs from the primary role before persistence.

Do not store the email confirmation field if one is later added to the UI; it is validation-only data.

## 8. Proposed Application Architecture

### 8.1 Public UI

Proposed files:

```text
app/(main)/conf-6.0-interest-form/page.tsx
app/(main)/conf-6.0-interest-form/success/page.tsx
components/volunteer-interest/VolunteerInterestForm.tsx
components/volunteer-interest/AboutYouSection.tsx
components/volunteer-interest/RoleAndCompetenciesSection.tsx
components/volunteer-interest/ExperienceSection.tsx
components/volunteer-interest/AvailabilitySection.tsx
components/volunteer-interest/VolunteerInterestErrorSummary.tsx
components/volunteer-interest/VolunteerInterestSubmitButton.tsx
hooks/useVolunteerInterestForm.ts
lib/api/volunteer-interests.ts
lib/constants/nigeria-locations.ts
lib/constants/volunteer-interest.ts
lib/schemas/volunteer-interest.ts
types/volunteer-interest.ts
```

Responsibilities:

- Keep `page.tsx` a Server Component for metadata and page framing.
- Put interactive form behavior in `VolunteerInterestForm.tsx` and the custom hook.
- Derive TypeScript input/output types from the shared Zod schema.
- Keep the complete State-to-LGA mapping in `lib/constants/nigeria-locations.ts` as the single source of truth for dropdowns and validation.
- Use React Hook Form with `zodResolver`, `mode: "onBlur"`, `reValidateMode: "onChange"`, and `shouldUnregister: true` for conditional fields.
- Watch the State field so changing it clears the LGA value and repopulates the dependent LGA dropdown.
- Use a React Query `useMutation` inside the custom hook for the API call.
- Add `@tanstack/react-query` and a client Query Provider because the dependency/provider is not currently present in the repository, despite being required by the project guidelines.
- Reuse or improve existing field styles, but use semantic `fieldset` and `legend` elements for grouped radio and checkbox questions.

### 8.2 Public API

Proposed endpoint:

- `POST /api/volunteer-interests`

Processing sequence:

1. Generate a request ID for logs.
2. Enforce a small request-size limit, such as 32 KB.
3. Apply a dedicated Upstash rate limiter.
4. Parse JSON safely.
5. Validate with the shared Zod schema on the server.
6. Normalize the email and validate the phone number as an exact Nigerian `+234` mobile number.
7. Hash the idempotency key.
8. In a database transaction:
   - return an existing record for an idempotent replay;
   - reject a different submission using the same normalized email; and
   - create the new interest record.
9. Send the confirmation email after the transaction succeeds.
10. Log only request ID, record ID, primary role, response outcome, and replay state.
11. Return `201` for a new record or `200` for an idempotent replay.

Use the existing registration endpoint as the baseline for payload limits, field-error responses, idempotency, transactions, logging, and confirmation-email failure handling.

### 8.3 Admin UI and APIs

Proposed routes:

```text
app/(admin)/admin/volunteer-interests/page.tsx
app/(admin)/admin/volunteer-interests/[id]/page.tsx
app/api/admin/volunteer-interests/route.ts
app/api/admin/volunteer-interests/[id]/route.ts
```

Add “Volunteer Interests” to `components/admin/AdminNav.tsx`. Existing `/admin` and `/api/admin` protection in `proxy.ts` will cover the new routes.

Admin list requirements:

- Columns: applicant, State/LGA, primary role, applicant category, experience level, event availability, status, submitted date.
- Search: name, email, phone, City, Address, and affiliation.
- Filters:
  - State;
  - LGA, limited to the selected State when both filters are used;
  - primary role;
  - secondary role;
  - competency;
  - applicant category;
  - experience level;
  - previous volunteering;
  - weekly commitment;
  - event availability; and
  - review status.
- Server-side pagination.
- Clear empty, loading, failure, and retry states.
- CSV and Excel export for all results or the active filter set.

Admin detail requirements:

- Display all applicant responses in the same four-section order as the form.
- Permit status updates and private admin notes.
- Show submission and review timestamps.
- Keep mutation endpoints authenticated and authorized even though the page itself is protected.
- Return `Cache-Control: private, no-store` from admin APIs.

Export requirements:

- Use readable role and option labels.
- Join competencies and availability arrays predictably.
- Preserve UTF-8.
- Neutralize spreadsheet formulas beginning with `=`, `+`, `-`, or `@`, following the existing registration exporter.

## 9. Confirmation Experience

### 9.1 Success Page

The success page should:

- confirm that the expression of interest was received;
- explain that submission does not guarantee selection;
- say that shortlisted applicants will be contacted through the supplied email or WhatsApp number;
- link back to the NGM home page; and
- not repeat sensitive application answers.

### 9.2 Confirmation Email

Send a concise email containing:

- applicant’s first name;
- confirmation that NGM received the expression of interest;
- primary role selected;
- a reminder that this is not a selection notice; and
- the official support contact.

A failed email must not roll back or duplicate a successfully stored submission. Log the failure without logging the recipient’s personal details.

## 10. UX and Accessibility Requirements

- Target WCAG 2.2 AA.
- Use one-column layout on mobile; introduce two-column rows only for short related fields on larger screens.
- Keep touch targets at least 44×44 CSS pixels where practical.
- Use visible labels; placeholders must not replace labels.
- Mark required fields in text and programmatically.
- Use native input types and autocomplete tokens.
- Use `fieldset` and `legend` for every radio or checkbox question.
- Associate hints and errors with controls using `aria-describedby`.
- Set `aria-invalid` only when a field has an error.
- Put submission errors in a focusable `role="alert"` region.
- Ensure selected states do not rely on colour alone.
- Maintain sufficient colour contrast and visible keyboard focus.
- Avoid horizontal scrolling at 320px.
- Do not use drag-only interactions.
- Respect reduced-motion preferences.
- Do not persist personal information to local storage. Preserve values in component state after an API failure.
- Prevent an accidental Enter key in a single-line input from submitting the full form before completion.

## 11. Validation Rules

The shared Zod schema must enforce both field validation and cross-field rules:

- Names, email, phone, State, LGA, City, Address, primary role, and competencies are required; every field in the Experience and Motivation and Availability and Consent sections is optional.
- Phone must use the Nigerian mobile format `+2348138021890`: `+234`, a mobile prefix beginning with 7, 8, or 9, and nine additional digits, with no spaces or separators.
- State must be one of Nigeria’s 36 states or the Federal Capital Territory.
- LGA must be one of the controlled LGAs mapped to the submitted State; a valid LGA from another state must still be rejected.
- City must contain 2–100 characters and Address must contain 10–250 characters.
- `applicantCategoryOther` is present only when category is `OTHER`.
- `secondaryRole` is optional but cannot equal `primaryRole`.
- `otherRoleDescription` is required when either selected role is `OTHER` and absent otherwise.
- Competencies contain 1–5 unique controlled values.
- `otherCompetency` is required when `OTHER` is selected and absent otherwise.
- `volunteerExperience` is optional when `hasVolunteeredBefore` is true and must be absent when that answer is false or omitted.
- When supplied, contribution stages and availability windows contain only unique controlled values.
- Supplied URLs must be valid `http` or `https` URLs.
- Supplied narrative fields enforce character limits and user-facing word limits.
- Consent and commitment values may be false or omitted; their timestamps are recorded only when selected.
- Unknown object fields are rejected with strict schemas.

Client validation improves usability, but the server-side schema remains authoritative.

## 12. Security, Privacy, and Reliability

- Treat every public field as untrusted input.
- Use parameterized Prisma operations only.
- Apply the existing admin authorization to every admin read and mutation endpoint.
- Add a dedicated rate-limit prefix for volunteer interests.
- Limit request payload size.
- Use a UUID idempotency key generated in the browser and store only its hash.
- Use normalized email uniqueness to prevent duplicate applications.
- Never put raw applicant data in logs, analytics events, query strings, or page metadata.
- Do not expose `normalizedEmail`, submission hashes, private notes, or reviewer data in public responses.
- Keep public success responses minimal.
- Record the accepted privacy-notice version and timestamp.
- Treat the residential/contact Address as sensitive personal data, display it only in authenticated admin views, and exclude it from list views unless explicitly needed.
- Restrict exports, including exports containing Address, to authenticated administrators with an operational need for the data.
- Explain why the full Address is collected in the privacy notice and define and publish a retention period before launch.
- Avoid file uploads in version 1 to reduce security, privacy, mobile, and storage complexity.

## 13. Analytics and Operational Reporting

Use aggregate counts only. Do not send applicant answers or personal data to Vercel Analytics.

Useful aggregate reporting:

- total submissions;
- submissions by primary role;
- submissions by applicant category;
- submissions by experience level;
- submissions by event availability;
- count by admin review status;
- submission API success/failure rate; and
- confirmation-email success/failure rate.

A basic role/status summary can be added to the protected admin dashboard after the core list and detail workflow is complete.

## 14. Implementation Phases

### Phase 1 — Confirm Product Content

1. Confirm Conference 6.0 date, location, application deadline, and support email.
2. Approve the role and competency labels.
3. Approve the privacy notice, consent wording, and retention period.
4. Confirm whether a second/fallback role should remain optional, as recommended.
5. Confirm whether one submission per email is the final duplicate policy.
6. Approve page and email copy.

### Phase 2 — Data and Server Foundation

1. Add Prisma enums and the `VolunteerInterest` model.
2. Create and apply a Prisma migration.
3. Add shared constants, Zod schema, and inferred TypeScript types.
4. Add the dedicated rate limiter.
5. Implement `POST /api/volunteer-interests` with validation, size limiting, idempotency, duplicate protection, logging, and transactions.
6. Add the confirmation email template and sender function.
7. Add schema and Route Handler tests.

### Phase 3 — Public Form

1. Add the page and success route.
2. Add the React Query package/provider required by project guidelines.
3. Build the four semantic form sections.
4. Implement conditional fields and cross-field behavior.
5. Implement accessible error summary, inline errors, pending state, and retry behavior.
6. Add responsive styling and mobile QA.
7. Verify metadata, copy, privacy links, and success flow.

### Phase 4 — Admin Review and Export

1. Add protected admin list and detail APIs.
2. Add the admin navigation item.
3. Build list search, filters, pagination, loading, empty, and error states.
4. Build the detail view, status update, and private notes workflow.
5. Add CSV/Excel export with the active filters.
6. Optionally add aggregate role/status counts to the admin dashboard.

### Phase 5 — Quality Assurance and Launch

1. Test schema branches and all conditional fields.
2. Test new, duplicate, replayed, invalid, oversized, and rate-limited submissions.
3. Test confirmation email failure without losing the stored submission.
4. Test admin authorization, filters, status changes, notes, pagination, and exports.
5. Complete keyboard-only and screen-reader review.
6. Test at 320px, common mobile widths, tablet, and desktop.
7. Verify that logs, URLs, analytics, and error responses do not expose personal data.
8. Run `pnpm lint` and `pnpm build`.
9. Deploy to staging for stakeholder acceptance testing.
10. Apply the production migration, deploy, and monitor submissions and email delivery.

## 15. Test Matrix

### Schema Tests

- Every State/FCT is accepted and unknown State values are rejected.
- Every configured LGA is accepted only under its parent State.
- A State change clears a previously selected LGA in the UI.
- City and Address length boundaries are enforced.
- Every role is accepted.
- No primary role is rejected.
- Secondary role equal to primary role is rejected.
- “Other” role/category/competency requires its description.
- Hidden conditional values are rejected when their controlling choice is not active.
- Competency minimum, maximum, and duplicate rules work.
- Previous volunteering details branch correctly and remain optional when “Yes” is selected.
- Experience, motivation, availability, acknowledgement, and consent fields may all be omitted.
- Optional availability arrays accept no selections and enforce controlled unique values when supplied.
- Optional narrative and URL boundaries are enforced when values are supplied.
- Consent and acknowledgement accept false or omission and record timestamps only when selected.

### API Tests

- Valid submission creates one record.
- Invalid payload returns field errors and creates no record.
- Oversized or malformed JSON is rejected.
- Same idempotency key returns the original success.
- Same normalized email with a different key returns a duplicate response.
- Concurrent attempts do not create duplicate records.
- Rate-limited requests return `429`.
- Email failure leaves the saved record intact.
- Public responses do not expose internal or private fields.

### UI Tests

- All conditional fields appear and disappear correctly.
- Removed conditional fields are not submitted.
- Validation summary links/focus behavior reach invalid controls.
- Submit cannot be triggered repeatedly while pending.
- Server errors preserve applicant input.
- Success navigation contains no personal data.
- The form works with keyboard only.
- Labels, descriptions, errors, and grouped controls have correct accessible relationships.

### Admin Tests

- Unauthenticated users cannot access pages or APIs.
- Search and each filter return correct records.
- Pagination totals remain correct with active filters.
- Status and notes updates persist.
- Exports respect filters and contain readable labels.
- Export values cannot execute spreadsheet formulas.

## 16. Acceptance Criteria

The feature is complete when:

1. `/conf-6.0-interest-form` presents one public form with the four planned sections.
2. The primary role is required and includes all 15 requested choices.
3. The optional secondary role cannot duplicate the primary role.
4. “Other” selections reveal and require an appropriate description.
5. Applicant profile and competencies are captured, while experience, previous volunteering, motivation, contribution, availability, acknowledgement, and consent fields are available but optional.
6. Location is stored in separate State, LGA, City, and Address fields; State and LGA use dependent controlled dropdowns.
7. Controlled options and bounded narratives make responses easy to filter and review.
8. Client and server use the same strict Zod schema and State-to-LGA mapping.
9. A valid submission is persisted exactly once and produces a clear success experience.
10. Duplicate, replayed, malformed, oversized, and rate-limited requests are handled safely.
11. The applicant receives a confirmation email without email failure affecting persistence.
12. The form is usable on mobile, by keyboard, and with assistive technology.
13. Personal data is absent from URLs, analytics, routine logs, and public error responses.
14. Authenticated admins can search, filter by State/LGA and other criteria, inspect, update status/notes, and export interests.
15. CSV and Excel exports place State, LGA, City, and Address in separate columns, use readable labels, and neutralize spreadsheet formulas.
16. The privacy notice, retention period, event details, deadline, and support contact are approved before publication.
17. `pnpm lint` and `pnpm build` pass.

## 17. Decisions Required Before Implementation

1. What are the confirmed Conference 6.0 date and location?
2. What is the expression-of-interest deadline?
3. Which support email should appear on the form and confirmation email?
4. Who may review and export volunteer applicant data?
5. What is the applicant-data retention period?
6. Is one submission per normalized email the desired policy, or should applicants be allowed to replace an earlier submission?
7. Should confirmation emails be included at launch or immediately after the first release?
8. Is the recommended optional fallback role acceptable?

All other form and architecture decisions in this plan can proceed as the implementation baseline.