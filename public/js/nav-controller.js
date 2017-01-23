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
	      	console.log("login");
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
				url: '#/home',
				hide: false
			},
			{
				name: 'Bills',
				url: '#/bills',
				hide: false
			},
			{
				name: 'Orders',
				url: '#/orders',
				hide: false
			},
			{
				name: 'Deliveries',
				url: '#/deliveries',
				hide: false
			},
			{
				name: 'Users',
				url: '#/users',
				hide: false
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
	  			secondaryApp.delete()
				  .then(function() {
				    console.log("App deleted successfully");
				  })
				  .catch(function(error) {
				    console.log("Error deleting app:", error);
  				});

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

  	}
		
})

.controller('OrdersCtrl', function($scope, $firebaseArray) {

	var ref = firebase.database().ref().child("orders");
  	$scope.orders = $firebaseArray(ref);

  	$scope.orders.$loaded()
	  .then(function(x) {
	    $scope.show_orders=true;
	  })
	  .catch(function(error) {
	    $scope.show_orders=false;
	    $scope.errormessage="Error: "+error.message;
	  });

  	$scope.submit = function() {
  		console.log("save order");

  		$scope.orders.$add({
  			no: $scope.order_no,
      		title: $scope.order_title,
      		quantity: $scope.order_quantity
    	});
  	}
		
})


.controller('DeliveriesCtrl', function($scope, $firebaseArray) {

	var ref = firebase.database().ref().child("deliveries");
  	$scope.deliveries = $firebaseArray(ref);

  	$scope.deliveries.$loaded()
	  .then(function(x) {
	    $scope.show_deliveries=true;
	  })
	  .catch(function(error) {
	    $scope.show_deliveries=false;
	    $scope.errormessage="Error: "+error.message;
	  });

  	$scope.submit = function() {
  		console.log("save delivery");

  		$scope.deliveries.$add({
  			no: $scope.delivery_no,
      		title: $scope.delivery_title,
      		quantity: $scope.delivery_quantity
    	});
  	}
		
})


.controller('BillsCtrl', function($scope, $firebaseArray) {

	var ref = firebase.database().ref().child("bills");
  	$scope.bills = $firebaseArray(ref);

  	$scope.bills.$loaded()
	  .then(function(x) {
	    $scope.show_bills=true;
	  })
	  .catch(function(error) {
	    $scope.show_bills=false;
	    $scope.errormessage="Error: "+error.message;
	  });

  	$scope.submit = function() {
  		console.log("save bill");

  		$scope.bills.$add({
  			no: $scope.bill_no,
      		title: $scope.bill_title,
      		amount: $scope.bill_amount
    	});
  	}

});
