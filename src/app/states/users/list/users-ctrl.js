(function() {
  'use strict';

  class UsersCtrl {
    constructor($scope, $templateCache, api) {
      this._$scope = $scope;
      this._$templateCache = $templateCache;
      this._api = api;
      
      this.init();
      this.load();
    }

    init() {
      this._$scope.removeGroup = (group) => {
        console.log(group);
      };

      // grid configurations
      this.gridConfig = {
        enableSorting: true,
        enableFiltering: true,
        columnDefs: [{
          field: 'id',
          width: 70,
          enableHiding: false,
          enableColumnMenu: false
        }, {
          field: 'name',
          enableHiding: false,
          enableColumnMenu: false
        }, {
          field: 'email',
          enableHiding: false,
          enableColumnMenu: false
        }, {
          displayName: '',
          field: 'actions',
          cellTemplate: this._$templateCache.get('users-grid-details-cell'),
          enableFiltering: false,
          enableColumnMenu: false
        }]
      };
    }

    load() {
      this._api.User
        .get()
        .then((users) => {
          this.gridConfig.data = users;
        });
    }
  }

  angular
    .module('ngApp')
    .controller('UsersCtrl', UsersCtrl);
})();