import React, { useState } from "react";
import { AssessmentData } from "@/types";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface SectionAScreenProps {
  userName: string;
  assessmentData: AssessmentData;
  setAssessmentData: (data: AssessmentData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SectionAScreen({
  userName,
  assessmentData,
  setAssessmentData,
  onNext,
  onBack,
}: SectionAScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    "Over the past couple of weeks, how often have you noticed feeling sad, low or down and emotionally heavy?",
    "How often have you found that the things you usually enjoy don't feel as pleasurable or meaningful lately?",
    "How often do your thoughts tend to drift towards feelings of hopelessness, discouragement, or pessimism about the future?",
    "How often have you felt irritated, frustrated, emotionally numb, or disconnected from yourself or others?",
    "How often do you feel mentally drained from just thinking, or exhausted even when you haven't done much?",
    "How often do you find yourself being self-critical, or feeling like you are not doing enough or being enough?",
    "How often have you struggled to start or finish activities such as self-care, school, work, or household tasks?",
    "How often have your moods and worries made it harder to complete your daily routines?",
  ];

  const scaleLabels = [
    "Not at all",
    "Several days",
    "More than half the days",
    "Nearly every time",
  ];

  const totalQuestions = questions.length + 1;
  const isInitialMood = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  const canProceed = () => {
    if (isInitialMood) {
      return assessmentData.initialMood !== "";
    }
    return assessmentData.sectionA[currentQuestion - 1] !== "";
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
          Section A: Mood and Emotions
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {isInitialMood
            ? `I am going to ask you a few questions about how you have been feeling emotionally, ${userName}. Take your time, please. There are no right or wrong answers.`
            : "Please answer honestly based on your recent experiences."}
        </p>
        <div className="mt-4 text-sm text-gray-500">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>

        {isInitialMood ? (
          <div>
            <label className="block text-xl font-semibold text-gray-800 mb-6 text-center">
              {userName}, how are you feeling today?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {["Tired", "Just there", "Quite alright", "Great!"].map(
                (mood) => (
                  <button
                    key={mood}
                    onClick={() =>
                      setAssessmentData({
                        ...assessmentData,
                        initialMood: mood,
                      })
                    }
                    className={`p-6 rounded-lg border-2 transition-all ${
                      assessmentData.initialMood === mood
                        ? "border-teal-600 bg-teal-50 text-teal-900 font-semibold shadow-md"
                        : "border-gray-300 bg-white text-gray-800 hover:border-teal-400 hover:bg-teal-50 hover:shadow"
                    }`}
                  >
                    <div className="text-lg font-medium">{mood}</div>
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-teal-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700 text-center">
                <span className="font-semibold">Scale:</span> 1 = Not at all, 2
                = Several days, 3 = More than half the days, 4 = Nearly every
                time
              </p>
            </div>

            <label className="block text-xl text-gray-800 mb-6 leading-relaxed text-center">
              {questions[currentQuestion - 1]}
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {scaleLabels.map((label, value) => (
                <button
                  key={value}
                  onClick={() => {
                    const newSectionA = [...assessmentData.sectionA];
                    newSectionA[currentQuestion - 1] = String(value + 1);
                    setAssessmentData({
                      ...assessmentData,
                      sectionA: newSectionA,
                    });
                  }}
                  className={`p-5 rounded-lg border-2 transition-all ${
                    assessmentData.sectionA[currentQuestion - 1] ===
                    String(value + 1)
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
        )}
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
          {isLastQuestion ? "Continue to Section B" : "Next Question"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
