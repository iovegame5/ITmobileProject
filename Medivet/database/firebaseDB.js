import * as firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyDE79NcDtOcERFzTJ-JdkTcG1WWUnbxWXE",
    authDomain: "medivet-d3298.firebaseapp.com",
    projectId: "medivet-d3298",
    storageBucket: "medivet-d3298.appspot.com",
    messagingSenderId: "150722163700",
    appId: "1:150722163700:web:1f3127931e5334b7397fa1",
    measurementId: "G-H300YVXMS1"
  };
// Initialize Firebase

export const FIREBASE_APP =  firebase.initializeApp(firebaseConfig);