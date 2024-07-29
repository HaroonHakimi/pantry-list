// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw0eTqF-idSBd4IitoRRVhhAwv-NXpZ4Y",
  authDomain: "pantry-app-682a8.firebaseapp.com",
  projectId: "pantry-app-682a8",
  storageBucket: "pantry-app-682a8.appspot.com",
  messagingSenderId: "1092264521087",
  appId: "1:1092264521087:web:9038f949a21db59c413e4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export { app, firestore  };
