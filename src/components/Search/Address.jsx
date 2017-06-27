import React, { Component } from 'react';

class Address extends Component {
  constructor(props) {
    super(props);

    this.handleAddress = this.props.handleAddress;

    this.state = {
      adding: false,
      friendAddress: ''
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancelAdd = this.handleCancelAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleAdd(e) {
    this.setState({
      adding: true,
      friendAddress: e.target.parentNode.children[0].value
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
        this.setState({ adding: false });
      });
    });
  }

  render() {
    return (
      <div className="Address">
        <input type="text" defaultValue={this.state.friendAddress} onChange={(e)=> this.handleAddress(e.target.value)}></input>
        {this.state.adding === false ? (
          <input type="submit" value="Add Friend" onClick={this.handleAdd}></input>
        ) : (
          <div>
            <input type="text" defaultValue="Enter a name!" required></input>
            <input type="submit" value="Save" onClick={this.handleSave}></input>
            <input type="submit" value="Cancel" onClick={this.handleCancelAdd}></input>
          </div>
        )}
      </div>
    );
  }
}
        
export default Address;