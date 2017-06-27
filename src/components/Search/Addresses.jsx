import React, { Component } from 'react';
import Address from './Address.jsx';

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = { //refactor with redux
      number: 1,
      address: ''      
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddressText = this.handleAddressText.bind(this);
  }

  handleAdd(e) {
    this.setState(prevState => {
      return { 'number': prevState.number + 1 };
    });
  }

  handleAddressText(e) {
    this.setState({
      address: e.target.value
    });
  }


  render() {
    let addresses = [];
    for (let i = 0; i < this.state.number; i++) {
      addresses.push(<Address key={i}/>);
    }

    return (
      <div className="Addresses">
        {addresses}
        <input type="text" onChange={this.handleAddressText} placeholder='Input address'></input>        
        {this.state.number === 4 ? (
          <input type="submit" disabled="disabled" value="Add Address"></input>
        ) : (
          <input type="submit" onClick={this.handleAdd} value="Add Address"></input>
        )}
      </div>
    );
  }
}

export default Addresses;