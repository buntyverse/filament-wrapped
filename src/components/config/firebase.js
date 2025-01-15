import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, TwitterAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFerefDZFvtOH1Tb83ega8Qwl6IZsh2eU",
  authDomain: "filament-genesis.firebaseapp.com",
  projectId: "filament-genesis",
  storageBucket: "filament-genesis.firebasestorage.app",
  messagingSenderId: "497544146256",
  appId: "1:497544146256:web:d3ab9946299c31c6e25055",
  measurementId: "G-C3QE1T0EBQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const twitterProvider = new TwitterAuthProvider();