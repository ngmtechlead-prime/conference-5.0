"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

export default function TermsModal({ isOpen, onAccept, onCancel }: TermsModalProps) {
  const [agreed, setAgreed] = useState(false);

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
            <p className="text-sm text-gray-500 mt-1">
              DARE Nigeria Challenge 2026
            </p>
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
            By submitting my application to the DARE Nigeria Challenge 2026, I confirm that I have read, fully
            understand and agree to the following terms and conditions, and I agree to be bound by them
            throughout all stages of the Programme.
          </p>

          <div className="space-y-5">
            <section>
              <h3 className="font-semibold text-gray-900 mb-2">1. Eligibility</h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I confirm that I am an adult between the age 18 and 35 operating a business in Nigeria.
                </li>
                <li>
                  I confirm that I have not previously won the NGM SME competition and am therefore not barred
                  from applying.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">2. Membership Requirement</h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I confirm that I am an active NGM member, and my active membership is required to advance past
                  the semi-final stage.
                </li>
                <li>
                  If I am not yet a member, I understand I may apply for membership concurrently with this
                  application, but I must achieve active membership status before I am permitted to proceed to the
                  semi-final.
                </li>
                <li>
                  I accept that failure to do so will result in my disqualification from the Programme.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">3. Conference Ticket</h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I confirm that I have purchased my NGM Conference 5.0 ticket and have uploaded proof of
                  purchase with this application.
                </li>
                <li>
                  I understand that failure to provide proof will result in my application not being processed.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">4. Single Application Requirement</h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>
                  I acknowledge that I can only submit one business entry.
                </li>
                <li>
                  I understand that submitting more than one business entry will result in all my entries being
                  disqualified.
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
              I have read, fully understand, and agree to the above Terms and Conditions.
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
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
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
