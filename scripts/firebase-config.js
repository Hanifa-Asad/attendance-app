import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBeYRQxPs9qnB7SaMoIsna--Y-5HqPMf7g",
    authDomain: "attendance-app-90b52.firebaseapp.com",
    projectId: "attendance-app-90b52",
    storageBucket: "attendance-app-90b52.firebasestorage.app",
    messagingSenderId: "977563714964",
    appId: "1:977563714964:web:da789cd4a09a55e416fb81",
    measurementId: "G-1PJZ29JWW1"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
