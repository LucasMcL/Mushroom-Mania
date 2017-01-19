////////////////////////////
// Mushroom App
////////////////////////////

angular.module('MushroomMania', ['ngRoute'])
	.config( ($routeProvider) => {
		$routeProvider
			.when('/', {
				controller: 'mainCtrl',
				templateUrl: '../partials/main-page.html'
			})
			.otherwise('/', {
				controller: 'mainCtrl',
				templateUrl: '../partials/main-page.html'
			})
	})
	.controller('mainCtrl', function($scope, mushroomFactory) {
		mushroomFactory
			.getMushrooms()
			.then((mushroomData) => $scope.mushrooms = mushroomData)
	})
	.factory('mushroomFactory', function($http) {
		return {
			getMushrooms: function() {
				return $http({
					method: "GET",
					url: 'https://mushroom-mania-9035e.firebaseio.com/.json'
				})
				.then( (responseObj) => {
					let data = responseObj.data
					let key = Object.keys(data) // firebase rand key
					return data[key].mushrooms
				})
			}
		}
	})









