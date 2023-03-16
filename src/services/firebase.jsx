import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBeLkEDtkw3GV8vWyDtkG4aS8S8ggAT4ys",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: "auth-30411",
  storageBucket: "auth-30411.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)

export const storage  = getStorage(app);

export const auth = getAuth(app)