// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4NiJCHAwenl8lLQ2Aa7A6T59o1Wv6lLg",
    authDomain: "local-food-lovers-client.firebaseapp.com",
    projectId: "local-food-lovers-client",
    storageBucket: "local-food-lovers-client.firebasestorage.app",
    messagingSenderId: "934271211667",
    appId: "1:934271211667:web:b198915bbc3554f0259566"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
