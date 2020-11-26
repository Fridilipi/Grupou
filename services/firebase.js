import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCiEQm0x-Mvy_BgDrYYCq30Lx3DbujZuaw",
  authDomain: "grupou-28488.firebaseapp.com",
  databaseURL: "https://grupou-28488.firebaseio.com",
  projectId: "grupou-28488",
  storageBucket: "grupou-28488.appspot.com",
  messagingSenderId: "1080303706319",
  appId: "1:1080303706319:web:1c7fe808c21eaedf6297ba",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
