'use strict';

angular.module('tinyUrlApp')
  .service('TinyCalls', ['Proxy', function (Proxy) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.postTinyUrl = function(longUrl, shortUrl){
    	var param = {
    		url : longUrl,
    		alias :  shortUrl
    	};
    	return Proxy.postCall(param, '/tinyUrl');
    };

    this.getUrlList = function(){
      return Proxy.getCall('/tinyUrl');
    };

    this.getUrlDetails = function(id){
      return Proxy.getCall('/tinyUrl/'+ id);
    };

    this.updateUrl = function(id, originalUrl, tinyUrl){
      var param = {
        url : originalUrl,
        alias :  tinyUrl
      };
      return Proxy.putCall(param, '/tinyUrl/' + id);
    };

    this.deleteUrl = function(id){
      return Proxy.deleteCall('/tinyUrl/'+ id);
    };

  }]);
