(function() {
  'use strict';

  class UserCtrl {
    constructor($state, $stateParams, $q, api, Notification, ENTITY_MODES) {
      this._$state = $state;
      this._$q = $q;
      this._api = api;
      this._Notification = Notification;
      
      this.ENTITY_MODES = ENTITY_MODES;
      this.userID = _.parseInt($stateParams.id);

      this.init();
    }

    init() {
      this.initialGroups = [];
      this.user = {};
      this.mode = _.isNaN(this.userID) ? this.ENTITY_MODES.ADD : this.ENTITY_MODES.EDIT;

      this
        .loadGroups()
        .then(() => {
          // this should come after loadGroups()
          // to use this.groups in loadUserGroups()
          // and dont make unnecessary GET requests
          if (this.mode === this.ENTITY_MODES.EDIT) {
            this._api.users
              .get(this.userID)
              .then((user) => {
                this.user = user;
                this.loadUserGroups();
              });
          }
        });
    }

    loadUserGroups() {
      let groups = [];

      _.each(this.user.groups, (groupID) => {
        groups.push(this.getGroupByID(groupID));
      });

      this.user.groups = groups;
      this.initialGroups = _.clone(groups);
    }

    getGroupByID(groupID) {
      return _.find(this.groups, (group) => {
        return group.id === groupID;
      });
    }

    loadGroups() {
      return this._api.groups
        .get()
        .then((groups) => {
          this.groups = groups;
        });
    }

    filterGroups(query) {
      return _.filter(this.groups, (group) => {
        return group.name
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1;
      });
    }

    submit() {
      if (this.mode === this.ENTITY_MODES.ADD) {
        this.addUser();
      } else {
        this.saveUser();
      }
    }

    addUser() {
      this._api.users
        .create(this.user)
        .then((user) => {
          this.user.id = user.id;

          // save groups
          this
            .saveUserGroups()
            .then(() => {
              this._Notification.success(`User <strong>(${this.user.name})</strong> created successfully.`);
              this._$state.go('users');
            });
        });
    }

    saveUser() {
      this.user
        .put()
        .then(() => {
          // save groups
          this
            .saveUserGroups()
            .then(() => {
              this._Notification.success(`User <strong>(${this.user.name})</strong> updated successfully.`);
              this._$state.go('users');
            });
        });
    }

    // returns two lists
    // groupsToBeAdded[] and groupsToBeAdded[]
    getGroupsState() {
      let groupsToBeAdded = [],
        groupsToBeDeleted = [];

      // groups to be added
      _.each(this.user.groups, (userGroup) => {
        let notExist = _.isUndefined(_.find(this.initialGroups, (group) => {
          return group.id === userGroup.id;
        }));

        if (notExist === true) {
          groupsToBeAdded.push(userGroup);
        }
      });

      // groups to be deleted
      _.each(this.initialGroups, (group) => {
        let notExist = _.isUndefined(_.find(this.user.groups, (userGroup) => {
          return group.id === userGroup.id;
        }));

        if (notExist === true) {
          groupsToBeDeleted.push(group);
        }
      });

      return {
        groupsToBeAdded: groupsToBeAdded,
        groupsToBeDeleted: groupsToBeDeleted
      };
    }

    saveUserGroups() {
      let promises = [],
          groupsState = this.getGroupsState();

      // add groups
      _.each(groupsState.groupsToBeAdded, (group) => {
        let promise = this._api.groups
          .addUser(group.id, this.user.id);

        promises.push(promise);
      });

      // delete groups
      _.each(groupsState.groupsToBeDeleted, (group) => {
        let promise = this._api.groups
          .removeUser(group.id, this.user.id);

        promises.push(promise);
      });

      return this._$q.all(promises);
    }
  }

  angular
    .module('ngApp')
    .controller('UserCtrl', UserCtrl);
})();