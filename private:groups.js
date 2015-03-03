Groups = new Mongo.Collection('groups');
Groups.adminRole = '';


Meteor.methods({
 'addGroup': function (groupObj) {
    Roles.setUserRoles(Meteor.users.find(this.userId, {limit:1}), Groups.adminRole, '_id')
    if (!_.isObject(groupObj)) {
      throw new Meteor.Error('not-object', 'arguments must be in object form')
    }
    try {
      var id = Groups.insert(groupObj);
      var query = { $addToSet: {} }
      query.$addToSet['roles.' + id] = Groups.adminRole
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