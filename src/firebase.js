import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC3lcPMl973grsy2Ymr6pRiAOIzVksluok",
    authDomain: "cinemax-app-823b6.firebaseapp.com",
    projectId: "cinemax-app-823b6",
    storageBucket: "cinemax-app-823b6.appspot.com",
    messagingSenderId: "990184576048",
    appId: "1:990184576048:web:c0159ec1dc47927a4149f5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };