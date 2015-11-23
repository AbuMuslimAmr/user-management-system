(function() {
  'use strict';

  class GroupCtrl {
    constructor($stateParams, api) {
      this._api = api;

      this.init();
    }

    init() {
      this.group = {};
      this.loadUsers();
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

    addGroup() {
      console.log(this.group);
    }
  }

  angular
    .module('ngApp')
    .controller('GroupCtrl', GroupCtrl);
})();