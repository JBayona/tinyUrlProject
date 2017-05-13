'use strict';

describe('Controller: ShowListCtrl', function () {

  // load the controller's module
  beforeEach(module('tinyUrlApp'));

  var ShowListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowListCtrl = $controller('ShowListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
