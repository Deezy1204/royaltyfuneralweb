import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD5LKvzB06HRRZQBd3miB8M0ynOiute3CI",
  authDomain: "royaltyfuneralweb.firebaseapp.com",
  databaseURL: "https://royaltyfuneralweb-default-rtdb.firebaseio.com",
  projectId: "royaltyfuneralweb",
  storageBucket: "royaltyfuneralweb.firebasestorage.app",
  messagingSenderId: "593789199355",
  appId: "1:593789199355:web:cc86524165e5744adbe15e",
};

// Avoid re-initializing on hot reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);
