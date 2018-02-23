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
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.159:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// Routes
server.get('/selections', function(req, res, next) {
  database.getAll('./lillus/src/data/selections.json', function(selections) {
    res.send(selections);
    next();
  });
});

/*server.post('/selections', function(req, res, next) {
  var selectedNames = req.body;
  database.add(selectedNames, function(selections) {
    res.send(selections);
    next();
  });
});*/

server.post('/selections/:username', function(req, res, next) {
  var selectedNames = req.body;
  var username = req.params.username;
  database.add(selectedNames, username, function(selections) {
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

server.get('/selections/fetchNew/:username', function(req, res, next) {
  var username = req.params.username;

  database.fetchNewNames(username, function(names) {
    res.send(names);
    next();
  });
});

server.get('/users/find/:user', function(req, res, next) {
  var username = req.params.user;

  database.findUser(username, function(user) {
    res.send(user);
    next();
  });
});

server.post('/users/add', function(req, res, next) {
  database.addUser(function(users) {
    res.send(users);
    next();
  });
});

// Start listening
var PORT = 3001;
server.listen(PORT, function() {
  console.log('listening at %s', PORT);
});


