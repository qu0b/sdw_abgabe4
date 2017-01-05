angular.module('navController', [])
	.controller('nav', function($scope, $state) {
		$scope.title = 'Backs ERP System';

		// returns true if the current router url matches the passed in url
		// so views can set 'active' on links easily
		$scope.isUrl = function(url) {
			if (url === '#') return false;
			return ('#' + $state.$current.url.source + '/').indexOf(url + '/') === 0;
		};

		$scope.pages = [
			{
				name: 'Home',
				url: '#/'
			},
			{
				name: 'Theme Example',
				url: '#/theme'
			},
			{
				name: 'Login',
				url: '#/login'
			}
		]
	})

	.controller('LoginController', function($scope) {
		var config = {
    apiKey: "AIzaSyBXl1fqqllplpJQXC-wR-Ay3qTpQUV4ZKY",
    authDomain: "abgabe4.firebaseapp.com",
    databaseURL: "https://abgabe4.firebaseio.com",
    storageBucket: "abgabe4.appspot.com",
    messagingSenderId: "692350034443"
  };
  firebase.initializeApp(config);

var database = firebase.database();


//LISTENER DER SCHAUT OB SICH WER EINLOGGT ODER AUSLOGGT
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	console.log("logged in: ");
	console.log(user);
  } else {
	console.log("logged out.")
  }
});


function register (email, pw) {

	console.log("register: "+email+" "+pw);

	firebase.auth().createUserWithEmailAndPassword(email, pw).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	});
}

function doLogin(email, password) {
	console.log("doLogin");

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  
	});
}

function doLogOut() {
	console.log("doLogout");

	firebase.auth().signOut().then(function() {
  		// Sign-out successful.
	}, function(error) {
  		// An error happened.
	});
}

function getCurrentUser() {
	console.log("getCurrentUser");

	var user = firebase.auth().currentUser;

	if (user) {
	  console.log(user)
	} else {
	  console.log("getCurrentUser: No user currently logged in.")
	}
}
	});