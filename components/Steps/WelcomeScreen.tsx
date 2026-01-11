import React from "react";
import { Heart, ArrowRight } from "lucide-react";
import Image from "next/image";

interface WelcomeScreenProps {
  userName: string;
  onNext: () => void;
}

export default function WelcomeScreen({
  userName,
  onNext,
}: WelcomeScreenProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
      <div className="w-32 h-32 mx-auto mb-4 relative">
        <Image
          src="/logo.png"
          alt="Health Bridge Logo"
          width={128}
          height={128}
          className="object-contain"
        />
      </div>
      <div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome, {userName}
        </h1>
        <p className="text-xl text-gray-600">
          We're here to support your mental wellness journey
        </p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Confidential Assessment
        </h2>
        <p className="text-gray-600 leading-relaxed">
          This brief assessment will help us understand your current mental
          health needs and connect you with licensed professionals who can
          provide the support and care you deserve.
        </p>
      </div>
      <button
        onClick={onNext}
        className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors shadow-md inline-flex items-center gap-2"
      >
        Begin Assessment
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
