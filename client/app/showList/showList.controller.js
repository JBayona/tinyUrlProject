'use strict';

angular.module('tinyUrlApp')
  .controller('ShowListCtrl', ['$scope','$http','$timeout', 'TinyCalls',function ($scope,$http,$timeout, TinyCalls) {
    $scope.tinyList = [];
  	var getListUrls = function(){
  		TinyCalls.getUrlList().then(function(data){
  			$scope.tinyList = data;
  			$scope.tinyList.forEach(function(url){
  				url.completeUrl = window.location.origin + '/' + url.tinyUrl
  			});
  		});
  	};

  	$scope.updateUrl = function(id, originalUrl, tinyUrl){
  		TinyCalls.updateUrl(id, originalUrl, tinyUrl).then(function(data){
  			getListUrls();
  		})
  	};

  	$scope.deleteUrl = function(id){
  		TinyCalls.deleteUrl(id).then(function(data){
  			getListUrls();
  		});
  	};

  	$scope.getUrlDetails = function(id){
  		TinyCalls.getUrlDetails(id).then(function(data){
  			console.log(data);
  		});
  	}

    //init routines
    getListUrls();

  }]);
