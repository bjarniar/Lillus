import React, { Component } from "react";
import TodoItems from "./TodoItems";
import CheckBoxList from "./CheckBoxList";
import SelectionStore from './SelectionStore';
import "./TodoList.css";

class TodoList extends Component {
  constructor(props, context) {
    super(props, context);
 
    this.state = {
      items: [],
      selectedNames: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
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

  render() {
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
}
 
export default TodoList;