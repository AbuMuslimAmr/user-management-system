(function() {
  'use strict';

  class GroupCtrl {
    constructor($state, $stateParams, $q, api, Notification, ENTITY_MODES) {
      this._$state = $state;
      this._$q = $q;
      this._api = api;
      this._Notification = Notification;
      
      this.ENTITY_MODES = ENTITY_MODES;
      this.groupID = _.parseInt($stateParams.id);

      this.init();
    }

    init() {
      this.initialUsers = [];
      this.group = {};
      this.mode = _.isNaN(this.groupID) ? this.ENTITY_MODES.ADD : this.ENTITY_MODES.EDIT;

      this
        .loadUsers()
        .then(() => {
          // this should come after loadUsers()
          // to use this.users in loadGroupUsers()
          // and dont make unnecessary GET requests
          if (this.mode === this.ENTITY_MODES.EDIT) {
            this._api.groups
              .get(this.groupID)
              .then((group) => {
                this.group = group;
                this.loadGroupUsers();
              });
          }
        });
    }

    loadGroupUsers() {
      let users = [];

      _.each(this.group.users, (userID) => {
        users.push(this.getUserByID(userID));
      });

      this.group.users = users;
      this.initialUsers = _.clone(users);
    }

    getUserByID(userID) {
      return _.find(this.users, (user) => {
        return user.id === userID;
      });
    }

    loadUsers() {
      return this._api.users
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
      this._api.groups
        .create(this.group)
        .then((group) => {
          this.group.id = group.id;

          // save users
          this
            .saveGroupUsers()
            .then(() => {
              this._Notification.success(`Group <strong>(${this.group.name})</strong> created successfully.`);
              this._$state.go('groups');
            });
        });
    }

    saveGroup() {
      this.group
        .put()
        .then(() => {
          // save users
          this
            .saveGroupUsers()
            .then(() => {
              this._Notification.success(`Group <strong>(${this.group.name})</strong> updated successfully.`);
              this._$state.go('groups');
            });
        });
    }

    // returns two lists
    // usersToBeAdded[] and usersToBeAdded[]
    getUsersState() {
      let usersToBeAdded = [],
        usersToBeDeleted = [];

      // usersToBeAdded => IN group.users AND NOT IN initialUsers
      _.each(this.group.users, (groupUser) => {
        let notExist = _.isUndefined(_.find(this.initialUsers, (user) => {
          return user.id === groupUser.id;
        }));

        if (notExist === true) {
          usersToBeAdded.push(groupUser);
        }
      });

      // usersToBeDeleted => IN initialUsers AND NOT IN group.users
      _.each(this.initialUsers, (user) => {
        let notExist = _.isUndefined(_.find(this.group.users, (groupUser) => {
          return user.id === groupUser.id;
        }));

        if (notExist === true) {
          usersToBeDeleted.push(user);
        }
      });

      return {
        usersToBeAdded: usersToBeAdded,
        usersToBeDeleted: usersToBeDeleted
      };
    }

    saveGroupUsers() {
      let promises = [],
          usersState = this.getUsersState();

      // add users
      _.each(usersState.usersToBeAdded, (user) => {
        let promise = this._api.groups
          .addUser(this.group.id, user.id);

        promises.push(promise);
      });

      // delete users
      _.each(usersState.usersToBeDeleted, (user) => {
        let promise = this._api.groups
          .removeUser(this.group.id, user.id);

        promises.push(promise);
      });

      return this._$q.all(promises);
    }
  }

  angular
    .module('ngApp')
    .controller('GroupCtrl', GroupCtrl);
})();