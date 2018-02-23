var fs = require('fs');
var _ = require('lodash');

var DATA_PATH = './lillus/src/data/';
var SELECTIONS_FILE_NAME = 'selections.json';
var REMAINING_FILE_NAME = 'remaining.txt';
var DATA_SELECTED = './lillus/src/data/selections.json';
var NEW_NAMES = './lillus/src/data/test.txt';
var USERS_FILE = './lillus/src/data/users.json'
var PRETTIFY_WS = 4;

function getAll(path, resolve) {
  fs.readFile(path, function(err, data) {
    resolve(JSON.parse(data));
  });
}

function commit(path, data, resolve) {
  fs.writeFile(path, JSON.stringify(data, null, PRETTIFY_WS));
}

function add(selectedNames, username, resolve) {
  var userSelectionsFilePath = DATA_PATH + username + '-' + SELECTIONS_FILE_NAME;
  getAll(userSelectionsFilePath, function (data) {
    data.selections = data.selections.concat(selectedNames);
    commit(userSelectionsFilePath, data);
    resolve(data);
  });
}

function del(id, resolve) {
  getAll(DATA_SELECTED, function (data) {
    var selections = _.filter(data.selections, function (selection) {
      return selection.id != id;
    });
    data.selections = selections;
    commit(data);
    resolve(data);
  });
}

/*function fetchNewNames(resolve) {
  fs.readFile(NEW_NAMES, function(err, data) {
    let names = data.toString().split('\r\n');
    let newNames = names.splice(0, 10);
    var newData = [];
    newNames.forEach(function(name) {
      newData.push({
        value: name
      })
    })
    let stringForFile = names.join('\r\n')
    fs.writeFile(NEW_NAMES, stringForFile);
    resolve(newData);
  });
}*/

function fetchNewNames(username, resolve) {
  //username = username || '';
  let userRemainingFilePath = DATA_PATH + username + '-' + REMAINING_FILE_NAME;
  fs.readFile(userRemainingFilePath, function(err, data) {
    let names = data.toString().split('\r\n');
    let newNames = names.splice(0, 10);
    var newData = [];
    newNames.forEach(function(name) {
      newData.push({
        value: name
      })
    })
    let stringForFile = names.join('\r\n')
    fs.writeFile(userRemainingFilePath, stringForFile);
    resolve(newData);
  });
}

function findUser(usernameToFind, resolve) {
  getAll(USERS_FILE, function (data) {
    var user = data.users.find(function(user) {
      return user.username === usernameToFind;
    });
    resolve(user || 'USER_NOT_FOUND');
  });
}

function addUser(user, resolve) {
  getAll(USERS_FILE, function (data) {
    data.users = data.users.concat(user);
    commit(data);
    resolve(data);
  });
}

module.exports = {
  getAll: getAll,
  commit: commit,
  add: add,
  del: del,
  fetchNewNames, fetchNewNames,
  findUser, findUser,
  addUser, addUser
}