import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { UserData, AssessmentData, AppointmentDetails } from "@/types";

export interface AssessmentRecord {
  userId: string;
  userEmail: string;
  userName: string;
  personalInfo: UserData;
  assessmentData: AssessmentData;
  wantsTherapist: boolean | null;
  appointmentDetails: AppointmentDetails | null;
  createdAt: string;
  status: "completed" | "in-progress";
}

export const saveAssessment = async (
  userId: string,
  userEmail: string,
  userName: string,
  personalInfo: UserData,
  assessmentData: AssessmentData,
  wantsTherapist: boolean | null,
  appointmentDetails: AppointmentDetails | null
): Promise<string> => {
  try {
    const assessment: AssessmentRecord = {
      userId,
      userEmail,
      userName,
      personalInfo,
      assessmentData,
      wantsTherapist,
      appointmentDetails,
      createdAt: new Date().toISOString(),
      status: "completed",
    };

    const docRef = await addDoc(collection(db, "assessments"), assessment);
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message || "Failed to save assessment");
  }
};

export const getUserAssessments = async (
  userId: string
): Promise<AssessmentRecord[]> => {
  try {
    const assessmentsRef = collection(db, "assessments");
    return [];
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch assessments");
  }
};

export const saveUserPersonalInfo = async (
  userId: string,
  personalInfo: UserData
): Promise<void> => {
  try {
    await setDoc(doc(db, "users", userId, "personalInfo", "data"), {
      ...personalInfo,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    throw new Error(error.message || "Failed to save personal info");
  }
};

export const getUserPersonalInfo = async (
  userId: string
): Promise<UserData | null> => {
  try {
    const docRef = doc(db, "users", userId, "personalInfo", "data");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserData;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch personal info");
  }
};
