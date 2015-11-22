(function() {
  'use strict';

  angular
    .module('ngApp')
    .controller('LandingCtrl', (api) => {
      api.Group
        .get(1)
        .then((group) => {
            api.Group.removeUser(group, 5);
        });
    });
})();