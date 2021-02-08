import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCPZD-Sf3HkhS_l7QKcQ8-rsTDN8MKonYg",
  authDomain: "bigoappreact.firebaseapp.com",
  databaseURL: "https://bigoappreact.firebaseio.com",
  projectId: "bigoappreact",
  storageBucket: "bigoappreact.appspot.com",
  messagingSenderId: "486491978608",
  appId: "1:486491978608:web:b55ee131e6593b1d506db5",
  measurementId: "G-D9DJLEB8JE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
