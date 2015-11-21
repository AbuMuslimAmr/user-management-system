//
// This is simple User-Group relationship manager
// it simulates an n-to-n relation table in relational DBs
// It's a singelton class 
//
var _ = require('lodash');

//************************************************//
//  Relation Class
//************************************************//
var Relation = function(userID, groupID) {
  this.userID = userID;
  this.groupID = groupID;
};

//************************************************//
//  Relation Table Singelton Class
//************************************************//
var UserGroupTable = function() {
  var that = this;
  this.relations = [];

  // adds a relation between a user and a group
  this.addUserToGroup = function(userID, groupID) {
    this.relations.push(new Relation(userID, groupID));
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

  // removes user from set of groups
  this.removeUserGroups = function(userID, groupIDs) {
    _.remove(this.relations, function(relation) {
      return relation.userID === userID && 
             groupIDs.indexOf(relation.groupID) !== -1;
    });
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

  // removes users from a specific group
  this.removeGroupUsers = function(groupID, userIDs) {
    _.remove(this.relations, function(relation) {
      return relation.groupID === groupID && 
             userIDs.indexOf(relation.userID) !== -1;
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