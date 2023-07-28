import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyALiQEhDxqu8tzPr-aysZlGOOMMQKzvZls",
  authDomain: "leet-code-42a57.firebaseapp.com",
  projectId: "leet-code-42a57",
  storageBucket: "leet-code-42a57.appspot.com",
  messagingSenderId: "973869512715",
  appId: "1:973869512715:web:5aa91404daaaf0feda2f0e",
  measurementId: "G-MWWQ0QSX8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
