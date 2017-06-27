import React, { Component } from 'react';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      address: ''
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancelAdd = this.handleCancelAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
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
        this.setState({ adding: false });
      });
    });
  }

  render() {
    console.log(this.state.address, 'address!');
    return (
      <div className="Address">
        <input type="text" value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} required></input>
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