import React, { Component } from "react";
import TodoItems from "./TodoItems";
import CheckBoxList from "./CheckBoxList";
import SelectionStore from './SelectionStore';
import "./TodoList.css";

class TodoList extends Component {
  constructor(props, context) {
    super(props, context);
 
    this.state = {
      user: '',
      items: [],
      selectedNames: []
    };

    this.login = this.login.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
  }

  login(e) {
    this.setState({
      user: "bjarni"
    });
  }

  addItem(e) {
    var selectedNames = this.state.selectedNames;

    if (selectedNames.length > 1) {
      SelectionStore.add(selectedNames);
    }

    this.refs.chkboxList.reset();
    e.preventDefault();
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });
   
    this.setState({
      items: filteredItems
    });
  }

  changeSelection(values) {
    this.setState({
      selectedNames: values
    });
  }

  renderSelection() {
    return (
      <div className="todoListMain">
        <div>
          <CheckBoxList ref="chkboxList" onChange={this.changeSelection} />
        </div>
        <div className="header">
          <form onSubmit={this.addItem}>
            <button type="submit">Confirm</button>
          </form>
        </div>
        <TodoItems entries={this.state.items}
                    delete={this.deleteItem}/>
      </div>
    );
  }

  renderLogin() {
    return (
      <div className="login">
        <form onSubmit={this.login}>
          Username: <input type="text" name="username"></input>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  render() {
    return this.state.user ? this.renderSelection() : this.renderLogin();
  }
}
 
export default TodoList;