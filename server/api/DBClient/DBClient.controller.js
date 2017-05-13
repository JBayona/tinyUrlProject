'use strict';

var _ = require('lodash');
var url = require('url');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var urlDB = 'mongodb://127.0.0.1:27017/mydb';

// Get list of DBClients
exports.index = function(req, res) {
  res.json([]);
};

module.exports.storeDB = function(request, response) {
	var data = request.body;
    console.log(data);

    console.log("Get POST data : " + JSON.stringify(data));
    var originalUrl = data.url;
    var tinyUrl = data.alias;
    var visited = 0;
    console.log('originalUrl : ' + originalUrl + ' ; tinyUrl : ' + tinyUrl);

    MongoClient.connect(urlDB, function(err, db) {
      if(err) throw err;

      var collection = db.collection('tinyUrl');
      collection.find().toArray(function(err, results) {
              console.dir(results);
              db.close();
       });
      collection.insert({'originalUrl':originalUrl,'tinyUrl':tinyUrl, 'visited' : 0}, function(err, docs) {
          collection.count(function(err, count) {
              console.log(format('count = %s', count));
          });
          collection.find().toArray(function(err, results) {
              console.dir(results);
              db.close();
          });
      });
  });
  response.json(data);
}

module.exports.showAll = function(request, response){
  MongoClient.connect(urlDB, function(err, db) {
    if(err) throw err;
    db.collection('tinyUrl').find().toArray(function(err, results) {
        response.send(results);
        db.close();
    });
  });
}

module.exports.showDetailsUrl = function(request, response){
  var id = request.params.id;
  MongoClient.connect(urlDB, function(err, db) {
    if(err) throw err;
    db.collection('tinyUrl').findOne({_id : new mongodb.ObjectID(id)}, function(err, result) {
        console.log(result);
        response.send(result);
        db.close();
    });
  });
}

module.exports.removeElement = function(request, response){
  var id = request.params.id;
  MongoClient.connect(urlDB, function(err, db) {
    if(err) throw err;
    db.collection('tinyUrl').deleteOne({_id : new mongodb.ObjectID(id)}, function(error, result){
      if (error){
        response.statusCode = 403;
        response.send(error);
      }
      response.send({});
      db.close();
    });
  });
}

module.exports.updateElement = function(request, response){
  var id = request.params.id;
  var data = request.body;
  var item = {
    originalUrl: request.body.url,
    tinyUrl: request.body.alias
  };
  MongoClient.connect(urlDB, function(err, db) {
    if(err) throw err;
    db.collection('tinyUrl').updateOne({_id : new mongodb.ObjectID(id)}, {$set: item},function(error, result){
      console.log('Information updated');
      response.json(result);
      db.close();
    });
  });
}

// Retrive the real url from db based on the tiny pathname from request
module.exports.searchDB = function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('Request URL =' + request.url);
    console.log('Path name = ' + pathname);
    pathname = pathname.substring(1);
    console.log('Search real url for tinyUrl : ' + pathname);
    MongoClient.connect(urlDB, function(err, db) {
        if(err) throw err;
        db.collection('tinyUrl').find({'tinyUrl':pathname}).toArray(function(error, results) {
            if(results.length > 0) {
              console.log(results);
              var realUrl = results[0]['originalUrl']; 
              console.log('Found the real url ' + realUrl);
              redirect(realUrl, response);
              db.close();
            }else{
              console.log('Not found Testing');
              if (request.accepts('html')) {
                response.render('404_Custom', { url: request.url });
                return;
              }
              db.close();
            }
        });
    });
}

// Redirect to the real url
function redirect(url, response) {
    console.log('redirect to ' + url);
    response.writeHead(301, {Location: 'http://' + url});
    response.end();
}