(function() {
	var app = angular.module('app', ['ui.router', 'navController', 'ngAnimate', 'ui.bootstrap'])

	// define for requirejs loaded modules
	define('app', [], function() { return app; });

	// function for dynamic load with requirejs of a javascript module for use with a view
	// in the state definition call add property `resolve: req('/views/ui.js')`
	// or `resolve: req(['/views/ui.js'])`
	// or `resolve: req('views/ui')`
	function req(deps) {
		if (typeof deps === 'string') deps = [deps];
		return {
			deps: function ($q, $rootScope) {
				var deferred = $q.defer();
				require(deps, function() {
					$rootScope.$apply(function () {
						deferred.resolve();
					});
					deferred.resolve();
				});
				return deferred.promise;
			}
		}
	}

	app.run(function($rootScope) {
    	//wird einmalig ausgeführt

    	//set up firebase
    	var config = {
		    apiKey: "AIzaSyBXl1fqqllplpJQXC-wR-Ay3qTpQUV4ZKY",
		    authDomain: "abgabe4.firebaseapp.com",
		    databaseURL: "https://abgabe4.firebaseio.com",
		    storageBucket: "abgabe4.appspot.com",
		    messagingSenderId: "692350034443"
		  };
		firebase.initializeApp(config);

		//set up listener, schaut ob ein oder ausgeloggt wird
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
			console.log("logged in: ");
			console.log(user);

			$rootScope.$apply(function(){
				$rootScope.loginstatus = "Logout";
				$rootScope.user = user;

			});

		  } else {
			console.log("logged out.")

			$rootScope.$apply(function(){
				$rootScope.loginstatus = "Login";
				$rootScope.user = null;

			});
		  }
		});
	});

	app.config(function($stateProvider, $urlRouterProvider, $controllerProvider){
		var origController = app.controller
		app.controller = function (name, constructor){
			$controllerProvider.register(name, constructor);
			return origController.apply(this, arguments);
		}

		var viewsPrefix = 'views/';

		// For any unmatched url, send to /
		$urlRouterProvider.otherwise("/")

		$stateProvider
			// you can set this to no template if you just want to use the html in the page
			.state('home', {
				url: "/",
				templateUrl: viewsPrefix + "home.html",
				data: {
					pageTitle: 'Home'
				}
			})
			.state('users', {
				url: "/users",
				templateUrl: viewsPrefix + "users.html",
				controller: 'UsersCtrl',
				data: {
					pageTitle: 'Users'
				}
			})
			.state('bills', {
				url: "/bills",
				templateUrl: viewsPrefix + "bills.html",
				controller: 'BillsCtrl',
				data: {
					pageTitle: 'Bills'
				}
			})
			.state('orders', {
				url: "/orders",
				templateUrl: viewsPrefix + "orders.html",
				controller: 'OrdersCtrl',
				data: {
					pageTitle: 'Orders'
				}
			})
	})

	.directive('updateTitle', ['$rootScope', '$timeout',
		function($rootScope, $timeout) {
			return {
				link: function(scope, element) {
					var listener = function(event, toState) {
						var title = 'Backs ERP System';
						if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle + ' - ' + title;
						$timeout(function() {
							element.text(title);
						}, 0, false);
					};

					$rootScope.$on('$stateChangeSuccess', listener);
				}
			};
		}
	]);
}());
