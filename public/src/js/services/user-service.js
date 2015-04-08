'use strict';
define([
	'angular',
	'app'
], function(angular){
	angular.module('chensiteApp')
		.factory('User', function ($resource) {
			var User = $resource('/auth/users/:id/', {},
				{
					'update': {
						method:'PUT'
					}
				});
			return User;
		});
});
