"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
  competition: "dare_nigeria" | "sme_pitch";
}

export default function TermsModal({
  isOpen,
  onAccept,
  onCancel,
  competition,
}: TermsModalProps) {
  const [agreed, setAgreed] = useState(false);

  const competitionLabel =
    competition === "dare_nigeria"
      ? "DARE Nigeria Challenge 2026"
      : "SME Pitch Competition 2026";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col font-epilogue">
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Participant Terms & Conditions
            </h2>
            <p className="text-sm text-gray-500 mt-1">{competitionLabel}</p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <p className="text-sm text-gray-600 italic">
            By submitting my application to the {competitionLabel}, I confirm
            that I have read, fully understand and agree to the following terms
            and conditions, and I agree to be bound by them throughout all
            stages of the Programme.
          </p>

          <div className="space-y-5">
            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                1. Eligibility
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I confirm that I am an adult between the age 18 and 35
                  operating a business in Nigeria.
                </li>
                <li>
                  I confirm that I have not previously won the{" "}
                  {competition === "dare_nigeria"
                    ? "DARE NIGERIA"
                    : "SME Pitch"}{" "}
                  competition and am therefore not barred from applying.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                2. Conference Ticket
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I confirm that I have purchased my NGM Conference 5.0 ticket
                  to attend the Conference and have uploaded proof of purchase
                  with this application.
                </li>
                <li>
                  I understand that failure to provide proof will result in my
                  application not being processed.
                </li>
                <li>
                  I also understand that purchasing the NGM Conference 5.0
                  ticket only confirms my attendance and does not in any way
                  guarantee my progression to subsequent stages of the
                  Challenge.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                3. Single Application Requirement
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I acknowledge that I can only submit one business entry.
                </li>
                <li>
                  I understand that submitting more than one business entry will
                  result in all my entries being disqualified without further
                  review.
                </li>
                <li>
                  I understand that where I submit more than one business entry,
                  by myself or through multiple partners, my application will be
                  disqualified.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                4. Information Accuracy
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I confirm that all information provided in this application is
                  truthful, accurate, and complete.
                </li>
                <li>
                  I understand that NGM will verify submissions, and I accept
                  that providing false or misleading information at any stage,
                  including after winning, will result in immediate
                  disqualification and, where applicable, the full repayment of
                  any grant funds I have received.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                5. Ineligible Businesses
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I confirm that my business is not involved in any of the
                  following ineligible businesses: gambling and sports betting,
                  alcohol, tobacco, adult entertainment, pyramid or Ponzi
                  schemes, and any business involved in active legal
                  proceedings.
                </li>
                <li>
                  I also confirm that my business does not conflict with
                  NGM&apos;s values, and where it does, my application will be
                  disqualified.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                6. Conflict of Interest Declaration
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I confirm that I have disclosed in this application any
                  personal or professional relationship I have with any of the{" "}
                  {competition === "dare_nigeria"
                    ? "DARE NIGERIA"
                    : "SME Pitch"}{" "}
                  Challenge judges, panellists, or Programme Partners.
                </li>
                <li>
                  I understand that failing to declare such a conflict
                  automatically leads to the disqualification of my application.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                7. Selection Process
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I understand that the selection process comprises four stages:
                </li>
                <li>Stage 1 (April–May): Application screening</li>
                <li>Stage 2 (May–June): Desk review by judges</li>
                <li>Stage 3 (July–August): Bootcamp and semi-final pitch</li>
                <li>
                  Stage 4 (October): Live pitch at the NGM Annual Conference,
                  where 4 winners are announced.
                </li>
                <li>
                  I confirm that I will make myself available for every stage I
                  am selected to participate in.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">                8. Judging</h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I acknowledge that applications are scored by an independent
                  Judging Panel using a published scoring rubric.
                </li>
                <li>
                  I accept that all decisions at every stage are final and that
                  NGM does not negotiate, discuss, or reverse judging outcomes.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">                9. The Prize</h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I understand that four winners will each receive direct cash
                  funding, plus comprehensive ecosystem support, including
                  bootcamp participation, structured mentorship, and community
                  access.
                </li>
                <li>
                  I acknowledge that the cash grant is not a loan and does not
                  need to be repaid, provided all post-award conditions are met
                  before the disbursement of the funds.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                10. Grant Disbursement
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I acknowledge that, if I am one of the selected winners, the
                  grant will not be paid as a lump sum.
                </li>
                <li>
                  I understand that the grant is released in three tranches
                  linked to milestones as follows:
                </li>
                <li>40% upon execution of the Memorandum of Agreement</li>
                <li>
                  40% after six (6) months, subject to submission of a
                  satisfactory progress report, and
                </li>
                <li>
                  20% after twelve (12) months, subject to submission of a
                  12-month report.
                </li>
                <li>
                  I accept that failure to meet a milestone will result in
                  suspension of subsequent payments until the requirement is
                  met.
                </li>
                <li>
                  I further acknowledge that disbursement of the grant funds
                  will not occur immediately upon being declared a winner and
                  may take up to three (3) months, subject to internal processes
                  and administrative requirements.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                11. Reporting Obligations
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I agree to submit required progress reports at six months and
                  twelve months, including evidence of how the grant funds have
                  been used e.g. statement of affairs.
                </li>
                <li>
                  I understand that these reports are required to receive
                  subsequent payments.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                12. Use of Funds
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I agree to use the grant funds strictly for the business
                  purpose stated in my application and Memorandum of Agreement.
                </li>
                <li>
                  I understand that using funds for personal expenses,
                  transferring them to unrelated accounts, or applying them to a
                  different purpose without approval constitutes misuse and may
                  result in a demand for full repayment and potential legal
                  action being taken against me.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                13. Business Ownership
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I acknowledge that participating in and winning the grant does
                  not give NGM, Afropreneur, or Verraki any ownership, equity
                  stake, or rights in my business, and that I retain full
                  ownership of my intellectual property.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                14. Publicity
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I consent to NGM using my name, photograph, and business
                  details for the NGM-related communications, including social
                  media, press releases, and reports.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                15. Data Protection
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I acknowledge that my personal data will be used solely for
                  NGM-related activities, and may be shared with Afropreneur and
                  Verraki for this purpose.
                </li>
                <li>
                  I understand that my data will not be sold and that I may
                  request access to or correction of my data by contacting the
                  Programmes Team.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                16. Mentorship
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I understand that, if selected as a winner, I will be assigned
                  mentors from the NGM network for a period of 12 months.
                </li>
                <li>
                  I agree to actively engage with my mentors and understand that
                  mentorship is a required component of the Programme.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                17. Programme Changes
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I acknowledge that NGM reserves the right to amend these
                  terms, modify the Programme structure, or cancel the Programme
                  entirely, including in response to funding changes, force
                  majeure events, or governance decisions.
                </li>
                <li>
                  I agree that NGM will not be liable to applicants for costs or
                  losses arising from such changes.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">                18. Disputes</h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I agree that any concerns about the administration of the
                  Programme will be submitted in writing to the Programmes Team
                  and, if unresolved, referred to the Steering Committee, whose
                  decision is final.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                19. Acceptance
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I confirm that by submitting this application, I have read,
                  understood, and agree to be bound by these terms in full.
                </li>
                <li>
                  I understand that, if selected as a winner, I will be required
                  to sign a formal Memorandum of Agreement before receiving any
                  funds, which will set out my specific milestones and
                  obligations in detail.
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
            />
            <span className="text-sm text-gray-700">
              I have read, fully understand, and agree to the above Terms and
              Conditions.
            </span>
          </label>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onAccept}
              disabled={!agreed}
              className={cn(
                "px-6 py-2.5 text-sm font-medium rounded-lg transition-colors",
                agreed
                  ? "bg-[#16a34a] hover:bg-[#15803d] text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed",
              )}
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
