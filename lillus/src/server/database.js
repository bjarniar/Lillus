var fs = require('fs');
var _ = require('lodash');

var DATA = './lillus/src/data/selections.json';
var PRETTIFY_WS = 4;

function getAll(resolve) {
    fs.readFile(DATA, function(err, data) {
      resolve(JSON.parse(data));
    });
}

function commit(data, resolve) {
    fs.writeFile(DATA, JSON.stringify(data, null, PRETTIFY_WS));
}

function add(selection, resolve) {
    getAll(function (data) {
        data.selections.push(selection);
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

module.exports = {
  getAll: getAll,
  commit: commit,
  add: add,
  del: del
}