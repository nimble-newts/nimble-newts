import React, { Component } from 'react';

class Address extends Component {
  constructor(props) {
    super(props);

    this.handleAddress = this.props.handleAddress;

    this.state = {
      'adding': false,
      'friendAddress': ''
    };

    this.handleFriend = this.handleFriend.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleFriend(e) {
    this.setState({
      'adding': true,
      'friend_address': e.target.parentNode.children[0].value
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
        this.setState({ 'adding': false });
      });
    });
  }

  render() {
    return (
      <div className="Address">
        <input type="text" defaultValue={this.state.friendAddress} onChange={(e)=> this.handleAddress(e.target.value)}></input>
        {this.state.adding === false ? (
          <input type="submit" value="Add Friend" onClick={this.handleFriend}></input>
        ) : (
          <div>
            <input type="text" defaultValue="Enter a name!" required></input>
            <input type="submit" value="Save" onClick={this.handleSave}></input>
          </div>
        )}
      </div>
    );
  }
}
        
export default Address;