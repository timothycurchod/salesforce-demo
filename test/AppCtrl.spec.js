describe('AppCtrl', function () {
  var scope, force, $state, location, rootScope;

  beforeEach(module('starter.controllers'));
  beforeEach(module('forceng'));
  beforeEach(module('ui.router')); // for the stateProvider dependency

  beforeEach(inject(function ($rootScope, $controller, force, _$state_, $location) {
    $state = _$state_;
    scope = $rootScope.$new();
    rootScope = $rootScope;
    $controller('AppCtrl', {
      $scope: scope
    });
    location = $location;
  }));

  it('should have a scope', function () {
    expect(scope).toBeDefined();
  });

  it('should change location when logout is called', function() {    
    location.path('/app/contactlist');
    rootScope.$apply();
    expect(location.path()).toBe('/app/contactlist');
    scope.logout();
    expect(location.path()).toBe('/test');
  });



})
