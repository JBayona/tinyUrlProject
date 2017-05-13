'use strict';

describe('Service: Proxy', function () {

  // load the service's module
  beforeEach(module('tinyUrlApp'));

  // instantiate service
  var Proxy;
  beforeEach(inject(function (_Proxy_) {
    Proxy = _Proxy_;
  }));

  it('should do something', function () {
    expect(!!Proxy).toBe(true);
  });

});
