import app from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCb19u4Ptx1lrflxdjMclk9vJwrZGX0lss",
  authDomain: "rubrica3login2024.firebaseapp.com",
  projectId: "rubrica3login2024",
  storageBucket: "rubrica3login2024.appspot.com",
  messagingSenderId: "26033999065",
  appId: "1:26033999065:web:5a24ba5ac2f031c86e02c8"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = app.auth()

export { db, auth }