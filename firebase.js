import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD86BbNbxmSLkJWrvHTn0C5BwfZfqkCLpc",
  authDomain: "fir-b5-lab1.firebaseapp.com",
  projectId: "fir-b5-lab1",
  storageBucket: "fir-b5-lab1.appspot.com",
  messagingSenderId: "715313025204",
  appId: "1:715313025204:web:20ef1dd87b0fe4d4a607e1",
  measurementId: "G-0RL9VZSHFG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
