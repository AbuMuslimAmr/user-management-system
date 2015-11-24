(function() {
  'use strict';

  angular
    .module('ngApp')
    .config((NotificationProvider) => {
      NotificationProvider.setOptions({
        delay: 3500,
        startTop: 20,
        startRight: 20,
        verticalSpacing: 10,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
      });
    });
})();