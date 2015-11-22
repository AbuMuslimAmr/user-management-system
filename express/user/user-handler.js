var _ = require('lodash'),
    User = require('../user/user'),
    EntityCollection = require('../helpers/entity-collection'),
    users = new EntityCollection(),
    UserGroupTable = require('../helpers/user-group-table').get();

//************************************************//
//  POST User handler
//************************************************//
function create(req, res) {
  var user = new User({
        name: req.body.name
      });

  users.push(user);

  res.send(user.get());
}

//************************************************//
//  GET User handler
//************************************************//
function get(req, res) {
  var userID = parseInt(req.params.id, 10);

  if (_.isUndefined(userID) === true) {
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
(function seed() {
  _.times(20, function(i) {
    var user = new User({
      name: 'user ' + i,
      email: 'user' + 1 + '@domain.com' 
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