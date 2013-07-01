
var settings = require('settings')
  , angular = require('angularjs');

function keyName(name) {
  return 'settings:' + name;
}

function clear(name, next) {
  var key = keyName(name)
    , obj = {};
  obj[key] = {};
  chrome.storage.sync.set(obj, function (obj) {
    next && next();
  });
}

function load(manager, next) {
  var key = keyName(manager.name);
  chrome.storage.sync.get(key, function (obj) {
    manager.load(obj[key]);
    next && next();
  });
}

function save(manager, next) {
  var key = keyName(manager.name)
    , obj = {};
  obj[key] = manager.json();
  chrome.storage.sync.set(obj, function (obj) {
    next && next();
  });
}

var mod = angular.module('settings-chrome-storage', [])
  .directive('clearChromeStorage', function () {
    return {
      restrict: 'A',
      link: function (scope, el, attrs) {
        var name = attrs.clearChromeStorage;
        el[0].addEventListener('click', function () {
          clear(name, function () {
            location.reload();
          });
        });
      }
    };
  })
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

