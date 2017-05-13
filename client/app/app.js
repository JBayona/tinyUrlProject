'use strict';

angular.module('tinyUrlApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngMessages',
  'ngRoute',
  'ui.bootstrap'
])
 .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/showList', {
        templateUrl: 'app/showList/showList.html',
        controller: 'ShowListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.hashPrefix('');
  })
 .run(['$rootScope', '$location','material', function($rootScope, $location, material){
    material.init(); //We load the material design library when the application routeChangeStart
 }]);
