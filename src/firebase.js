// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5NHpHrTXh6ituF__Nf7-iEP3HFyQrgj8",
  authDomain: "todo4womanup.firebaseapp.com",
  projectId: "todo4womanup",
  storageBucket: "todo4womanup.appspot.com",
  messagingSenderId: "397983130779",
  appId: "1:397983130779:web:bbd124cb0be2b6ce95d23e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)