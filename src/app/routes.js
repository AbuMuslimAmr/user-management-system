(function() {
  'use strict';

  angular
    .module('ngApp')
    .config(function($stateProvider, $urlRouterProvider, DEFAULT_STATE) {
      $urlRouterProvider.otherwise(DEFAULT_STATE);
      $urlRouterProvider.when('/', DEFAULT_STATE);
      
      $stateProvider
        .state('groups', {
          url: '/groups',
          templateUrl: 'app/states/groups/list/groups.html',
          controller: 'GroupsCtrl',
          controllerAs: 'groupsCtrl'
        })
        .state('group-details', {
          url: '/groups/:id',
          templateUrl: 'app/states/groups/details/group.html',
          controller: 'GroupCtrl',
          controllerAs: 'groupCtrl'
        })
        .state('users', {
          url: '/users',
          templateUrl: 'app/states/users/list/users.html',
          controller: 'UsersCtrl',
          controllerAs: 'usersCtrl'
        })
        .state('user-details', {
          url: '/users/:id',
          templateUrl: 'app/states/users/details/user.html',
          controller: 'UserCtrl',
          controllerAs: 'userCtrl'
        });
    });
})();