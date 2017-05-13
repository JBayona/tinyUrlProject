'use strict';

angular.module('tinyUrlApp')
  .service('Proxy', ['$q', '$http', function ($q, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var restCall = function(method, data, url, params, headers, external){
    	var defer = $q.defer();
    	var reqHeaders = external ? {} : {
			};
			var req = {
				  method: method,
				  url: url,
				  headers: reqHeaders,
				  data:data,
				  params:params
	  	};
	    $http(req).
		  	success(function(data, status, headers, config) {
		    	defer.resolve(data);
			}).
 	 		error(function(data, status, headers, config) {
	  			defer.reject(data);
	 		});
		 return defer.promise;
		};

		var getCall = function(url,params,headers){
			params = params ? params:{};
			return restCall('GET',{},url,params,headers);
		};

		var postCall = function(data,url,headers){
			return restCall('POST',data,url,{},headers);
		};

		var putCall = function(data,url){
			return restCall('PUT',data,url);
		};

		var getExternalCall = function(url,params,headers){
			params = params ? params:{};
			return restCall('GET',{},url,params,headers,true);
		};

		var deleteCall = function(url, data){
			return restCall('DELETE',data,url);
		};

		//Purpose
		return{
			postCall:postCall,
			putCall:putCall,
			getCall:getCall,
			getExternalCall:getExternalCall,
			deleteCall:deleteCall
		};

  }]);
