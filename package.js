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
    'mreaction:shadow-helpers@0.2.0',
    'meteor-platform', //we use all core standards
    'alanning:roles@1.2.13', 
    'kestanous:candid@0.3.0-pre3',
    'accounts-base'
  ])

  api.addFiles('private:groups.js');

  api.export('Group')
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('private:groups');
  api.addFiles('private:groups-tests.js');
});
