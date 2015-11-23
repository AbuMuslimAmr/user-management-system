(function() {
  'use strict';

  class GroupsCtrl {
    constructor($scope, $templateCache, api, modal) {
      this._$scope = $scope;
      this._$templateCache = $templateCache;
      this._api = api;
      this._modal = modal;

      this.init();
      this.load();
    }

    init() {
      this._$scope.removeGroup = (group) => {
        let confirmationModal = this._modal
          .open({
            title: 'Remove Group',
            message: 'Are you sure you want to delete this group?',
            actions: [{
              title: 'Delete'
            }]
          });

        confirmationModal.result.then(() => {
          group
            .remove()
            .then(() => {
              this._removeGroupByID(group.id);
            });
        });
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
          displayName: 'Users count',
          name: 'users.length',
          enableColumnMenu: false
        }, {
          displayName: '',
          field: 'actions',
          cellTemplate: this._$templateCache.get('groups-grid-details-cell'),
          width: 70,
          enableFiltering: false,
          enableColumnMenu: false
        }]
      };
    }

    load() {
      this._api.Group
        .get()
        .then((groups) => {
          this.gridConfig.data = groups;
        });
    }

    _removeGroupByID(id) {
      _.remove(this.gridConfig.data, (group) => {
        return group.id === id;
      });
    }
  }

  angular
    .module('ngApp')
    .controller('GroupsCtrl', GroupsCtrl);
})();