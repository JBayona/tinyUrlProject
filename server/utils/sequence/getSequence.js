'use strict';

var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const urlDB = 'mongodb://127.0.0.1:27017/mydb';

module.exports.getNextSequenceValue = function(sequenceId){
  let sequenceDocument = 0;
  let test = undefined;
  let result = 0;

  return new Promise(function(resolve, reject){
    MongoClient.connect(urlDB, function(err, db) {
      if(err) throw err;
      db.collection('counters').findAndModify(  
          {_id: sequenceId},
          [],
          {$inc:{sequence_value:1}},
          { new:true },function(error, result) {
            sequenceDocument = result.value.sequence_value;
            resolve(sequenceDocument);
      });
    });
  });
}

module.exports.getNextValue = function(sequenceId){
  let sequenceDocument = 0;
  let test = undefined;
  let result = 0;

  return new Promise(function(resolve, reject){
    MongoClient.connect(urlDB, function(err, db) {
      if(err) throw err;
      db.collection('counters').find().toArray(function(error, results) {
        resolve(results[0].sequence_value);
      });
    });
  });
}


module.exports.updateNextSequenceValue = function(sequenceId, id){
  let sequenceDocument = 0;
  let test = undefined;
  let result = 0;

  return new Promise(function(resolve, reject){
    MongoClient.connect(urlDB, function(err, db) {
      if(err) throw err;
      db.collection('counters').findAndModify(  
          {_id: sequenceId},
          [],
          {$set:{sequence_value: id }},
          { new:true },function(error, result) {
            sequenceDocument = result.value.sequence_value;
            resolve(sequenceDocument);
      });
    });
  });
}


