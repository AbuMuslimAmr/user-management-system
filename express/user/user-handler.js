var _ = require('lodash'),
    User = require('../user/user'),
    EntityCollection = require('../helpers/entity-collection'),
    users = new EntityCollection(),
    UserGroupTable = require('../helpers/user-group-table').get(),
    utils = require('../helpers/utils');

//************************************************//
//  POST User handler
//************************************************//
function create(req, res) {
  var user = new User({
        name: req.body.name,
        email: req.body.email
      });

  users.push(user);

  res.send(user.get());
}

//************************************************//
//  GET User handler
//************************************************//
function get(req, res) {
  var userID = parseInt(req.params.id, 10);

  if (_.isNaN(userID) === true) {
    res.send(users.get());
  } else {
    var user = users.find(userID);
    res.send(user.get());
  }
}

//************************************************//
//  DELETE User handler
//************************************************//
function remove(req, res) {
  var userID = parseInt(req.params.id, 10),
      user = users.remove(userID);

  // removes all relations with this user
  UserGroupTable.removeUser(userID);

  res.send(user.get());
}

//************************************************//
//  PUT User handler
//************************************************//
function update(req, res) {
  var userID = parseInt(req.params.id, 10),
    updates = req.body;

  var user = users.find(userID);

  for (var key in updates) {
    user[key] = updates[key];
  }

  res.send(user.get());
}

//************************************************//
//  Seed sample data
//************************************************//
var config = require('../config');

(function seed() {
  if (config.seed.users > 0) {
    console.log('Seeding ' + config.seed.users + ' users...');
  }
  
  _.times(config.seed.users, function(i) {
    var name = utils.randomStr(),
      user = new User({
        name: 'US-' + name,
        email: name + '@domain.com' 
      });

    users.push(user);
  });
})();


module.exports = {
  create: create,
  get: get,
  remove: remove,
  update: update
};