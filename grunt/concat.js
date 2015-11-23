module.exports = function(grunt, config) {
  return {
    options: {
      separator: '\n',
    },
    dist: {
      src: [
        'src/app/app.js',
        'src/app/app-run.js',
        'src/app/constants.js', 
        'src/app/routes.js',
        'src/app/services/api-srvc.js',
        'src/app/components/modal/modal-srvc.js',
        'src/app/components/modal/modal-ctrl.js',
        'src/app/states/groups/list/groups-ctrl.js',
        'src/app/states/groups/details/group-ctrl.js',
        'src/app/states/users/list/users-ctrl.js',
        'src/app/states/users/details/user-ctrl.js'
      ],
      dest: 'build/js/es6-app.js',
    },
  };  
};