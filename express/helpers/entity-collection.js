var _ = require('lodash');

// class EntityCollection wraps collection logic
// add, find, remove and list
var EntityCollection = function() {
  var that = this;
  this.entities = [];
  
  this.push = function(entity) {
    that.entities.push(entity);
  };

  this.find = function(entityID) {
    return _.find(that.entities, function(entity) {
      return entity.id === entityID;
    });
  };

  this.remove = function(entityID) {
    return _.first(_.remove(that.entities, function(entity) {
      return entity.id === entityID;
    }));
  };

  this.get = function() {
    // we need this entities clone to return some kind of
    // decorated entities
    var entities = [];

    _.each(that.entities, function(entity) {
      entities.push(entity.get());
    });

    return entities;
  };
};

module.exports = EntityCollection;