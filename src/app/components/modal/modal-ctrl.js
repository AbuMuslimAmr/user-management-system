(function() {
  'use strict';

  class ModalInstanceCtrl {
    constructor($scope, $uibModalInstance, config) {
      $scope.config = config;
      this._$scope = $scope;
      this._$uibModalInstance = $uibModalInstance;
      this.init();
    }

    init() {
      this._$scope.cancel = () => {
        this._$uibModalInstance.dismiss('cancel');
      };

      this._$scope.doAction = (action) => {
        this._$uibModalInstance.close(action);
      };
    }
  }

  angular
    .module('ngApp')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);
})();