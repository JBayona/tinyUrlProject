'use strict';

angular.module('tinyUrlApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/showList', {
        templateUrl: 'app/showList/showList.html',
        controller: 'ShowListCtrl'
      });
  });
