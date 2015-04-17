'use strict';
define([
	'./directive-manager'
],function(directiveManager) {
	directiveManager
	/**
	 * Removes server error when user updates input
	 */
		.directive('mongooseError', function () {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function (scope, element, attrs, ngModel) {
					element.on('keydown', function () {
						return ngModel.$setValidity('mongoose', true);
					});
				}
			};
		});
});