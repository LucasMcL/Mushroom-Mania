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
					let mushrooms = data[key].mushrooms
					let mushroomsFlat = []
					for(let i = 0; i < mushrooms.length; i++) {
						let name = Object.keys(mushrooms[i])[0]
						let obj = mushrooms[i][name]
						obj.name = name
						mushroomsFlat.push(obj)
					}
					console.log("mushrooms", mushrooms)
					console.log("mushroomsFlat", mushroomsFlat)
					return mushroomsFlat
				})
			}
		}
	})









