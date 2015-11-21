var _ = require('lodash'),
    Group = require('../group/group'),
    GroupCollection = require('../group/group-collection'),
    groups = new GroupCollection();

//************************************************//
//  POST handler
//************************************************//
function create(req, res) {
  var name = req.body.name,
      group = new Group(name);

  groups.push(group);

  res.send(group.get());
}

//************************************************//
//  GET handler
//************************************************//
function get(req, res) {
  var groupID = req.params.id;

  if (_.isUndefined(groupID) === true) {
    res.send(groups.get());
  } else {
    var group = groups.find(groupID);
    res.send(group.get());
  }
}

//************************************************//
//  DELETE handler
//************************************************//
function remove(req, res) {
  var groupID = req.params.id,
      group = groups.remove(groupID);

  res.send(group.get()); // the just deleted group
}

//************************************************//
//  PUT handler
//************************************************//
function update(req, res) {
  var groupID = req.params.id,
    updates = req.body;

  var group = groups.find(groupID);

  for (var key in updates) {
    group[key] = updates[key];
  }

  res.send(group.get());
}

//************************************************//
//  Seed sample data
//************************************************//
(function seed() {
  _.times(10, function(i) {
    var group = new Group('name ' + i);
    groups.push(group); 
  });
})();


module.exports = {
  create: create,
  get: get,
  remove: remove,
  update: update
};