angular.module('navController', ["firebase"])

	.controller('nav', function($scope, $state, $modal, $firebaseArray) {


		$scope.logout = function() {
			console.log("nav: logout");
			firebase.auth().signOut().then(function() {
			  // Sign-out successful.
			}, function(error) {
			  // An error happened.
			});
		}

		$scope.submit = function() {
	      	console.log("Pressed sign in button");
	        if ($scope.login_email && $scope.login_pw) {
	   			console.log($scope.login_email);
	   			console.log($scope.login_pw);

	   			firebase.auth().signInWithEmailAndPassword($scope.login_email, $scope.login_pw).then(function(user) {

	   				//$location.path( "/home" );

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



		$scope.register = function()
		{
			var ModalController2 = function ($scope, $modalInstance) {
				$scope.dialogTitle = "Register";

					$scope.submit = function() {
						console.log("Registering user");
						if ($scope.register_email && $scope.register_pw) {
						console.log($scope.login_email, $scope.login_pw);

						firebase.auth().createUserWithEmailAndPassword($scope.register_email, $scope.register_pw).then(function(user) {

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
					templateUrl: 'views/registerModal.html',
					controller: ModalController2
				});
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
				url: '#/home'
			},
			{
				name: 'Bills',
				url: '#/bills'
			},
			{
				name: 'Orders',
				url: '#/orders'
			},
			{
				name: 'Users',
				url: '#/users'
			}
		]
	})



.controller('UsersCtrl', function($scope, $rootScope) {

	$scope.isAdmin = false;

	if ($rootScope.user.displayName == "Admin") { $scope.isAdmin = true};

	$scope.roles = ["Admin", "Produktionsbetrieb", "Kunde", "Lieferant"];

	var database = firebase.database();

	$scope.users= {};

	var usersRef = firebase.database().ref('users/');
	usersRef.on('value', function(snapshot) {

			$scope.users = snapshot.val();
	  		console.log($scope.users);
	  		console.log($scope.users.Kunde);
	  		$scope.$applyAsync();
			  
	});

	$scope.submit = function() {
  		console.log("UsersCtrl: make user");

  		console.log($scope.user_email);
  		console.log($scope.user_pw);
  		console.log($scope.user_role);

  		if ($scope.user_email && $scope.user_pw && $scope.user_role) {

  		

			doIt();



  		}

  	}

  	function doIt() {

  		var config = {
		    apiKey: "AIzaSyBXl1fqqllplpJQXC-wR-Ay3qTpQUV4ZKY",
		    authDomain: "abgabe4.firebaseapp.com",
		    databaseURL: "https://abgabe4.firebaseio.com",
		    storageBucket: "abgabe4.appspot.com",
		    messagingSenderId: "692350034443"
			};

  		var secondaryApp = firebase.initializeApp(config, "Secondary");

	  		secondaryApp.auth().createUserWithEmailAndPassword($scope.user_email, $scope.user_pw).then(function(newuser) {
	  			//success
	  			console.log(newuser);

	  			secondaryApp.auth().currentUser.updateProfile({
				  displayName: $scope.user_role
				});

	  			secondaryApp.auth().signOut();

	  			firebase.database().ref('users/' + newuser.uid).set({
				    email: newuser.email,
				    role: $scope.user_role
				});

				

	  			$scope.errormessage = "";
				$scope.user_email = $scope.user_pw = $scope.user_role = "";


			}, function(error) {
				var errorMessage = error.message;
				console.log(error.message);
				$scope.errormessage = error.message;
				$scope.$applyAsync();
			});
  	}
		
})

.controller('OrdersCtrl', function($scope, $firebaseArray) {

	var ref = firebase.database().ref().child("orders");
  	$scope.orders = $firebaseArray(ref);

  	$scope.submit = function() {
  		console.log("save order");

  		$scope.orders.$add({
  			no: $scope.order_no,
      		title: $scope.order_title,
      		quantity: $scope.order_quantity
    	});
  	}
		
})


.controller('BillsCtrl', function($scope, $firebaseArray) {

	var ref = firebase.database().ref().child("bills");
  	$scope.bills = $firebaseArray(ref);

  	$scope.submit = function() {
  		console.log("save bill");

  		$scope.bills.$add({
  			no: $scope.bill_no,
      		title: $scope.bill_title,
      		amount: $scope.bill_amount
    	});
  	}

});
