'use strict';

angular.module('tinyUrlApp')
  .service('material', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $.material;
  });
