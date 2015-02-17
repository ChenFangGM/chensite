'use strict';
angular.module('galleryApp').controller('DatepickerCtrl', function ($scope) {
//init date
	$scope.today = function() {
		$scope.formData.date = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.formData.date = null;
	};

// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
	};
	$scope.toggleMin();

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.initDate = new Date('2015-09-10');
	$scope.formData.date = new Date('2015-09-10');
	$scope.formats = ['longDate', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
	$scope.format = $scope.formats[0];
});