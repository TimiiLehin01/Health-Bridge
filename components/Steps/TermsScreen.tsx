import React, { useState } from "react";

interface TermsScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function TermsScreen({ onNext, onBack }: TermsScreenProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Terms of Use, Privacy & Legal Notice
      </h2>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-3">
              Our Purpose
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Health Bridge serves to connect users experiencing mental health
              challenges, including depression, with well-trained, licensed
              medical therapists for evaluation, appropriate help, and care. We
              promote empathy, inclusivity, and a safer environment for all.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-3">
              Eligibility & Consent
            </h3>
            <p className="text-gray-700 mb-3">
              This website should only be used willingly and without force. By
              proceeding, you confirm that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>You are between 18-60 years of age</li>
              <li>You are of cognizant mind and proper thinking</li>
              <li>You have sole decisiveness over your thoughts</li>
              <li>
                You will answer questions accurately after understanding them
              </li>
              <li>You are proceeding without external pressure or coaxing</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-3">
              Privacy Notice
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We will collect some personal information to direct you to the
              right sources for help. Your information will be used solely for
              connecting you with appropriate mental health resources and will
              never be used for malicious purposes or ill intent. We are
              committed to protecting your privacy and confidentiality.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-3">
              Legal Notice
            </h3>
            <p className="text-gray-700 leading-relaxed">
              This service is provided to support your mental health journey. By
              using Health Bridge, you agree to these terms and acknowledge that
              this platform is designed to facilitate access to professional
              mental health care.
            </p>
          </div>
        </div>

        <div className="border-t pt-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
            />
            <span className="text-gray-700 leading-relaxed">
              I have read and accept the Terms of Use, Privacy Notice, and Legal
              Notice. I confirm that I meet the eligibility requirements and am
              proceeding willingly.
            </span>
          </label>
        </div>
      </div>

      <div className="flex gap-4 justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!termsAccepted}
          className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          I Accept, Continue
        </button>
      </div>
    </div>
  );
}
