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
          templateUrl: 'app/states/groups/groups.html',
          controller: 'GroupsCtrl',
          controllerAs: 'groupsCtrl'
        })
        .state('group-details', {
          url: '/groups/:id',
          templateUrl: 'app/states/group/group.html',
          controller: 'GroupCtrl',
          controllerAs: 'groupCtrl'
        });
    });
})();