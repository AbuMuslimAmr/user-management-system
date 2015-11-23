(function() {
  'use strict';

  angular
    .module('ngApp')
    .service('modal', function($uibModal) {
      function open(config) {
        return $uibModal.open({
          animation: true,
          templateUrl: 'app/components/modal/modal-template.html',
          controller: 'ModalInstanceCtrl',
          resolve: {
            config: function () {
              return config;
            }
          }
        });
      }

      return {
        open: open
      };
    });
})();