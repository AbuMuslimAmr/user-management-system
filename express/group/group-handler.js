var _ = require('lodash'),
    Group = require('../group/group'),
    EntityCollection = require('../helpers/entity-collection'),
    groups = new EntityCollection(),
    UserGroupTable = require('../helpers/user-group-table').get(),
    utils = require('../helpers/utils');

//************************************************//
//  POST Group handler
//************************************************//
function create(req, res) {
  var group = new Group({
        name: req.body.name
      });

  groups.push(group);

  res.send(group.get());
}

//************************************************//
//  GET Group handler
//************************************************//
function get(req, res) {
  var groupID = parseInt(req.params.id, 10);

  if (_.isNaN(groupID) === true) {
    res.send(groups.get());
  } else {
    var group = groups.find(groupID);
    res.send(group.get());
  }
}

//************************************************//
//  DELETE Group handler
//************************************************//
function remove(req, res) {
  var groupID = parseInt(req.params.id, 10),
      group = groups.remove(groupID);

  // removes all relations with this group
  UserGroupTable.removeGroup(groupID);
  
  res.send(group.get()); // the just deleted group
}

//************************************************//
//  PUT Group handler
//************************************************//
function update(req, res) {
  var groupID = parseInt(req.params.id, 10),
    updates = req.body;

  var group = groups.find(groupID);

  for (var key in updates) {
    group[key] = updates[key];
  }

  res.send(group.get());
}

//************************************************//
//  POST: add user to group handler
//************************************************//
function addUserToGroup(req, res) {
  var groupID = parseInt(req.params.group_id, 10),
    userID = parseInt(req.params.user_id, 10);

  UserGroupTable.addUserToGroup(userID, groupID);
  res.send(groups.find(groupID).get());
}

//************************************************//
//  DELETE: remove user from group handler
//************************************************//
function removeUserFromGroup(req, res) {
  var groupID = parseInt(req.params.group_id, 10),
    userID = parseInt(req.params.user_id, 10);

  UserGroupTable.removeUserFromGroup(userID, groupID);
  res.send(groups.find(groupID).get());
}

//************************************************//
//  Seed sample data
//************************************************//
var config = require('../config');

(function seed() {
  if (config.seed.groups > 0) {
    console.log('Seeding ' + config.seed.groups + ' groups...');
  }

  _.times(config.seed.groups, function(i) {
    var group = new Group({
      name: 'GR-' + utils.randomStr()
    });

    groups.push(group); 
  });
})();


module.exports = {
  create: create,
  get: get,
  remove: remove,
  update: update,
  addUserToGroup: addUserToGroup,
  removeUserFromGroup: removeUserFromGroup
};