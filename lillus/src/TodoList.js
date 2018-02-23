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
      selectedNames: [],
      confirmedSelections: false
    };

    this.login = this.login.bind(this);
    this.bjarniLogin = this.bjarniLogin.bind(this);
    this.joninaLogin = this.joninaLogin.bind(this);
    this.confirmSelection = this.confirmSelection.bind(this);
    this.getNewNames = this.getNewNames.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
  }

  login(e) {
    this.setState({
      user: "bjarniar"
    });
    //SelectionStore.submitUser('bjarniar')
    //.then(function(lol) {
      /*this.setState({
        user: "bjarni"
      });*/
    //  console.log(lol);
    //})
    /*SelectionStore.submitUser('bjarniar')
      .then(res => this.setState({ user: res }) )*/
  }

  bjarniLogin(e) {
    this.setState({
      user: "bjarniar"
    });
  }

  joninaLogin(e) {
    this.setState({
      user: "joninagudny"
    });
  }

  confirmSelection(e) {
    var selectedNames = this.state.selectedNames;
    if (selectedNames.length > 1) {
      SelectionStore.add(selectedNames, this.state.user);
    }
    e.preventDefault();
    this.setState({
      confirmedSelections: true
    });
  }

  getNewNames(e) {
    this.refs.chkboxList.reset();
    e.preventDefault();
    this.setState({
      confirmedSelections: false
    });
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

  renderConfirmedSelections() {
    return (
      <div className="todoListMain">
        <div className="nameList">
          <CheckBoxList activeUser={this.state.user} confirmedSelections={true} ref="chkboxList" onChange={this.changeSelection} />
        </div>
        <div className="proceed">
          <form onSubmit={this.getNewNames}>
            <button type="submit">Ný nöfn</button>
          </form>
        </div>
        {/* <TodoItems entries={this.state.items}
                    delete={this.deleteItem}
                    user={this.state.user}/>*/}
      </div>
    );
  }

  renderNewSelections() {
    return (
      <div className="todoListMain">
        <div className="nameList">
          <CheckBoxList activeUser={this.state.user} confirmedSelections={false} ref="chkboxList" onChange={this.changeSelection} />
        </div>
        <div className="confirm">
          <form onSubmit={this.confirmSelection}>
            <button type="submit">Staðfesta</button>
          </form>
        </div>
        {/* <TodoItems entries={this.state.items}
                    delete={this.deleteItem}
                    user={this.state.user}/>*/}
      </div>
    );
  }

  renderSelection() {
    return this.state.confirmedSelections ? this.renderConfirmedSelections() : this.renderNewSelections();
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

  renderLoginTemp() {
    return (
      <div className="BJ-buttons">
        <div className="bjarni-login">
          <button className="user-button" onClick={this.bjarniLogin}>Bjarni</button>
        </div>
        <div className="jonina-login">
          <button className="user-button" onClick={this.joninaLogin}>Jónína</button>
        </div>
      </div>
    )
  }

  render() {
    return this.state.user ? this.renderSelection() : this.renderLoginTemp();
  }
}
 
export default TodoList;