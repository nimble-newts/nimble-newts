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

  handleCancelAdd(e){
    this.setState({
      adding: false,
    });
  }

  handleSave(e) {
    let saveName = e.target.parentNode.children[1].value;
    let saveAddress = e.target.parentNode.children[3].value;
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
      }

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
    e.preventDefault();
    let targetName = e.target.parentNode.children[0].textContent;
    let targetAddress = e.target.parentNode.children[1].textContent;
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
      <div className="Friends">
        <h1>Saved friends</h1>
       {this.state.adding === false ? (
          <input type="submit" value="Add Friend" onClick={this.handleAdd}></input>
        ) : (
          <div>
            <label data-for="Name">Name: </label><input type="text" id="Name" required></input>
            <label data-for="Address">Address: </label><input type="text" id="Address" required></input>
            <input type="submit" value="Save" onClick={this.handleSave}></input>
            <input type="submit" value="Cancel" onClick={this.handleCancelAdd}></input>
          </div>
        )}
        {friendsArr}
      </div>
    );
  }
};

export default Friends;