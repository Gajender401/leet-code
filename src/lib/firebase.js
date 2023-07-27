import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: toString(process.env.FIREBASE_API_KEY),
  authDomain: toString(process.env.FIREBASE_AUTH_DOMAIN),
  projectId: toString(process.env.FIREBASE_PROJECT_ID),
  storageBucket: toString(process.env.FIREBASE_STORAGE_BUCKET),
  messagingSenderId: toString(process.env.FIREBASE_MESSAGING_SENDER_ID),
  appId: toString(process.env.FIREBASE_APP_ID),
  measurementId: toString(process.env.FIREBASE_MEASUREMENT_ID)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
