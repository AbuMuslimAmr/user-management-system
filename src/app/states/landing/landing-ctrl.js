(function() {
  'use strict';

  angular
    .module('ngApp')
    .controller('LandingCtrl', (api) => {
      api
        .getGroups()
        .then((groups) => {
          // var g1 = groups[0];
          // var g2 = groups[1];

          // g1.name = 'hanaa';
          // g1
          //   .put();

          // g2.remove();  
        });

      api
        .createGroup({name: 'hello'})
        .then(() => {
          //console.log('Created!');
        });
    });
})();