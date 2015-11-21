var UserGroupTable = require('../helpers/user-group-manager').get(),
    IDCounter = 1;

// class Group represents Group entity and wraps the logic of auto-increment ID
// and getting group users
var Group = function(name) {
  var that = this;
  this.id = IDCounter++;
  this.name = name;

  // this method to return a decorated object
  // holds a reference to associated users
  this.get = function() {
    return {
      id: that.id,
      name: that.name,
      users: UserGroupTable.getGroupUsers(that.id)
    };
  };
};

module.exports = Group;