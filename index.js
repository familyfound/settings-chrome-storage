
var settings = require('settings')
  , angular = require('angularjs')
  , angularSettings = require('angular-settings');

function load(manager, next) {
  var key = manager.name + '.angularSettings';
  chrome.storage.sync.get(key, function (obj) {
    manager.load(obj[key]);
    next && next();
  });
}

function save(manager, next) {
  var key = manager.name + '.angularSettings'
    , obj = {};
  obj[key] = manager.json();
  chrome.storage.sync.set(obj, function (obj) {
    next && next();
  });
}

angular.module('chrome-storage', [])
  .directive('chromeStorage', function () {
    return {
      restrict: 'A',
      link: function (scope, el, attrs) {
        var name = attrs.chromeStorage
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
  save: save
};

