import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

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
    let defaultAddress = findDOMNode(this.refs.default).value;
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
    const inputStyle = {
      height: '30px',
      fontSize: '18px',
      paddingLeft: '5px',
      marginRight: '5px'
    }

    return (
      <div className="ui padded segment">
        <div className="ui stackable divided grid">
          <div className="stretched row">
            <div className="two wide column">
              <img className="ui avatar image small" src={this.state.photo}></img>
            </div>
            <div className="thirteen wide column">
              <div className="row"></div>
              <h1 className="ui header">
                  {this.state.name}
              {this.state.adding === false ? (
                <span>
                  <div className="ui sub header">
                      Default Address: {this.state.defaultAddress}
                  </div>
                  <div>
                    <button className="ui primary button" onClick={this.handleAdd}>Edit Default</button>
                  </div>
                </span>
              ) : (
                <span>
                  <div className="ui sub header">
                      Default Address:
                  </div>
                  <div className="ui small input" style={{height: '30px', verticalAlign: 'middle'}}>
                    <input type="text" defaultValue={this.state.defaultAddress} style={inputStyle} size='50' ref="default" required></input>
                    <button className="ui button" onClick={this.handleSave}>Save</button>
                    <button className="ui button" onClick={this.handleCancelAdd}>Cancel</button>
                  </div>
                </span>
              )}
              </h1>
            </div> 
          </div>
        </div>
      </div>
    );
  }
}


export default User;