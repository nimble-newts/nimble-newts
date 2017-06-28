import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      address: ''
    };

    this.friendsSource = [];
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancelAdd = this.handleCancelAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  populateSource(res) {
    let friendsArr = [];
    res.forEach(friend => {
      let friendObj = {};
      friendObj.label = friend.name;
      friendObj.value = friend.address;
      friendsArr.push(friendObj);
    });
    this.friendsSource = friendsArr;
  }

  componentDidMount() {
    FB.api('/me', res => {
      let getOptions = {
        method: 'post',
        body: JSON.stringify({
          userID: res.id,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch('/friends', getOptions).then(res => {
        return res.json();
      }).then(res => {
        this.populateSource(res);
      });
    });
  }

  componentWillReceiveProps(newProps) {
    let address = newProps.address === undefined ? this.state.address : newProps.address;
    this.setState({ address: address });
  }

  handleAdd(e) {
    this.setState({
      adding: true,
      address: e.target.parentNode.children[0].value
    });
  }

  handleCancelAdd(e) {
    this.setState({
      adding: false
    });
  }

  handleSave(e) {
    let saveAddress = e.target.parentNode.parentNode.children[0].value;
    let saveName = e.target.parentNode.children[0].value;
    FB.api('/me', res => {
      let saveOptions = {
        method: 'post',
        body: JSON.stringify({
          userID: res.id,
          address: saveAddress,
          name: saveName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch('/save', saveOptions).then(res => {
        return res.json();
      }).then(res => {
        this.populateSource(res);
        this.setState({ 
          adding: false,
        });
      });
    });
  }

  handleChange(e) {
    const el = findDOMNode(this.refs.address);
    $(el).autocomplete({
      source: this.friendsSource
    });
    this.setState({ address: e.target.value });
  }

  render() {
    return (
      <div className="Address">
        <input type="text" value={this.state.address} onChange={this.handleChange} ref="address" required></input>
        {this.state.adding === false ? (
          <input type="submit" value="Add Friend" onClick={this.handleAdd}></input>
        ) : (
          <div>
            <input type="text" placeholder="Enter a name!" required></input>
            <input type="submit" value="Save" onClick={this.handleSave}></input>
            <input type="submit" value="Cancel" onClick={this.handleCancelAdd}></input>
          </div>
        )}
        {this.props.addressNumber > 2 ? (
          <input type="submit" value="x" onClick={this.props.onDelete}></input>
        ) : (
          ''
        )}
      </div>
    );
  }
}
        
export default Address;