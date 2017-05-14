'use strict';

angular.module('tinyUrlApp')
  .controller('MainCtrl', ['$scope','$http','$timeout', 'Proxy', 'TinyCalls', function ($scope,$http,$timeout, Proxy, TinyCalls) {
    $scope.submitted = false;
    $scope.url = {};
    $scope.tinyCreated = {};
    $scope.tinyNotAvailableMsg = false;
    $scope.makeTiny = function(){
      $scope.submitted = true;
      TinyCalls.postTinyUrl($scope.url.long, $scope.url.custom).then(function(data){
          $scope.confirmation = true;
          $scope.tinyForm.$setPristine();
          $scope.url = {};
          $scope.tinyCreated = data;
          $scope.tinyNotAvailableMsg = data.notAvailable ? true: false;
          $scope.tinyCreated.completeUrl = window.location.origin + '/' + data.tinyUrl;
          /*$timeout(function(){
              $scope.confirmation = false;
          },3000);*/
      });
    };

  }]);