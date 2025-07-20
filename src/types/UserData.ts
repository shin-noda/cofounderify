export interface UserData {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  country?: string;
  city?: string;
  linkedIn?: string;
  skills?: string[];
  photoURL?: string;
  updatedAt?: { seconds: number; nanoseconds: number }; // Firestore timestamp
}