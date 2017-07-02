import React, { Component } from 'react';
import Friend from './Friend.jsx';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      friends: []
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancelAdd = this.handleCancelAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
        this.setState({
          friends: res.friends
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
    e.preventDefault();
    console.log(e.target.children[0].children[0]);
    let saveName = e.target.children[0].children[0].children[1].value;
    let saveAddress = e.target.children[0].children[1].children[1].value;
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
        this.setState({ 
          adding: false,
          friends: res
        });
      });
    });
  }

  handleDelete(e) {
    let card = e.target.parentNode.children[0];
    let targetName = card.children[0].textContent;
    let targetAddress = card.children[1].textContent;
    FB.api('/me', res => {
      fetch('/friends', {
        method: 'put',
        body: JSON.stringify({
          'userID': res.id,
          'name': targetName,
          'address': targetAddress
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        return res.json();
      }).then(res => {
        this.setState({ friends: res });
      });
    });
  }

  render() {
    let friendsArr = [];
    for (let i = 0; i < this.state.friends.length; i++) {
      friendsArr.push(<Friend name={this.state.friends[i].name} address={this.state.friends[i].address} onDelete={this.handleDelete} key={i}/>);
    }

    return (
      <div className="ui padded grid">
        <div className="row">
          <h2 className="ui header">
            <i className="users icon"></i>
            <div className="content">
              Saved Friends
              <div className="sub header">
                Store your friends' addresses for faster access
              </div>
            </div>
          </h2>
          <div className="right floated right aligned seven wide column">
            {this.state.adding === false ? (
              <div>
                <button className="ui secondary button" onClick={this.handleAdd}>Add Friend</button>
              </div>
            ) : (
              <div className="ui segment">
                <form className="ui form" onSubmit={this.handleSave}>
                  <div className="two fields">
                    <div className="required field">
                      <label>Name:</label>
                      <input type="text" name="name" size="25" required></input>
                    </div>
                    <div className="required field">
                      <label>Address:</label>
                      <input type="text" name="address" size="25" required></input>
                    </div>
                  </div>
                  <button className="ui button">Save</button>
                  <button className="ui button" onClick={this.handleCancelAdd}>Cancel</button>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="ui cards">
          {friendsArr}
        </div>
      </div>
    );
  }
}

export default Friends;