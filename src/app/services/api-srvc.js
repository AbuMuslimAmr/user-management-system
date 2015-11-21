(function() {
  'use strict';

  angular
    .module('ngApp')
    .service('api', function(Restangular) {
      function getGroups() {
        return Restangular
          .all('group')
          .getList();
      }

      function createGroup(group) {
        return Restangular
          .all('group')
          .post(group);
      }

      return {
        getGroups: getGroups,
        createGroup: createGroup
      };
    });
})();