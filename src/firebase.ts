import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCeTtPgKBofnGJCSk4F18oGwndEc_pnmCQ",
  authDomain: "fashion-ai-9eaf8.firebaseapp.com",
  projectId: "fashion-ai-9eaf8",
  storageBucket: "fashion-ai-9eaf8.firebasestorage.app",
  messagingSenderId: "114386122130",
  appId: "1:114386122130:web:edb67e0d0b27f3cb8bbd4b",
  measurementId: "G-Y9FCQ0DQKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
