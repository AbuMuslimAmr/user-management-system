var Group = require('./group/group-handler'),
    User = require('./user/user-handler');

module.exports = function(app) {
  console.log('Initializing routes...');

  // Group APIs
  app.post('/group', Group.create);
  app.get('/group/:id?', Group.get);
  app.delete('/group/:id', Group.remove);
  app.put('/group/:id', Group.update);
  app.post('/group/:group_id/user/:user_id', Group.addUserToGroup);
  app.delete('/group/:group_id/user/:user_id', Group.removeUserFromGroup);

  // User APIs
  app.post('/user', User.create);
  app.get('/user/:id?', User.get);
  app.delete('/user/:id', User.remove);
  app.put('/user/:id', User.update);
};