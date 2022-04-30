import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDGsAsrtow1o3IGPCuAfxHwgBfBECfv8Yw",
  authDomain: "main-project-340913.firebaseapp.com",
  projectId: "main-project-340913",
  storageBucket: "main-project-340913.appspot.com",
  messagingSenderId: "685132118527",
  appId: "1:685132118527:web:326b9802fb968adf638fca",
  measurementId: "G-LRJR9LKB3C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app);
export default app;
