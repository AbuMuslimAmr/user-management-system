module.exports = function(grunt, config) {
  return {
    options: {
      separator: '\n',
    },
    dist: {
      src: [
        'src/app/app.js',
        'src/app/constants.js', 
        'src/app/routes.js',
        'src/app/services/api-srvc.js',
        'src/app/directives/say-hi/say-hi.js',
        'src/app/states/groups/groups-ctrl.js',
        'src/app/states/group/group-ctrl.js',
        'src/app/states/users/users-ctrl.js'
      ],
      dest: 'build/js/es6-app.js',
    },
  };  
};