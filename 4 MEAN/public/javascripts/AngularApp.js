var app = angular.module('AngularApp', ['ngRoute', 'ngResource']).run(function($rootScope, $http) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';

});

app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: 'main.html',
      controller: 'mainController'
    })
    //the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
});

app.factory('postFactory', function($resource){
	/*var factory = {};
	factory.getAll = function(){
		return $http.get('/api/posts');
	}
	return factory;*/
	
	return $resource('/api/posts/:id');
});

app.controller('mainController', function($scope, $rootScope, postFactory) {
	$scope.posts = postFactory.query();
	$scope.newPost = { created_by: '', text: '', created_dt: '' };

	/*postFactory.getAll().success(function (data){
		$scope.posts = data;
	});*/
	
	$scope.post = function() {
		$scope.newPost.created_by = $rootScope.current_user;
		$scope.newPost.created_at = Date.now();
		postFactory.save($scope.newPost, function(){
			$scope.posts = postFactory.query();
			$scope.newPost = {created_by: '', text: '', created_at: ''};
		});
	};
});

app.controller('authController', function($scope, $rootScope, $http, $location){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	/*postService.getAll().success(function(data){
		$scope.posts = data;
	});*/

	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			$rootScope.authenticated = true;
			$rootScope.current_user = data.user.username;
			$location.path('/');
		});
	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.user).success(function(data){
			$rootScope.authenticated = true;
			$rootScope.current_user = data.user.username;
			
			$location.path('/');
		});
	};
});