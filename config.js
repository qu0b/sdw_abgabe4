  var config = {
    apiKey: "AIzaSyBXl1fqqllplpJQXC-wR-Ay3qTpQUV4ZKY",
    authDomain: "abgabe4.firebaseapp.com",
    databaseURL: "https://abgabe4.firebaseio.com",
    storageBucket: "abgabe4.appspot.com",
    messagingSenderId: "692350034443"
  };
  firebase.initializeApp(config);

var database = firebase.database();

firebase.database().ref('users/' + 128317283).set({
    username: "stefan",
    email: "stefan@emial.com"
  });

  console.log("config");