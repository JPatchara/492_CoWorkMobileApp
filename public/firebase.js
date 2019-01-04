var firebaseRef = {};
var firebaseRefFB = {};

var config = {
    apiKey: "AIzaSyBHQB4W4y6HeluZFWFAMTmOv6hIyt-pyQs",
    authDomain: "coapp492.firebaseapp.com",
    databaseURL: "https://coapp492.firebaseio.com",
    storageBucket: "coapp492.appspot.com",
    messagingSenderId: "922541829153"
};
firebase.initializeApp(config);
firebaseRef = firebase.database().ref("User");
firebaseRefFB = firebase.database().ref("facebook");
storage = firebase.storage();
storageRef = storage.ref();