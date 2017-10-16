const app = angular.module('texter',['ngRoute']).config(config);


function config($httpProvider,$routeProvider){
	$routeProvider
	.when('/messages',{
		templateUrl:'angular/messages/messages.html',
		controller: messageCtrl,
		controllerAs: 'vm'
	})
	.otherwise({
		redirectTo: '/'
	});
}