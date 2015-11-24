(function() {
  'use strict';

  class GroupsCtrl {
    constructor($scope, $templateCache, api, modal, Notification) {
      this._$scope = $scope;
      this._$templateCache = $templateCache;
      this._api = api;
      this._modal = modal;
      this._Notification = Notification;

      this.init();
      this.load();
    }

    init() {
      // this is on the $scope because of ui grid appScope issue
      this._$scope.removeGroup = (group) => {
        let confirmationModal = this._modal
          .open({
            title: 'Delete Group',
            message: 'Are you sure you want to delete this group?',
            actions: [{
              title: 'Yes, Delete'
            }]
          });

        confirmationModal.result.then(() => {
          group
            .remove()
            .then(() => {
              this._removeGroupByID(group.id);
              this._Notification.success(`Group (${group.name}) removed successfully.`);
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
      this._api.groups
        .get()
        .then((groups) => {
          this.gridConfig.data = groups;
        });
    }

    // remove group from groups list
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