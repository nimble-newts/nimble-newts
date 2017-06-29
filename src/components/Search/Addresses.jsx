import React, { Component } from 'react';
import Address from './Address.jsx';

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      number: 2,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.addAddressToList = props.addAddressToList; 
  }

  componentDidMount() {
    let app = this;
    FB.api('/me', res => {
      fetch('/default', {
        method: 'post',
        body: JSON.stringify({ 
          userID: res.id,
          get: true 
        }),
        headers: { 'Content-Type': 'application/json'}
      }).then(res => {
        return res.text();
      }).then(res => {
        app.setState({ addresses: [res] });
      });
    });
  }

  handleAdd(e) {
    let currentAddresses = [];
    let children = e.target.parentNode.children;
    for (let i = 0; i < children.length - 1; i++) {
      currentAddresses.push(children[i].children[0].value);
    }
    currentAddresses.push('');

    this.setState(prevState => {
      return { 
        number: prevState.number + 1,
        addresses: currentAddresses 
      };
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
    let storedAddresses = this.props.addresses;
    let addresses = [];
    for (let i = 0; i < this.state.number; i++) {
      let address = addresses[i];
      addresses.push(
      <Address 
        changeAddress={this.props.changeAddress}
        storedAddress={storedAddresses[i]}
        index={i}
        addressNumber={this.state.number} 
        addAddressToList={this.addAddressToList} 
        address={address} 
        onDelete={this.handleDelete} 
        key={i} 
      />);
    }


    return (
      <div className="Addresses" ref="addresses">
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