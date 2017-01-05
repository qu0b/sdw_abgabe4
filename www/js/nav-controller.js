angular.module('navController', [])
	

	.controller('nav', function($scope, $state) {

		$scope.doLogOut = function() {

			console.log("doLogOut");
		}

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

		$scope.stefansvar = "asd";

		$scope.stefansfunction = function() {

			console.log("helolooooooo");
		}
		

		var database = firebase.database();



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
