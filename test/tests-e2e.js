
var expect = require('chai').expect
  , bootstrap = require('ng-bootstrap')

// angular modules are already required in setup-e2e.js

after(function(){
  // bootstrap('template', 'test');
});

describe('chrome-storage', function(){
  var node, injector;
  beforeEach(function(){
    node = bootstrap.find('template', null, 'test');
    injector = angular.element(node).injector();
  });
  afterEach(function(){
    node.parentNode.removeChild(node);
    injector = undefined;
  });

  // put tests here
    
});

