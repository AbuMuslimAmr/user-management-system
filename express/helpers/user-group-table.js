//
// This is simple User-Group relationship manager
// it simulates an n-to-n relation table in relational DBs
// It's a singelton class 
//
var _ = require('lodash'),
    Relation = require('./user-group-relation');

//************************************************//
//  Relation Table Singelton Class
//************************************************//
var UserGroupTable = function() {
  var that = this;
  this.relations = [];

  // checks if user us already in a group
  this.userInGroup = function(userID, groupID) {
    return _.isUndefined(_.find(that.relations, function(relation) {
      return relation.groupID === groupID && 
             relation.userID === userID;
    })) === false;
  };

  // adds a relation between a user and a group
  this.addUserToGroup = function(userID, groupID) {
    if (that.userInGroup(userID, groupID) === false) {
      that.relations.push(new Relation(userID, groupID));
    }
  };

  // removes user from a specific group
  this.removeUserFromGroup = function(userID, groupID) {
    _.remove(that.relations, function(relation) {
      return relation.groupID === groupID && 
             relation.userID === userID;
    });
  };

  // gets specific user groups
  this.getUserGroups = function(userID) {
    var groupIDs = [];

    _.each(that.relations, function(relation) {
      if (relation.userID === userID) {
        groupIDs.push(relation.groupID);
      }
    });

    return groupIDs;
  };

  // gets users of specific groups
  this.getGroupUsers = function(groupID) {
    var userIDs = [];

    _.each(that.relations, function(relation) {
      if (relation.groupID === groupID) {
        userIDs.push(relation.userID);
      }
    });

    return userIDs;
  };

  // removes all relations with specific group
  this.removeGroup = function(groupID) {
    _.remove(this.relations, function(relation) {
      return relation.groupID === groupID;
    });
  };

  // removes all relations with specific user
  this.removeUser = function(userID) {
    _.remove(this.relations, function(relation) {
      return relation.userID === userID;
    });
  };
};

// Singelton pattern
var instance;
function getInstance() {
  if (instance === undefined) {
    instance = new UserGroupTable();
  }

  return instance;
}

module.exports = {
  get: getInstance
};