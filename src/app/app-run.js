(function() {
  'use strict';

  angular
    .module('ngApp')
    .run(($rootScope, $state) => {
      // this is to simply check from markup to know
      // in which state we're
      $rootScope.$state = $state;
      $rootScope.state = {
        is: function(state) {
          return $state.current.name.indexOf(state) !== -1;
        }
      };
    });
})();