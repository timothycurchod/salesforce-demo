describe('AppCtrl', function () {
  var scope, force, $state;

  beforeEach(module('starter.controllers'));
  beforeEach(module('forceng'));
  beforeEach(module('ui.router')); // for the stateProvider dependency

  beforeEach(inject(function ($rootScope, $controller, force, _$state_) {
    $state = _$state_;
    scope = $rootScope.$new();
    $controller('AppCtrl', {
      $scope: scope
    });
  }));

  it('should have a scope', function () {
    expect(scope).toBeDefined();
  });

})
