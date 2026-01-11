import React from "react";
import { Heart, CheckCircle } from "lucide-react";

interface SummaryScreenProps {
  userName: string;
  onYes: () => void;
  onNo: () => void;
}

export default function SummaryScreen({
  userName,
  onYes,
  onNo,
}: SummaryScreenProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 space-y-6">
      <div className="text-center mb-8">
        <Heart className="w-16 h-16 text-teal-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You for Sharing
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Thank you for sharing your feelings with us. We empathize with you.
          You are not alone. Health Bridge is dedicated to aiding you in your
          journey to full emotional healthiness and recovery.
        </p>
        <p className="text-xl font-semibold text-teal-700 mt-4">
          You are not alone, {userName}.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Would you like to see a therapist?
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={onYes}
            className="p-6 rounded-lg border-2 border-teal-600 bg-teal-50 hover:bg-teal-100 transition-colors"
          >
            <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="font-semibold text-lg text-gray-900">
              Yes, I would
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Connect me with a professional
            </div>
          </button>

          <button
            onClick={onNo}
            className="p-6 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <div className="font-semibold text-lg text-gray-900">
              Not right now
            </div>
            <div className="text-sm text-gray-600 mt-2">
              I need more time to decide
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
