import React, { Component } from "react";
import TodoItems from "./TodoItems";
import CheckBoxList from "./CheckBoxList";
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
    var itemArray = this.state.items;
    var selectedNames = this.state.selectedNames;

    selectedNames.forEach(name => {
      itemArray.unshift({
        text: name,
        key: Date.now() + name
      });
    });
    this.setState({
      items: itemArray
    });

    console.log(itemArray);
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
    var data = [
      {value: 'Bjarni', label: 'Bjarni'},
      {value: 'Magnús', label: 'Magnús'},
      {value: 'Gísli', label: 'Gísli'},
      {value: 'Kristján', label: 'Kristján'},
      {value: 'Daníel', label: 'Daníel'},
      {value: 'Davíð', label: 'Davíð'}
    ];
    return (
      <div className="todoListMain">
        <div>
          <CheckBoxList ref="chkboxList" defaultData={data} onChange={this.changeSelection} />
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