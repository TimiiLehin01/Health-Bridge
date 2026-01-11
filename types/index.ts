export interface User {
  uid: string;
  email: string;
  name: string;
}

export interface UserData {
  age: string;
  sex: string;
  state: string;
  town: string;
  address: string;
  religion: string;
  ethnicGroup: string;
  employment: string;
}

export interface AssessmentData {
  initialMood: string;
  sectionA: string[];
  sectionB: string[];
  sectionC: string[];
  openEnded: string;
}

export interface AppointmentDetails {
  psychologist: string;
  hospital: string;
  date: string;
  time: string;
}
