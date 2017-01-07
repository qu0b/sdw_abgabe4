angular.module('navController', [])
	

	.controller('nav', function($scope, $state, $modal) {

		$scope.loginLogout = function() {

			//check current user
			var user = firebase.auth().currentUser;

			if (user) {
				console.log(user)
				//if there is a user, log him out

				console.log("doLogout");

				firebase.auth().signOut().then(function() {
			  		// Sign-out successful.
				}, function(error) {
			  		// An error happened.
				});

			} else {
				console.log("getCurrentUser: No user currently logged in.")
				//if there is no user, show login modal

				//hilfscontroller fuer das modal
				var ModalController = function ($scope, $modalInstance) {
				  $scope.dialogTitle = "Login";
			      
			      $scope.submit = function() {
			      	console.log("Pressed sign in button");
			        if ($scope.login_email && $scope.login_pw) {
			   			console.log($scope.login_email);
			   			console.log($scope.login_pw);

			   			firebase.auth().signInWithEmailAndPassword($scope.login_email, $scope.login_pw).then(function(user) {

			   				$modalInstance.close();
			   				
			   			}, function(error) {
						  // Handle Errors here.
						  var errorCode = error.code;
						  var errorMessage = error.message;

						  console.log(error.message);
						  // ...
						  $scope.$apply(function(){
						    $scope.loginError = error.message;
						  });
						  
						});
			        }
			      };

				};

				$modal.open({
			      templateUrl: 'views/loginModal.html',
			      controller: ModalController
			    });
			}



			

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
				name: 'User',
				url: '#/user'
			}
		]
	})



	.controller('UserCtrl', function($scope) {

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
