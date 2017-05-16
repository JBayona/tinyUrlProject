'use strict';

var _ = require('lodash');
var url = require('url');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var autoIncrement = require("mongodb-autoincrement");
var format = require('util').format;
var urlDB = 'mongodb://127.0.0.1:27017/mydb';
var encode = require('./../../utils/encode62/encode');
var decode = require('./../../utils/decode62/decode');
var sequence = require('./../../utils/sequence/getSequence');
var mongoUtil = require('./../../utils/mongoDB/mongo');

// Get list of DBClients
exports.index = function(req, res) {
  res.json([]);
};

module.exports.storeDB = function(request, response) {
	var data = request.body;
  var originalUrl = data.url;
  var tinyUrl = data.alias;
  var visited = 0;
  var criteria = null;
  var payload = {
    		'originalUrl':originalUrl, 
    		'visited' : 0
  };
  if(tinyUrl){
  	criteria = {tinyUrl : tinyUrl};
  	mongoUtil.findElementBD(function(result){
  		if(result){
  			sequence.getNextSequenceValue("sequenceid").then(function(seqId){
			    	payload['tinyUrl'] = encode.encodeBase64(seqId);
			    	mongoUtil.insertDB(function(result){
			    		result.notAvailable = true;
			    		response.json(result);
			    	}, payload)
  			});
  		}else{
  			payload['tinyUrl'] = tinyUrl;
  			mongoUtil.insertDB(function(result){
			    		response.json(result);
	    	}, payload);
  		}
  	}, criteria)
  }else{
  	sequence.getNextSequenceValue("sequenceid").then(function(seqId){
    	payload['tinyUrl'] = encode.encodeBase64(seqId);
    	mongoUtil.insertDB(function(result){
    		response.json(result);
    	}, payload)
    });
  }
}

module.exports.showAll = function(request, response){
  mongoUtil.showList(function(results){
  	response.send(results)
  });
}

module.exports.showDetailsUrl = function(request, response){
  var id = request.params.id;
  mongoUtil.showDetailUrl(function(result){
  	response.send(result);
  }, id);
}

module.exports.removeElement = function(request, response){
  var id = request.params.id;
  mongoUtil.removeUrl(function(err){
  	if(err){
  		response.statusCode = 403;
      response.send(error);
  	}
  	response.send({});
  }, id);
}

module.exports.updateElement = function(request, response){
  var id = request.params.id;
  var data = request.body;
  var item = {
    originalUrl: request.body.url,
    tinyUrl: request.body.alias
  };
  mongoUtil.updateUrl(function(result){
  	response.json(result);
  }, id, item);
}

// Retrive the real url from db based on the tiny pathname from request
module.exports.searchDB = function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var id = null;
    pathname = pathname.substring(1);
    var criteria = {'tinyUrl':pathname};
    mongoUtil.findElementBD(function(result){
    	if(result){
    		id = result['_id'];
    		mongoUtil.countUrlVisited(function(result){
    			//Do updated things
    		},id);
    		var realUrl = result['originalUrl'];
        redirect(realUrl, response);
    	}else{
        if (request.accepts('html')) {
          response.render('404_Custom', { url: request.url });
          return;
        }
      }
    }, criteria);
}

// Redirect to the real url
function redirect(url, response) {
	let redirect = url;
	if(url.indexOf('http') === -1 && url.indexOf('https') === -1){
		redirect = 'http://' + url;
	}
  response.writeHead(301, {Location: redirect}); //{Location: 'http://' + url}
  response.end();
}