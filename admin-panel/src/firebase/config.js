import firebase from "firebase/app"
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB1YquE6sZxiY5gWL94OLLxEDd22sXRAfQ",
  authDomain: "asp-ads.firebaseapp.com",
  databaseURL: "https://asp-ads.firebaseio.com",
  projectId: "asp-ads",
  storageBucket: "asp-ads.appspot.com",
  messagingSenderId: "252025369069",
  appId: "1:252025369069:web:198447e8d9d65f7ff577e4"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}


const storage = firebase.storage() // To upload a file to Cloud Storage
const database = firebase.database() //Initialize an instance of Firebase Realtime
const timestamp = firebase.database.ServerValue.TIMESTAMP;

export { storage, database, timestamp }