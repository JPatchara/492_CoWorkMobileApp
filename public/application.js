'use strict';

var mainAppModule = angular.module('Hello',[]);

mainAppModule.filter('sayhello', function() {
	return function(name) {
		return 'Hello, ' + name;
	};
});