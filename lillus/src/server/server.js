var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var database = require('./database');

// Create server
var server = express();
server.use(bodyParser.json());

// Middleware
server.use(function (req, res, next) {
  // allow origin for demo purposes
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// Routes
server.get('/selections', function(req, res, next) {
  database.getAll(function(selections) {
    res.send(selections);
    next();
  });
});

server.post('/selections', function(req, res, next) {
  var selectedNames = req.body;
  database.add(selectedNames, function(selections) {
    res.send(selections);
    next();
  });
});

server.delete('/selections/:id', function(req, res, next) {
  var id = req.params.id;
  
  database.del(id, function(selections) {
    res.send(selections);
    next();
  });
});

server.get('/selections/fetchNew', function(req, res, next) {
  database.fetchNewNames(function(names) {
    res.send(names);
    next();
  });
});

// Start listening
var PORT = 3001;
server.listen(PORT, function() {
  console.log('listening at %s', PORT);
});


