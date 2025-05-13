// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7cLD8FCNeIArigL5kYBz4Q0WCTz3n3Zs",
  authDomain: "netflix-gpt-64e46.firebaseapp.com",
  projectId: "netflix-gpt-64e46",
  storageBucket: "netflix-gpt-64e46.firebasestorage.app",
  messagingSenderId: "243997231923",
  appId: "1:243997231923:web:f1aec0419f39bec6f78c46",
  measurementId: "G-22DMVHW85E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();