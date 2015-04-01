// src/js/controller/login-controller.js
define([
	'./controller-manager',
	'jquery'
], function (controllerManager,JQuery) {
	'use strict';
	controllerManager.controller('loginController', function ($scope, $timeout, $modal, $log){
		$timeout(function(){
			$scope.items = ['item1', 'item2', 'item3'];
			var modalInstance = $modal.open({
				templateUrl: 'src/views/login-modal.html',
				controller: 'ModalInstanceCtrl',
				resolve: {
					items: function () {
						return $scope.items;
					}
				}
			});
			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}, 500);
	});

	controllerManager.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};

		$scope.ok = function () {
			$modalInstance.close($scope.selected.item);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	});
});