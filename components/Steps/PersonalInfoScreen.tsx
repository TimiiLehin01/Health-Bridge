import React from "react";
import { UserData } from "@/types";

interface PersonalInfoScreenProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
  userName: string;
  onNext: () => void;
  onBack: () => void;
}

export default function PersonalInfoScreen({
  userData,
  setUserData,
  userName,
  onNext,
  onBack,
}: PersonalInfoScreenProps) {
  const employmentOptions = [
    "Student",
    "Unemployed",
    "Self-employed",
    "Employed (Private Sector)",
    "Skilled Trade",
    "Civil Servant",
    "NYSC",
    "Retired",
    "Homemaker/Housewife",
  ];

  const canProceed =
    userData.age &&
    userData.sex &&
    userData.state &&
    userData.town &&
    userData.employment;

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600">
          Hello {userName}, please provide some basic information
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              value={userData.age}
              onChange={(e) =>
                setUserData({ ...userData, age: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your age"
              min="18"
              max="60"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sex
            </label>
            <select
              value={userData.sex}
              onChange={(e) =>
                setUserData({ ...userData, sex: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State of Residence
            </label>
            <input
              type="text"
              value={userData.state}
              onChange={(e) =>
                setUserData({ ...userData, state: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your state"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Town of Residence
            </label>
            <input
              type="text"
              value={userData.town}
              onChange={(e) =>
                setUserData({ ...userData, town: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your town"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address (Optional)
            </label>
            <input
              type="text"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your address"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Religion (Optional)
            </label>
            <input
              type="text"
              value={userData.religion}
              onChange={(e) =>
                setUserData({ ...userData, religion: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your religion"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ethnic Group (Optional)
            </label>
            <input
              type="text"
              value={userData.ethnicGroup}
              onChange={(e) =>
                setUserData({ ...userData, ethnicGroup: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your ethnic group"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Employment Status
            </label>
            <select
              value={userData.employment}
              onChange={(e) =>
                setUserData({ ...userData, employment: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select employment status</option>
              {employmentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
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
          disabled={!canProceed}
          className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
