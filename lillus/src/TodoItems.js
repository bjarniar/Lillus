import React, { Component } from "react";
import FlipMove from 'react-flip-move';
import SelectionStore from './SelectionStore';
 
class TodoItems extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      selections: []
    };
    this.createTasks = this.createTasks.bind(this);
  }

  componentDidMount() {
    SelectionStore.getAll().then((data) => {
      console.log('get all', data);
      this.setState({
        selections: data.selections
      });
    });
  }

  delete(key) {
    console.log(key);
    SelectionStore.remove(key);
  }
 
  createTasks(item) {
    return <li onClick={() => this.delete(item.key)} 
              key={item.key}>{item.text}</li>
  }
 
  render() {
    var selections = this.state.selections;
    var listItems = selections.map(this.createTasks);
 
    return (
      <ul className="theList">
        <FlipMove duration={250} easing="ease-out">
          {listItems}
        </FlipMove>
      </ul>
    );
  }
};
 
export default TodoItems;