import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA3_sF2D6rG93gB38cfLSzAU0D6Hg3UJIE",
    authDomain: "whatsapp-clone-5e773.firebaseapp.com",
    projectId: "whatsapp-clone-5e773",
    storageBucket: "whatsapp-clone-5e773.appspot.com",
    messagingSenderId: "1030134348008",
    appId: "1:1030134348008:web:4b554c5112c9f29984315d",
    measurementId: "G-QBQYLZKRWZ",
};

const app = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)