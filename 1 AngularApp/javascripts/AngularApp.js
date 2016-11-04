var app = angular.module('AngularApp', []);

app.controller('homeController', function($scope) {
	$scope.posts = [];
	$scope.newPost = { created_by: '', text: '', created_dt: '' };

	$scope.post = function() {
		$scope.newPost.created_dt = Date.now();
		$scope.posts.push($scope.newPost);
		$scope.newPost = { created_by: '', text: '', created_dt: '' };
	};
});

app.controller('authController', function($scope){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	/*postService.getAll().success(function(data){
		$scope.posts = data;
	});*/

	$scope.login = function(){
		//placeholder until authentication is implemented
		$scope.error_message = 'login request for ' + $scope.user.username;
	};

	$scope.register = function(){
		//placeholder until authentication is implemented
		$scope.error_message = 'registeration request for ' + $scope.user.username;
	};
});