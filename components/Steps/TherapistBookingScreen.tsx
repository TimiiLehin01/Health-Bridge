import React, { useState } from "react";
import {
  Heart,
  Calendar,
  MapPin,
  CheckCircle,
  Phone,
  Mail,
  X,
  CreditCard,
} from "lucide-react";
import { AppointmentDetails } from "@/types";

interface TherapistBookingScreenProps {
  userName: string;
  userEmail: string;
  wantsTherapist: boolean | null;
  paymentAccepted: boolean;
  setPaymentAccepted: (value: boolean) => void;
  setAppointmentDetails: (details: AppointmentDetails) => void;
  onNext: () => void;
}

export default function TherapistBookingScreen({
  userName,
  userEmail,
  wantsTherapist,
  paymentAccepted,
  setPaymentAccepted,
  setAppointmentDetails,
  onNext,
}: TherapistBookingScreenProps) {
  const [reason, setReason] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDemoPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const appointmentDate = new Date();
      appointmentDate.setDate(appointmentDate.getDate() + 10);

      const therapists = [
        "Dr. Adebayo Okonkwo",
        "Dr. Chioma Nwosu",
        "Dr. Babatunde Adeleke",
        "Dr. Aisha Mohammed",
        "Dr. Olufemi Taiwo",
        "Dr. Ngozi Eze",
        "Dr. Chukwuma Okeke",
      ];

      const hospitals = [
        "UNIMEDTH",
        "UNIMEDTH",
        "UNIMEDTH",
        "UNIMEDTH",
        "UNIMEDTH",
        "UNIMEDTH",
        "UNIMEDTH",
      ];

      const times = [
        "9:00 AM",
        "10:00 AM",
        "11:30 AM",
        "2:00 PM",
        "3:30 PM",
        "4:00 PM",
      ];

      const randomTherapist =
        therapists[Math.floor(Math.random() * therapists.length)];
      const randomHospital =
        hospitals[Math.floor(Math.random() * hospitals.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];

      const appointment: AppointmentDetails = {
        psychologist: randomTherapist,
        hospital: randomHospital,
        date: appointmentDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: randomTime,
      };

      setAppointmentDetails(appointment);
      setPaymentAccepted(true);
      setShowPaymentModal(false);
      setIsProcessing(false);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\s/g, "");
    const formatted = numbers.match(/.{1,4}/g);
    return formatted ? formatted.join(" ") : numbers;
  };

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + "/" + numbers.slice(2, 4);
    }
    return numbers;
  };

  if (wantsTherapist === false) {
    return (
      <div className="max-w-3xl mx-auto px-6 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            We Understand
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          {!reason ? (
            <>
              <p className="text-gray-700 leading-relaxed">
                We understand that taking this step requires time and readiness,{" "}
                {userName}. Please share with us what's holding you back:
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setReason("not-ready")}
                  className="w-full p-4 rounded-lg border-2 border-gray-300 hover:border-teal-500 hover:bg-teal-50 transition-colors text-left"
                >
                  <div className="font-semibold text-gray-900">
                    I do not feel ready, yet.
                  </div>
                </button>

                <button
                  onClick={() => setReason("no-funds")}
                  className="w-full p-4 rounded-lg border-2 border-gray-300 hover:border-teal-500 hover:bg-teal-50 transition-colors text-left"
                >
                  <div className="font-semibold text-gray-900">
                    I don't have the funds.
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center space-y-4">
                <Heart className="w-12 h-12 text-teal-600 mx-auto" />
                <h3 className="text-2xl font-semibold text-gray-900">
                  We're Here For You
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {reason === "not-ready"
                    ? `We understand, ${userName}. Taking the first step can be challenging, and we respect your timeline. We're here for you whenever you feel ready.`
                    : `We understand your concern about cost, ${userName}. We're committed to making mental health care accessible and will work with you to find solutions.`}
                </p>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg space-y-4">
                <h4 className="font-semibold text-gray-900">
                  Support Resources
                </h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Helpline: +234-800-HEALTH (432584)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Crisis Line: +234-800-CRISIS (274747)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Email: support@healthbridge.ng</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onNext}
                className="w-full bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                Complete Assessment
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!paymentAccepted) {
    return (
      <>
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Therapist Consultation
            </h2>
            <p className="text-gray-600">
              We're glad you're taking this step, {userName}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                N15,000
              </div>
              <div className="text-gray-600">Per consultation session</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <h4 className="font-semibold text-gray-900">What's Included:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>
                    60-minute one-on-one session with a licensed therapist
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Personalized assessment and treatment recommendations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Follow-up care plan and resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Confidential and professional environment</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Demo Mode:</strong> This is a simulated payment. No real
                money will be charged. Use any test card details to proceed.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowPaymentModal(true)}
                className="flex-1 bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Payment
              </button>
              <button
                onClick={onNext}
                className="px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors border border-gray-300"
              >
                Decline
              </button>
            </div>
          </div>
        </div>

        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Complete Payment
                    </h3>
                    <p className="text-sm text-gray-600">
                      Secure payment powered by Demo Gateway
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleDemoPayment} className="p-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Amount to pay:</span>
                    <span className="text-2xl font-bold text-gray-900">
                      N15,000
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Email: {userEmail}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={paymentForm.cardNumber}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      if (formatted.replace(/\s/g, "").length <= 16) {
                        setPaymentForm({
                          ...paymentForm,
                          cardNumber: formatted,
                        });
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use: 4084 0840 8408 4081 (Test Card)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={paymentForm.expiryDate}
                      onChange={(e) => {
                        const formatted = formatExpiryDate(e.target.value);
                        if (formatted.length <= 5) {
                          setPaymentForm({
                            ...paymentForm,
                            expiryDate: formatted,
                          });
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800"
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={paymentForm.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 3) {
                          setPaymentForm({ ...paymentForm, cvv: value });
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={paymentForm.cardName}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        cardName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    This is a demo payment. No real transaction will occur. Any
                    card details will work.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    `Pay N15,000`
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
              </form>

              <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-center gap-2 text-xs text-gray-600">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                Secured by Health Bridge Demo Gateway
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const appointmentDate = new Date();
  appointmentDate.setDate(appointmentDate.getDate() + 10);

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-6">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600">Your appointment has been scheduled</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Appointment Details
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-gray-900">Date & Time</div>
              <div className="text-gray-700">
                Scheduled for{" "}
                {appointmentDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-sm text-gray-600">
                Time will be confirmed via email
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <MapPin className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-gray-900">Location</div>
              <div className="text-gray-700">
                Location details sent to your email
              </div>
              <div className="text-sm text-gray-600">Lagos, Nigeria</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Heart className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-gray-900">Your Therapist</div>
              <div className="text-gray-700">
                Professional therapist assigned
              </div>
              <div className="text-sm text-gray-600">
                Licensed Clinical Psychologist
              </div>
            </div>
          </div>
        </div>

        <div className="bg-teal-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            A confirmation email has been sent to your registered email address
            with all the details and preparation instructions for your session.
          </p>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
        >
          Complete
        </button>
      </div>
    </div>
  );
}
