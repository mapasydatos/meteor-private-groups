Groups = new Mongo.Collection('groups');
Groups.adminRole = '';

Meteor.users.helpers({
  addRole: function (role, group) {

  },
  removeRole: function (role, group) {

  }
});

Groups.helpers({
  create: function () {
    console.log(this.$data())
    // Meteor.call('addGroup', this.$data())
  }
});


Meteor.methods({
 'addGroup': function (groupObj) {
    if (!_.isObject(groupObj)) {
      throw new Meteor.Error('not-object', 'arguments must be in object form')
    }
    return Groups.insert(groupObj, function (err, _id) { 
      if (_id) {
        Roles.addUsersToRoles(this.userId, Groups.adminRole, _id)
      } else {
        throw new Meteor.Error('Error', err.sanitizedError.reason)
      }
    });
  }
});

Can.do({
  action: 'method',
  subject: 'addGroup',
  user: function (user, params) {
    if (user) { return user.admin; };
  }
});