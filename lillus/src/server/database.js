var fs = require('fs');
var _ = require('lodash');

var DATA_SELECTED = './lillus/src/data/selections.json';
var NEW_NAMES = './lillus/src/data/test.txt';
var PRETTIFY_WS = 4;

function getAll(resolve) {
  fs.readFile(DATA_SELECTED, function(err, data) {
    resolve(JSON.parse(data));
  });
}

function commit(data, resolve) {
  fs.writeFile(DATA_SELECTED, JSON.stringify(data, null, PRETTIFY_WS));
}

function add(selectedNames, resolve) {
  getAll(function (data) {
    data.selections = data.selections.concat(selectedNames);
    commit(data);
    resolve(data);
  });
}

function del(id, resolve) {
  getAll(function (data) {
    var selections = _.filter(data.selections, function (selection) {
        return selection.id != id;
    });
    data.selections = selections;
    commit(data);
    resolve(data);
  });
}

function fetchNewNames(resolve) {
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
}

module.exports = {
  getAll: getAll,
  commit: commit,
  add: add,
  del: del,
  fetchNewNames, fetchNewNames
}