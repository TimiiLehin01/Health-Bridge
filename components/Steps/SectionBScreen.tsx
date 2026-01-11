import React, { useState } from "react";
import { AssessmentData } from "@/types";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface SectionBScreenProps {
  assessmentData: AssessmentData;
  setAssessmentData: (data: AssessmentData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SectionBScreen({
  assessmentData,
  setAssessmentData,
  onNext,
  onBack,
}: SectionBScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    "How often have you felt tired or had low energy even after resting?",
    "How often have you experienced difficulty falling asleep?",
    "Have you found it difficult to stay asleep when you do manage to fall asleep?",
    "When you fall asleep, would you say that you oversleep?",
    "How often have you noticed changes in your appetite or eating habits?",
    "Have you had trouble concentrating on your tasks? Tasks like reading, cooking, drawing, writing and the likes?",
    "Have you noticed having trouble remembering things and making decisions, often feeling overwhelmed as a result?",
  ];

  const scaleLabels = ["Never", "Sometimes", "Most times", "Always"];

  const isLastQuestion = currentQuestion === questions.length - 1;

  const canProceed = () => {
    return assessmentData.sectionB[currentQuestion] !== "";
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onNext();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion === 0) {
      onBack();
    } else {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Section B: Energy, Sleep Quality and Physical Symptoms
        </h2>
        <p className="text-gray-600">Over the past 3 weeks</p>
        <div className="mt-4 text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div className="bg-teal-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-semibold">Scale:</span> 1 = Never, 2 =
            Sometimes, 3 = Most times, 4 = Always
          </p>
        </div>

        <label className="block text-xl text-gray-800 mb-6 leading-relaxed text-center">
          {questions[currentQuestion]}
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {scaleLabels.map((label, value) => (
            <button
              key={value}
              onClick={() => {
                const newSectionB = [...assessmentData.sectionB];
                newSectionB[currentQuestion] = String(value + 1);
                setAssessmentData({ ...assessmentData, sectionB: newSectionB });
              }}
              className={`p-5 rounded-lg border-2 transition-all ${
                assessmentData.sectionB[currentQuestion] === String(value + 1)
                  ? "border-teal-600 bg-teal-50 text-teal-900 font-semibold shadow-md"
                  : "border-gray-300 bg-white text-gray-800 hover:border-teal-400 hover:bg-teal-50 hover:shadow"
              }`}
            >
              <div className="font-bold text-2xl mb-2">{value + 1}</div>
              <div className="text-sm font-medium">{label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {isLastQuestion ? "Continue to Section C" : "Next Question"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
