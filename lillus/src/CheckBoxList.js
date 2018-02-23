import React, { Component } from "react";
import SelectionStore from './SelectionStore';
import "./lib/pretty-checkbox.min.css";
import "./lib/mdi/css/materialdesignicons.min.css";

class CheckBoxList extends Component {

  constructor(props, context) {
    super(props, context);
 
    this.state = {
      activeUser: this.props.activeUser,
      confirmedSelections: this.props.confirmedSelections,
      data: this.props.defaultData || []
    };

    this.handleItemChange = this.handleItemChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    SelectionStore.fetchNewNames(this.state.activeUser)
      .then(res => this.setState({ data: res }) )
  }

	handleItemChange(e) {
		var selectedValues = [],
			newData = [];

		this.state.data.forEach(function(item) {
			if(item.value === e.target.value) {
				item.checked = e.target.checked;
			}
			if(item.checked) {
				selectedValues.push(item.value);
			}
			newData.push(item);
		});

		this.setState({data: newData});

		if(this.props.onChange) {
			this.props.onChange(selectedValues);
		}
	}

	reset(newData) {
    SelectionStore.fetchNewNames(this.state.activeUser)
      .then(res => this.setState({ data: res }) )
  }
  
  renderSelection(item, index) {
    return (
      <div key={'chk-' + index} className="pretty p-icon p-round p-tada">
        <input type="checkbox" 
                value={item.value}
                onChange={this.handleItemChange}
                checked={item.checked ? true : false}/>
        <div className="state p-primary-o">
          <i className="icon mdi mdi-heart"></i>
          <label>{item.value}</label>
        </div>
      </div>
    )
  }

  renderConfirmed(item, index) {
    return (
      <div key={'chk-' + index} className="pretty p-icon p-round p-tada">
        <input type="checkbox" 
                value={item.value}
                checked={item.checked ? true : false}/>
        <div className={"state p-primary-o" + (item.checked ? "" : " greyed")}>
          <i className="icon mdi mdi-check-circle"></i>
          <label disabled={!item.checked}>{item.value}</label>
        </div>
      </div>
    )
  }

  renderNames() {
    var options;

		options = this.state.data.map(function(item, index) {
      return this.props.confirmedSelections ? this.renderConfirmed(item, index) : this.renderSelection(item, index)
		}.bind(this));

		return (
			React.createElement("div", null, 
				options
			)
		);
  }

	render() {
		return this.state.data.length > 1 ? this.renderNames() : (
      <span>Loading names...</span>
    )
	}
};

export default CheckBoxList;