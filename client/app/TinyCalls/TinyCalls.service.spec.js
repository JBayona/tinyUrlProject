'use strict';

describe('Service: TinyCalls', function () {

  // load the service's module
  beforeEach(module('tinyUrlApp'));

  // instantiate service
  var TinyCalls;
  beforeEach(inject(function (_TinyCalls_) {
    TinyCalls = _TinyCalls_;
  }));

  it('should do something', function () {
    expect(!!TinyCalls).toBe(true);
  });

});
