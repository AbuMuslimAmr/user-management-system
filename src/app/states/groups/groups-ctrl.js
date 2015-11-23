(function() {
  'use strict';

  class GroupsCtrl {
    constructor(api, $templateCache) {
      this._api = api;
      this._$templateCache = $templateCache;
      
      this.init();
      this.load();
    }

    init() {
      // grid configurations
      this.gridConfig = {
        enableSorting: true,
        enableFiltering: true,
        columnDefs: [{
          field: 'id',
          width: 100,
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
          field: 'Actions',
          cellTemplate: this._$templateCache.get('groups-grid-cell-template'),
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
  }

  angular
    .module('ngApp')
    .controller('GroupsCtrl', GroupsCtrl);
})();