(function() {
  'use strict';

  angular
    .module('ngApp')
    .constant('DEFAULT_STATE', '/groups')
    .constant('ENTITY_MODES', {
        ADD: 'ADD',
        EDIT: 'EDIT'
    });
})();