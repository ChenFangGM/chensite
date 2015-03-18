// src/js/controller/portfolio-controller.js
define([
	'controller-manager',
	'jquery',
	'unityObject2'
], function (controllerManager,jQuery) {
	'use strict';
	controllerManager.controller('portfolioController', [function ($scope) {
		var config = {
			width: 960,
			height: 600,
			params: { enableDebugging:"0" }
		};

		var u = new UnityObject2(config);
		jQuery(function() {
			var $missingScreen = jQuery("#unityPlayer").find(".missing");
			var $brokenScreen = jQuery("#unityPlayer").find(".broken");
			$missingScreen.hide();
			$brokenScreen.hide();

			u.observeProgress(function (progress) {
				switch(progress.pluginStatus) {
					case "broken":
						$brokenScreen.find("a").click(function (e) {
							e.stopPropagation();
							e.preventDefault();
							u.installPlugin();
							return false;
						});
						$brokenScreen.show();
						break;
					case "missing":
						$missingScreen.find("a").click(function (e) {
							e.stopPropagation();
							e.preventDefault();
							u.installPlugin();
							return false;
						});
						$missingScreen.show();
						break;
					case "installed":
						$missingScreen.remove();
						break;
					case "first":
						break;
				}
			});
			u.initPlugin(jQuery("#unityPlayer")[0], "http://localhost:2010/dist/game/dday_web.unity3d");
		});
	}]);
});