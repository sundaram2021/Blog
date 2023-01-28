
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCFA2hJZ9UeJ3ecCBGFRe7cKcjch6f412w",
  authDomain: "blog-1cf7e.firebaseapp.com",
  projectId: "blog-1cf7e",
  storageBucket: "blog-1cf7e.appspot.com",
  messagingSenderId: "534423985787",
  appId: "1:534423985787:web:a4d9eb2491733a0b130cde"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();


