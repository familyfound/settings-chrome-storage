
var settings = require('settings')
  , angular = require('angularjs');

function keyName(manager) {
  return 'settings:' + manager.name;
}

function load(manager, next) {
  var key = keyName(manager);
  chrome.storage.sync.get(key, function (obj) {
    manager.load(obj[key]);
    next && next();
  });
}

function save(manager, next) {
  var key = keyName(manager)
    , obj = {};
  obj[key] = manager.json();
  chrome.storage.sync.set(obj, function (obj) {
    next && next();
  });
}

var mod = angular.module('settings-chrome-storage', [])
  .directive('settingsChromeStorage', function () {
    return {
      restrict: 'A',
      link: function (scope, el, attrs) {
        if (!attrs.settingsManager) {
          console.warn('chrome-storage can only be used in connection with settings-manager');
          return;
        }
        var name = attrs.settingsChromeStorage
          , manager = settings.getSettings(name);
        scope.$watch('settings', function (value) {
          save(manager);
        }, true);
        load(manager, function () {
          scope.$digest();
        });
      }
    };
  });

module.exports = {
  load: load,
  save: save,
  module: mod
};

