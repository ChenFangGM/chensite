'use strict';
define([
	'angular',
	'app'
], function(){

});
angular.module('chensiteApp')
	.factory('Session', function ($resource) {
		return $resource('/auth/session/');
	});
