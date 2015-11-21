var Group = require('./handlers/group-handler'),
    User = require('./handlers/user-handler');

module.exports = function(app) {
  console.log('Initializing routes...');

  // Group APIs
  app.post('/group', Group.create);
  app.get('/group/:id?', Group.get);
  app.delete('/group/:id', Group.remove);
  app.put('/group/:id', Group.update);

  // User APIs
  app.post('user', User.create);
  app.get('user', User.list);
  app.delete('user', User.remove);
  app.put('user', User.update);
};