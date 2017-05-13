/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  var dbClient = require('./api/DBClient/DBClient.controller');

  // Insert routes below
  app.use('/api/DBClients', require('./api/DBClient'));
  app.use('/api/things', require('./api/thing'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

   /*HTTP Methods*/

  //API for store the values in the DB
  app.route('/tinyUrl').post(dbClient.storeDB);

  //GET all values from database
  app.route('/tinyUrl').get(dbClient.showAll);

  //GET all values from database
  app.route('/tinyUrl/:id').get(dbClient.showDetailsUrl);

  //PUT HTTP Method, we are sending the id as parameter
  app.route('/tinyUrl/:id').put(dbClient.updateElement);

  //DELETE HTTP Method, we are sending the id as parameter
  app.route('/tinyUrl/:id').delete(dbClient.removeElement);

  //We're going to check if we have a shorten url for each GET request in the root path
  app.route('/*')
    .get(dbClient.searchDB);

  // All other routes should redirect to the index.html
  /*app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });*/
};
