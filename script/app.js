//module
var busApp = angular.module('busApp',['ngRoute','ngResource'])

//routes
busApp.config(function($routeProvider) {

	$routeProvider

	.when('/',{
		templateUrl: 'page/home.html',
		controller: 'homeController'
	})

	.when('/result',{
		templateUrl: 'page/result.html',
		controller: 'resultController'
	})

	.when('/about',{
		templateUrl: 'page/about.html',
	})

	.when('/contact',{
		templateUrl:'page/contact.html'
	})

})

//services
busApp.service('busStop',function(){
	
	this.stopNumber = '66359';

})

//controllers
busApp.controller('homeController',['$scope','busStop',function($scope,busStop) {
	
	$scope.stopNumber = busStop.stopNumber;
	
	$scope.$watch('stopNumber',function(){
		busStop.stopNumber = $scope.stopNumber;
	})

}]);

busApp.controller('resultController',['$scope','$resource','busStop',function($scope,$resource,busStop) {
	
	$scope.stopNumber = busStop.stopNumber;
	
	$scope.busAPI = $resource("https://arrivelah.herokuapp.com");
	
	$scope.busResult = $scope.busAPI.get({id: $scope.stopNumber});
	
	$scope.convertToMinuteNext = function(ms) {
		if (ms) {
			var min = Math.round(ms/60000);
			if (min < 0) {
				return "The bus is at the deck";
			} else if (min == 0) {
				return "The next one is arriving ";
			} else if (min == 1) {
				return "The next bus will arrive in 1 minute.";
			} else {
				return "The next bus will arrive in " + min + " minutes.";
			}			
		}
		else {
			return "No bus for today, see you tomorrow!"
		};
	};

	$scope.convertToMinuteNext2 = function(ms) {
		if (ms) {
			var min = Math.round(ms/60000);
			if (min == 0) {
				return "The next next one is arriving ";
			} else if (min == 1) {
				return "The next next bus will arrive in 1 minute.";
			} else {
				return "The next next bus will arrive in " + min + " minutes.";
			}
		}
		else {
			return "No bus for today, see you tomorrow!"
		}
	};

	$scope.busLoad = function(load) {
		if (load =="SEA") {
			return "Seats Available"
		} else if (load == "SDA") {
			return "Standing Available"
		} else if (load == "LSD") {
			return "Limited Standing"
		}
	};

	$scope.busFeature = function(feature) {
		if (feature == "WAB") {
			return "This bus is wheel-chair accessible"
		}
	}

	$scope.busType = function(type) {
		if (type == "SD") {
			return "Single Deck"
		} else if (type == "DD") {
			return "Double Deck"
		} else if (type == "BD") {
			return "Bendy"
		}
	}

}]);

//directives
// busApp.directive('busResultDirective',function(){
// 	return {
// 		restrict: 'E',
// 		templateUrl: 'directives/busResultDirective.html',
// 		replace:true,
// 		scope: {
// 			busNumber: "=",
// 			minuteNext: "&",
// 			minuteNext2: "&"

// 		}
// 	}
// })