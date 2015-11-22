(function() {
  'use strict';

  angular
    .module('ngApp')
    .service('api', function(Restangular) {
      // Generic APIs
      let Resource = {
        get: (resource, id) => {
          if (_.isUndefined(id) === true) {
            return Restangular
              .all(resource)
              .getList();
          } else { // show
            return Restangular
              .one(resource, id)
              .get();
          }
        },
        create: (resource, entity) => {
          return Restangular
            .all(resource)
            .post(entity);
        }
      };
      
      // Group APIs
      // note that, PUT and DELETE are called on entity
      // after getting restangularized
      let Group = {
        get: (id) => {
          return Resource.get('group', id);
        },
        create: (group) => {
          return Resource.create('group', group);
        },
        addUser: (group, userID) => {
          return Restangular
            .service(`group/${group.id}/user/${userID}`)
            .post({});
        },
        removeUser: (group, userID) => {
          return Restangular
            .one('group', group.id)
            .one('user', userID)
            .remove();
        }
      };

      // User APIs
      let User = {
        get: (id) => {
          return Resource.get('user', id);
        },
        create: (user) => {
          return Resource.create('user', user);
        }
      };

      return {
        Group: Group,
        User: User
      };
    });
})();