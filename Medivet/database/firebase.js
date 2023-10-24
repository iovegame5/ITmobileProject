import * as firebase from "firebase/compat";
import "firebase/compat/storage"; // Import Firebase Storage
// const firebaseConfig = {
//   apiKey: "AIzaSyAQN4P7C7g0KMoV8rjUfY4pbZrcvvcj5uM",
//   authDomain: "medivet-db13a.firebaseapp.com",
//   projectId: "medivet-db13a",
//   storageBucket: "medivet-db13a.appspot.com",
//   messagingSenderId: "666011955187",
//   appId: "1:666011955187:web:294d636982bf464c752c86"
// };

const firebaseConfig = {
  apiKey: "AIzaSyANi7dJpb9VM99fw2tUBl9wO3usVWlbKPo",
  authDomain: "mobileproject-c8e93.firebaseapp.com",
  projectId: "mobileproject-c8e93",
  storageBucket: "mobileproject-c8e93.appspot.com",
  messagingSenderId: "830067508566",
  appId: "1:830067508566:web:0b5a0cd599edde0a4202f7"
};


firebase.initializeApp(firebaseConfig);

export default firebase;
