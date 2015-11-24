(function() {
  'use strict';

  class GroupCtrl {
    constructor($state, $stateParams, api, Notification, ENTITY_MODES) {
      this._$state = $state;
      this._api = api;
      this._Notification = Notification;
      
      this.ENTITY_MODES = ENTITY_MODES;
      this.groupID = $stateParams.id;

      this.init();
    }

    init() {
      this.group = {};
      this.mode = _.isUndefined(this.groupID) ? this.ENTITY_MODES.ADD : this.ENTITY_MODES.EDIT;
      this.loadUsers();

      if (this.mode === this.ENTITY_MODES.EDIT) {
        this._api.Group
          .get(this.groupID)
          .then((group) => {
            this.group = group;
          });
      }
    }

    loadUsers() {
      this._api.User
        .get()
        .then((users) => {
          this.users = users;
        });
    }

    filterUsers(query) {
      return _.filter(this.users, (user) => {
        return user.name
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1;
      });
    }

    submit() {
      if (this.mode === this.ENTITY_MODES.ADD) {
        this.addGroup();        
      } else {
        this.saveGroup();
      }
    }

    addGroup() {
      this._api.Group
        .create(this.group)
        .then(() => {
          this._Notification.success(`Group (${this.group.name}) created successfully.`);
          this._$state.go('groups');
        });
    }

    saveGroup() {
      this.group
        .put()
        .then(() => {
          this._Notification.success(`Group (${this.group.name}) saved successfully.`);
          this._$state.go('groups');
        });
    }
  }

  angular
    .module('ngApp')
    .controller('GroupCtrl', GroupCtrl);
})();