var _ = require('lodash'),
    UserGroupTable = require('../helpers/user-group-table').get(),
    IDCounter = 1;

// class User
// takes care of ID
// and getting user groups
var User = function(user) {
  var that = this;
  this.id = IDCounter++;

  for (var key in user) {
    this[key] = user[key];
  }

  // this method to return a decorated object
  // holds a reference to associated users
  this.get = function() {
    var decoratedObject = {};

    for (var key in that) {
      if (_.isFunction(that[key]) === false) {
        decoratedObject[key] = that[key];
      }
    }

    decoratedObject.groups = UserGroupTable.getUserGroups(that.id);
    return decoratedObject;
  };
};

module.exports = User;