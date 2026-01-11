"use client";

import React, { useState } from "react";
import { User, UserData, AssessmentData, AppointmentDetails } from "@/types";
import { logoutUser } from "@/lib/authService";
import { saveAssessment } from "@/lib/assessmentService";
import AuthenticationScreen from "@/components/Auth/AuthenticationScreen";
import ProgressBar from "@/components/Layout/ProgressBar";
import WelcomeScreen from "@/components/Steps/WelcomeScreen";
import TermsScreen from "@/components/Steps/TermsScreen";
import PersonalInfoScreen from "@/components/Steps/PersonalInfoScreen";
import SectionAScreen from "@/components/Steps/SectionAScreen";
import SectionBScreen from "@/components/Steps/SectionBScreen";
import SectionCScreen from "@/components/Steps/SectionCScreen";
import SummaryScreen from "@/components/Steps/SummaryScreen";
import TherapistBookingScreen from "@/components/Steps/TherapistBookingScreen";
import CompleteScreen from "@/components/Steps/CompleteScreen";

export default function HealthBridgeApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const [userData, setUserData] = useState<UserData>({
    age: "",
    sex: "",
    state: "",
    town: "",
    address: "",
    religion: "",
    ethnicGroup: "",
    employment: "",
  });

  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    initialMood: "",
    sectionA: Array(8).fill(""),
    sectionB: Array(7).fill(""),
    sectionC: Array(6).fill(""),
    openEnded: "",
  });

  const [wantsTherapist, setWantsTherapist] = useState<boolean | null>(null);
  const [paymentAccepted, setPaymentAccepted] = useState(false);
  const [appointmentDetails, setAppointmentDetails] =
    useState<AppointmentDetails | null>(null);

  const handleLogin = (email: string, name: string, uid: string) => {
    const user: User = {
      uid,
      email,
      name,
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleSignup = (email: string, name: string, uid: string) => {
    const user: User = {
      uid,
      email,
      name,
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      setIsAuthenticated(false);
      setCurrentStep(0);
      setUserData({
        age: "",
        sex: "",
        state: "",
        town: "",
        address: "",
        religion: "",
        ethnicGroup: "",
        employment: "",
      });
      setAssessmentData({
        initialMood: "",
        sectionA: Array(8).fill(""),
        sectionB: Array(7).fill(""),
        sectionC: Array(6).fill(""),
        openEnded: "",
      });
      setWantsTherapist(null);
      setPaymentAccepted(false);
      setAppointmentDetails(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleCompleteAssessment = async () => {
    if (!currentUser) return;

    try {
      await saveAssessment(
        currentUser.uid,
        currentUser.email,
        currentUser.name,
        userData,
        assessmentData,
        wantsTherapist,
        appointmentDetails
      );
      console.log("Assessment saved successfully");
    } catch (error) {
      console.error("Error saving assessment:", error);
    }
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <AuthenticationScreen onLogin={handleLogin} onSignup={handleSignup} />
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeScreen
            userName={currentUser.name}
            onNext={() => setCurrentStep(1)}
          />
        );
      case 1:
        return (
          <TermsScreen
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        );
      case 2:
        return (
          <PersonalInfoScreen
            userData={userData}
            setUserData={setUserData}
            userName={currentUser.name}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <SectionAScreen
            userName={currentUser.name}
            assessmentData={assessmentData}
            setAssessmentData={setAssessmentData}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <SectionBScreen
            assessmentData={assessmentData}
            setAssessmentData={setAssessmentData}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        );
      case 5:
        return (
          <SectionCScreen
            assessmentData={assessmentData}
            setAssessmentData={setAssessmentData}
            onNext={() => setCurrentStep(6)}
            onBack={() => setCurrentStep(4)}
          />
        );
      case 6:
        return (
          <SummaryScreen
            userName={currentUser.name}
            onYes={() => {
              setWantsTherapist(true);
              setCurrentStep(7);
            }}
            onNo={() => {
              setWantsTherapist(false);
              setCurrentStep(7);
            }}
          />
        );
      case 7:
        return (
          <TherapistBookingScreen
            userName={currentUser.name}
            userEmail={currentUser.email}
            wantsTherapist={wantsTherapist}
            paymentAccepted={paymentAccepted}
            setPaymentAccepted={setPaymentAccepted}
            setAppointmentDetails={setAppointmentDetails}
            onNext={() => {
              handleCompleteAssessment();
              setCurrentStep(8);
            }}
          />
        );
      case 8:
        return (
          <CompleteScreen
            userName={currentUser.name}
            wantsTherapist={wantsTherapist}
            appointmentDetails={appointmentDetails}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {currentStep > 0 && currentStep < 8 && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={8}
          userName={currentUser.name}
        />
      )}
      <div className="py-8">{renderStep()}</div>
    </div>
  );
}
