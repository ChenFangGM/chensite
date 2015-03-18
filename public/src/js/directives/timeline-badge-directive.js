'use strict';

angular.module('angular-timeline').directive('timelineBadge', function() {
  return {
    require: '^timelineNode',
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<div class="timeline-badge" ng-transclude ></div>',
    link: function(scope, element, attrs, parentCtrl) {}
  };
});
