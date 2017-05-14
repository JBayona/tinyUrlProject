'use strict';

var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const urlDB = 'mongodb://127.0.0.1:27017/mydb';
var _db;

module.exports.connectToServer = function(callBack){
  MongoClient.connect( urlDB, function( err, db ) {
      _db = db;
      return callBack( err, db );
    });
}

module.exports.getDB = function(){
  return _db;
}

module.exports.showList = function(callBack){
	this.connectToServer(function(err, db){
		if(err) throw err;
    db.collection('tinyUrl').find().toArray(function(error, results) {
      //response.send(results);
      //db.close();
      return callBack(results);
    });
	});
}

module.exports.showDetailUrl = function(callBack, id){
	this.connectToServer(function(err, db){
		if(err) throw err;
		db.collection('tinyUrl').findOne({_id : new mongodb.ObjectID(id)}, function(error, result) {
        //console.log(result);
        //response.send(result);
        //db.close();
        return callBack(result);
    });
	});
}

module.exports.removeUrl = function(callBack, id){
	this.connectToServer(function(err, db){
		 if(err) throw err;
		 db.collection('tinyUrl').deleteOne({_id : new mongodb.ObjectID(id)}, function(error, result){
      if (error){
        //response.statusCode = 403;
        //response.send(error);
        return callBack(error);
      }else{
      	return callBack();
      }
      //response.send({});
      //db.close();
    });
	});
}

module.exports.updateUrl = function(callBack, id, item){
	this.connectToServer(function(err, db){
		if(err) throw err;
    db.collection('tinyUrl').updateOne({_id : new mongodb.ObjectID(id)}, {$set: item},function(error, result){
      console.log('Information updated');
      //response.json(result);
      //db.close();
      return callBack(result);
    });
	});
}

module.exports.findElementBD = function(callBack, criteria){
	this.connectToServer(function(err, db) {
		if(err) throw err;
		db.collection('tinyUrl').findOne(criteria, function(error, result){
			return callBack(result);
		});
	});
}

module.exports.insertDB = function(callBack, payload){
	this.connectToServer(function(err, db) {
		if(err) throw err;
		db.collection('tinyUrl').insert(payload, function(err, docs){
		    //response.json(docs.ops[0]);
		    return callBack(docs.ops[0]);
		});
	});
}
