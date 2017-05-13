'use strict';

angular.module('tinyUrlApp')
  .controller('MainCtrl', ['$scope','$http','$timeout', function ($scope,$http,$timeout) {

    $scope.makeTiny = function(){
      /*TinyCalls.postTinyUrl($scope.url.long, $scope.url.custom).then(function(data){
          $scope.confirmation = true;
          $scope.tinyForm.$setPristine();
          $scope.url = [];
          $timeout(function(){
              $scope.confirmation = false;
          },3000);
      });*/
    };

  }]);