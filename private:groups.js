Group = new Mongo.Collection('groups');

// Meteor.users.$helpers = Meteor.users.$helpers || {}
// Meteor.users.$helpers.addRole = function (role, group) {}
// Meteor.users.$helpers.removeRole = function (role, group) {}

Group.$helpers.create = function () {
  Meteor.call('addGroup', this.$data())
}


Meteor.methods({
 'addGroup': function (groupObj) {
    if (!_.isObject(groupObj)) {
      throw new Meteor.Error('not-object', 'arguments must be in object form')
    }
    try {
      var id = Group.insert(groupObj);
      var query = { $addToSet: {} }
      query.$addToSet['roles.' + id] = Group.adminRole
      Meteor.users.update(this.userId, query)
      return id;
    } catch (err) {
      throw new Meteor.Error('Error', err.message)
    }
  }
});


Can.do({
  action: 'method',
  subject: 'addGroup',
  user: function (user, params) {
    if (user) { 
      if (Meteor.isServer) {
        return user.admin; //only available on server
      } else {
        return true; //simulate for client
      }
    };
  }
});