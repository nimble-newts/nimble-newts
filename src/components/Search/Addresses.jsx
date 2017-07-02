import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
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

  componentWillReceiveProps(nextProps) {
    this.setState({ addresses: nextProps.currentAddresses });
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
    let target = e.target.parentNode.parentNode.children[0].children[0];
    // console.log('TARGET', e.target.parentNode.parentNode.children[0].children)
    let deleteValue = target.value;
    let addresses = $(findDOMNode(this.refs.addresses))[0].children;
    let deleteCount = 0;
    for (let i = 0; i < addresses.length - 1; i++) {
      let childValue = addresses[i].firstChild.firstChild.firstChild.value;
      if (childValue !== deleteValue || deleteCount === 1) { 
        currentAddresses.push(childValue);
      } else { deleteCount++; }
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
      <div className="ui items" ref="addresses">
        {addresses}
        {this.state.number === 5 ? (
          <button className="ui disabled secondary button" onClick={this.handleAdd}>Add Address</button>
        ) : (
          <button className="ui secondary button" onClick={this.handleAdd}>Add Address</button>
        )}
      </div>
    );
  }
}

export default Addresses;