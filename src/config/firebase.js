// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEiancSnUB3oPnrtOWB1TAjkYj8XX7wiw",
  authDomain: "contact-fbccc.firebaseapp.com",
  projectId: "contact-fbccc",
  storageBucket: "contact-fbccc.firebasestorage.app",
  messagingSenderId: "871906661862",
  appId: "1:871906661862:web:9d722d6459076f45dff227",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
