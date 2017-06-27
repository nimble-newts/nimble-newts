import React, { Component } from 'react';
import Address from './Address.jsx';

class Addresses extends Component {
  constructor(props) {
    super(props);

    this.handleAddress = this.props.handleAddress;
    this.handleAddAddress = this.props.handleAddAddress;

    this.state = { 
      number: 1,
      address: ''      
    };

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    this.setState(prevState => {
      return { 'number': prevState.number + 1 };
    });
    
    this.handleAddAddress();
  }

  render() {
    let addresses = [];
    for (let i = 0; i < this.state.number; i++) {
      addresses.push(<Address key={i} handleAddress={this.handleAddress}/>);
    }

    return (
      <div className="Addresses">
        {addresses}
        {this.state.number === 4 ? (
          <input type="submit" disabled="disabled" value="Add Address" ></input>
        ) : (
          <input type="submit" onClick={this.handleAdd} value="Add Address"></input>
        )}
      </div>
    );
  }
}

export default Addresses;