(function() {
  'use strict';

  class UsersCtrl {
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
      this._$scope.removeUser = (user) => {
        let confirmationModal = this._modal
          .open({
            title: 'Delete User',
            message: 'Are you sure you want to delete this user?',
            actions: [{
              title: 'Yes, Delete'
            }]
          });

        confirmationModal.result.then(() => {
          user
            .remove()
            .then(() => {
              this._removeUserByID(user.id);
              this._Notification.success(`Group (${user.name}) removed successfully.`);
            }, () => {
              this._Notification.error('Something went wrong while removing the user!');
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
          field: 'email',
          enableHiding: false,
          enableColumnMenu: false
        }, {
          displayName: 'Groups count',
          name: 'groups.length',
          enableColumnMenu: false
        }, {
          displayName: '',
          field: 'actions',
          cellTemplate: this._$templateCache.get('users-grid-details-cell'),
          enableFiltering: false,
          enableColumnMenu: false,
          width: 70
        }]
      };
    }

    load() {
      this.loading = true;
      this._api.users
        .get()
        .then((users) => {
          this.gridConfig.data = users;
        }, () => {
          this._Notification.error('Something went wrong!');
        })['finally'](() => {
          this.loading = true;
        });
    }

    // remove group from groups list
    _removeUserByID(id) {
      _.remove(this.gridConfig.data, (user) => {
        return user.id === id;
      });
    }
  }

  angular
    .module('ngApp')
    .controller('UsersCtrl', UsersCtrl);
})();