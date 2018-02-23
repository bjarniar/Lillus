import _ from 'lodash';
import $ from 'jquery';
import SelectionData from './SelectionData';

const URL = 'http://192.168.1.159:3001'

function getAll() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: URL + '/selections',
      method: 'GET',
      dataType: 'json',
      success: resolve,
      error: reject
    });
  });
}

function remove(selection) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${URL}/selections/${selection.id}`,
      method: 'DELETE',
      dataType: 'json',
      success: resolve,
      error: reject
    });
  });
}

function add(selectedNamesArray, username) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${URL}/selections/${username}`,
      crossDomain: true,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: resolve,
      error: reject,
      data: JSON.stringify(selectedNamesArray)
    });
  });
}

/*function fetchNewNames() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${URL}/selections/fetchNew/`,
      method: 'GET',
      dataType: 'json',
      success: resolve,
      error: reject
    });
  });
}*/

function fetchNewNames(username) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${URL}/selections/fetchNew/${username}`,
      method: 'GET',
      dataType: 'json',
      success: resolve,
      error: reject
    });
  });
}

function findUser(userName) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${URL}/users/find/${userName}`,
      method: 'GET',
      dataType: 'json',
      success: resolve,
      error: reject
    });
  });
}

function addUser(user) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${URL}/users/add`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: resolve,
      error: reject,
      data: JSON.stringify(user)
    });
  });
}

class SelectionStore {
  
  constructor() {
    this.idCount = 10; 
    this.subscribers = [];

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.getAll = this.getAll.bind(this);
    this.fetchNewNames = this.fetchNewNames.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.publish = this.publish.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }
  
  add(selectedNames, username) {
    let selectedNamesArray = [];
    selectedNames.forEach(name => {
      this.idCount++;
      let selection = new SelectionData(name, this.idCount);
      selectedNamesArray.push(selection);
    });
    
    add(selectedNamesArray, username).then(() => {
      this.publish({
        actionType: 'add',
        data: selectedNamesArray
      });
    });
     
    return this.idCount;
  }
  
  remove(selection) {
    remove(selection).then(() => {
      this.publish({
          actionType: 'remove',
          data: selection
      });
    });
  }
  
  getAll() {
    return getAll();
  }

  fetchNewNames(username) {
    return fetchNewNames(username);
  }

  submitUser(username) {
    return findUser(username);
    /*return findUser(username).then((response) => {
      if (response === 'USER_NOT_FOUND') {
        let user = {
          username: username,
          timestamp: new Date().toLocaleDateString(),
          id: 'lol'
        };
        addUser(user).then((response) => {
          //resolve(response);
        });
      } else {
        //resolve(response);
      }
    });*/
  }
  
  publish(action) {
    this.getAll().then((data) => {
      action.selections = data.selections;
      this.subscribers.forEach((subscriber) => {
        subscriber(action);
      });
    });
  }
  
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}

// export singleton
export default new SelectionStore();