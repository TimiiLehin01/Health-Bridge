import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  createdAt: string;
}

export const signUpUser = async (
  name: string,
  email: string,
  password: string
): Promise<UserProfile> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || email,
      name: name,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", user.uid), userProfile);

    return userProfile;
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign up");
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<UserProfile> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    } else {
      return {
        uid: user.uid,
        email: user.email || email,
        name: user.displayName || "User",
        createdAt: new Date().toISOString(),
      };
    }
  } catch (error: any) {
    throw new Error(error.message || "Failed to login");
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || "Failed to logout");
  }
};

export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};
