var _ = require('lodash');

// class GroupCollection wraps collection logic
// add, find, remove and list
var GroupCollection = function() {
  var that = this;
  this.groups = [];
  
  this.push = function(group) {
    that.groups.push(group);
  };

  this.find = function(groupID) {
    return _.find(that.groups, function(group) {
      return group.id == groupID;
    });
  };

  this.remove = function(groupID) {
    return _.first(_.remove(that.groups, function(group) {
      return group.id == groupID;
    }));
  };

  this.get = function() {
    // we need this groups clone to return some kind of
    // decorated groups
    var groups = [];

    _.each(that.groups, function(group) {
      groups.push(group.get());
    });

    return groups;
  };
};

module.exports = GroupCollection;