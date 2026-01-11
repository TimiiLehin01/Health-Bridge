import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  userName: string;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  userName,
}: ProgressBarProps) {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold text-gray-700">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="text-sm text-gray-600">Logged in as {userName}</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
