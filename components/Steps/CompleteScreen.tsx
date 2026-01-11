import React from "react";
import { Heart, Phone, Mail, Calendar, MapPin, User } from "lucide-react";
import { AppointmentDetails } from "@/types";

interface CompleteScreenProps {
  userName: string;
  wantsTherapist: boolean | null;
  appointmentDetails: AppointmentDetails | null;
  onLogout: () => void;
}

export default function CompleteScreen({
  userName,
  wantsTherapist,
  appointmentDetails,
  onLogout,
}: CompleteScreenProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 space-y-6">
      <div className="text-center mb-8">
        <Heart className="w-20 h-20 text-teal-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Thank You, {userName}
        </h1>
        <p className="text-xl text-gray-600">
          {wantsTherapist && appointmentDetails
            ? "Your journey to wellness begins soon"
            : "Remember, we're here whenever you're ready"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        {wantsTherapist && appointmentDetails ? (
          <>
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">
              Your Appointment is Confirmed
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg">
                <Calendar className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">Date & Time</div>
                  <div className="text-gray-700">
                    {appointmentDetails.date} at {appointmentDetails.time}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg">
                <MapPin className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">Location</div>
                  <div className="text-gray-700">
                    {appointmentDetails.hospital}
                  </div>
                  <div className="text-sm text-gray-600">Lagos, Nigeria</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg">
                <User className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">
                    Your Therapist
                  </div>
                  <div className="text-gray-700">
                    {appointmentDetails.psychologist}
                  </div>
                  <div className="text-sm text-gray-600">
                    Licensed Clinical Psychologist
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-center leading-relaxed bg-gray-50 p-4 rounded-lg">
              We look forward to supporting you on your journey to emotional
              wellness.
              {appointmentDetails.psychologist} will meet with you on{" "}
              {appointmentDetails.date} at {appointmentDetails.time}.
            </p>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm text-blue-800 text-center">
                A confirmation email with detailed instructions has been sent to
                your registered email address.
              </p>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-gray-900 text-center">
              You've Taken an Important Step
            </h3>
            <p className="text-gray-700 text-center leading-relaxed">
              Completing this assessment shows courage and self-awareness.
              Remember that seeking help is a sign of strength, and we're here
              to support you whenever you're ready to take the next step.
            </p>
          </>
        )}

        <div className="bg-teal-50 p-6 rounded-lg space-y-4">
          <h4 className="font-semibold text-gray-900 text-center">
            Need Support? Contact Us Anytime
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-teal-600" />
              <span className="font-medium">+234-815-594-9999</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-teal-600" />
              <span className="font-medium">
                Crisis Line: +234-907-223-5268
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-teal-600" />
              <span className="font-medium">support@healthbridge.ng</span>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 pt-4">
          <p className="text-gray-600">
            You are not alone, {userName}. Health Bridge is always here for you.
          </p>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                onLogout();
              }
            }}
            className="text-teal-600 font-semibold hover:text-teal-700 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    </div>
  );
}
