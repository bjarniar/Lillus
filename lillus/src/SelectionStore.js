import _ from 'lodash';
import $ from 'jquery';
import SelectionData from './SelectionData';

const URL = 'http://localhost:3001/selections'

function getAll() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: URL,
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
      url: `${URL}/${selection.id}`,
      method: 'DELETE',
      dataType: 'json',
      success: resolve,
      error: reject
    });
  });
}

function add(selectedNamesArray) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${URL}`,
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

function fetchNewNames() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${URL}/fetchNew`,
      method: 'GET',
      dataType: 'json',
      success: resolve,
      error: reject
    });
  });
}

class SelectionStore {
  
  constructor() {
    this.idCount = 10; 
    this.subscribers = [];
  }
  
  add(selectedNames) {
    let selectedNamesArray = [];
    selectedNames.forEach(name => {
      this.idCount++;
      let selection = new SelectionData(name, this.idCount);
      selectedNamesArray.push(selection);
    });
    
    add(selectedNamesArray).then(() => {
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

  fetchNewNames() {
    return fetchNewNames();
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