import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      name: '',
      defaultAddress: '',
      adding: false
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancelAdd = this.handleCancelAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    FB.api('/me', res => {
      fetch('/profile', {
        method: 'post',
        body: JSON.stringify({ 
          'userID': res.id
        }),
        headers: { 
          'Content-Type': 'application/json' 
        } 
      }).then(res => {
        return res.json();
      }).then(res => {
        let defaultAddress = res.defaultAddress || 'none';
        this.setState({
          photo: res.photoUrl,
          name: res.name,
          defaultAddress: defaultAddress,
        });
      });
    });
  }

  handleAdd(e) {
    this.setState({
      adding: true,
    });
  }

  handleCancelAdd(e) {
    this.setState({
      adding: false,
    });
  }

  handleSave(e) {
    let defaultAddress = e.target.parentNode.children[1].value;
    FB.api('/me', res => {
      let saveOptions = {
        method: 'post',
        body: JSON.stringify({
          userID: res.id,
          defaultAddress: defaultAddress,
          get: false
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch('/default', saveOptions).then(res => {
        return res.text();
      }).then(res => {
        this.setState({ 
          adding: false,
          defaultAddress: res
        });
      });
    });
  }

  render() { 
    return (
      <div className="User-info">
        <h1>USER INFO</h1>
        <img className="User-photo" src={this.state.photo}></img>
        <div className="User-name">{this.state.name}</div>
        <div className="User-address">
          {this.state.adding === false ? (
            <div>
              <span>Default Address: {this.state.defaultAddress}</span>
              <button className="Default-edit" onClick={this.handleAdd}>Edit Default</button>
            </div>
          ) : (
            <div>
              <span>Default Address:</span>
              <input type="text" defaultValue={this.state.defaultAddress} required></input>
              <input type="submit" value="Save" onClick={this.handleSave}></input>
              <input type="submit" value="Cancel" onClick={this.handleCancelAdd}></input>
            </div>
          )}
        </div> 
      </div>
    );
  }
}


export default User;