import React, { useState } from "react";
import { Heart, LogIn, UserPlus } from "lucide-react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Image from "next/image";

interface AuthenticationScreenProps {
  onLogin: (email: string, name: string, uid: string) => void;
  onSignup: (email: string, name: string, uid: string) => void;
}

export default function AuthenticationScreen({
  onLogin,
  onSignup,
}: AuthenticationScreenProps) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <Image
              src="/logo.png"
              alt="Health Bridge Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Health Bridge
          </h1>
          <p className="text-gray-600">Your path to mental wellness</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setShowLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                showLogin
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <LogIn className="w-4 h-4 inline mr-2" />
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                !showLogin
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              Sign Up
            </button>
          </div>

          {showLogin ? (
            <>
              <LoginForm onLogin={onLogin} />
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <button
                  onClick={() => setShowLogin(false)}
                  className="text-teal-600 font-semibold hover:text-teal-700"
                >
                  Sign up here
                </button>
              </p>
            </>
          ) : (
            <SignupForm onSignup={onSignup} />
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Your information is protected and confidential
        </p>
      </div>
    </div>
  );
}
