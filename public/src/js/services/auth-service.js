// src/js/services/auth-service.js

define([
	'./service-manager'
], function(serviceManager){
	'use strict';
	serviceManager.factory('Auth', function Auth($rootScope, $cookies, Session, User) {
		$rootScope.currentUser = $cookies.get('user') || null;
		$cookies.remove('user');

		return {

			login: function(provider, user, err_callback, suc_callback) {
				var e_cb = err_callback || angular.noop;
				var s_cb = suc_callback || angular.noop;
				Session.save({
					provider: provider,
					email: user.email,
					password: user.password
				}, function(user) {
					$rootScope.currentUser = user;
					return s_cb();
				}, function(err) {
					return e_cb(err.data);
				});
			},

			logout: function(callback) {
				var cb = callback || angular.noop;
				Session.delete(function(res) {
						$rootScope.currentUser = null;
						return cb();
					},
					function(err) {
						return cb(err.data);
					});
			},

			currentUser: function() {
				Session.get(function(user) {
					$rootScope.currentUser = user;
				});
			},

			createUser: function(userinfo, err_callback, suc_callback) {
				var e_cb = err_callback || angular.noop;
				var s_cb = suc_callback || angular.noop;
				User.save(userinfo,
					function(user) {
						$rootScope.currentUser = user;
						return s_cb();
					},
					function(err) {
						return e_cb(err.data);
					});
			},

			changePassword: function(email, oldPassword, newPassword, callback) {
				var cb = callback || angular.noop;
				User.update({
					email: email,
					oldPassword: oldPassword,
					newPassword: newPassword
				}, function(user) {
					console.log('password changed');
					return cb();
				}, function(err) {
					return cb(err.data);
				});
			},

			removeUser: function(email, password, callback) {
				var cb = callback || angular.noop;
				User.delete({
					email: email,
					password: password
				}, function(user) {
					console.log(user + 'removed');
					return cb();
				}, function(err) {
					return cb(err.data);
				});
			}
		};
	});
});
