import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyAR5y-s8HZlDiorj_vj-Biviq9k6_u0Cyg",
  authDomain: "instagram-clone-9acf3.firebaseapp.com",
  projectId: "instagram-clone-9acf3",
  storageBucket: "instagram-clone-9acf3.appspot.com",
  messagingSenderId: "34003085381",
  appId: "1:34003085381:web:2351e0afe18b9f5c7bdb2c"
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
