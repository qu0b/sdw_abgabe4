angular.module('navController', ["firebase"])

	.controller('nav', function($scope, $state, $modal, $firebaseArray) {

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
				url: '#/'
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



.controller('UsersCtrl', function($scope) {



})

.controller('OrdersCtrl', function($scope, $firebaseArray) {

	var ref = firebase.database().ref().child("orders");
  var orders = $firebaseArray(ref);

	orders.$loaded()
			.then(function(){
					angular.forEach(orders, function(order) {
							order.no=sjcl.decrypt("password", order.no);
							order.title=sjcl.decrypt("password", order.title);
							order.quantity=sjcl.decrypt("password", order.quantity);
					})
			});
			$scope.orders=orders;

  	$scope.submit = function() {
  		console.log("save order");

  		$scope.orders.$add({
  			no: sjcl.encrypt("password",$scope.order_no),
      		title: sjcl.encrypt("password",$scope.order_title),
      		quantity: sjcl.encrypt("password",$scope.order_quantity)
    	}).then(function(ref) {
				var id = ref.key;
				console.log("added rec with id ",id);
				console.log(orders.$indexFor(id));

				var place=orders.$indexFor(id);

				orders[place].no=sjcl.decrypt("password", orders[place].no);
				orders[place].title=sjcl.decrypt("password", orders[place].title);
				orders[place].quantity=sjcl.decrypt("password", orders[place].quantity);

			});
  	}

})


.controller('BillsCtrl', function($scope, $firebaseArray) {

	var ref = firebase.database().ref().child("bills");
  var bills = $firebaseArray(ref);

	bills.$loaded()
			.then(function(){
					angular.forEach(bills, function(bill) {
							bill.no=sjcl.decrypt("password", bill.no);
							bill.title=sjcl.decrypt("password", bill.title);
							bill.amount=sjcl.decrypt("password", bill.amount);
					})
			});
			$scope.bills=bills;

  	$scope.submit = function() {
  		console.log("save order");

  		$scope.bills.$add({
  			no: sjcl.encrypt("password",$scope.bill_no),
      		title: sjcl.encrypt("password",$scope.bill_title),
      		amount: sjcl.encrypt("password",$scope.bill_amount)
    	}).then(function(ref) {
				var id = ref.key;
				console.log("added rec with id ",id);
				console.log(bills.$indexFor(id));

				var place=bills.$indexFor(id);

				bills[place].no=sjcl.decrypt("password", bills[place].no);
				bills[place].title=sjcl.decrypt("password", bills[place].title);
				bills[place].amount=sjcl.decrypt("password", bills[place].amount);

			});
  	}



})
