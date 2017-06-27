import React, { Component } from 'react';
import Address from './Address.jsx';

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      number: 2,
      addresses: []      
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    this.setState(prevState => {
      return { number: prevState.number + 1 };
    });
  }

  handleDelete(e) {
    let currentAddresses = [];
    let deleteValue = e.target.parentNode.children[0].value;
    let children = e.target.parentNode.parentNode.children;
    for (let i = 0; i < children.length - 1; i++) {
      let childValue = children[i].children[0].value;
      if (childValue !== deleteValue) { currentAddresses.push(childValue); }
    }

    this.setState(prevState => {
      return { 
        number: prevState.number - 1,
        addresses: currentAddresses
      };
    });
  }

  render() {
    let addresses = [];
    for (let i = 0; i < this.state.number; i++) {
      let address = this.state.addresses[i];
      addresses.push(<Address addressNumber={this.state.number} address={address} onDelete={this.handleDelete} key={i} />);
    }

    return (
      <div className="Addresses">
        {addresses}
        {this.state.number === 5 ? (
          <input type="submit" disabled="disabled" value="Add Address" ></input>
        ) : (
          <input type="submit" onClick={this.handleAdd} value="Add Address"></input>
        )}
      </div>
    );
  }
}

export default Addresses;