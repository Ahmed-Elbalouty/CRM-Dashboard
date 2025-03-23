import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLz-7QIZyaH8Ta1hNUdgv9m0HGQWmQq6A",
  authDomain: "crm-dashboard-ba89d.firebaseapp.com",
  projectId: "crm-dashboard-ba89d",
  storageBucket: "crm-dashboard-ba89d.firebasestorage.app",
  messagingSenderId: "214263577467",
  appId: "1:214263577467:web:2a7571492a750336f65bde",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
