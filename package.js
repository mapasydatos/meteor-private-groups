Package.describe({
  name: 'private:groups',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');

  api.use([
    'meteor-platform', //we use all core standards
    'alanning:roles@1.2.13', 
    'kestanous:candid'
  ])

  api.addFiles('private:groups.js');

  api.export('Groups')
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('private:groups');
  api.addFiles('private:groups-tests.js');
});
