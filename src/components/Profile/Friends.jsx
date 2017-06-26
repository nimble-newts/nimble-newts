import React, { Component } from 'react';
import Friend from './Friend.jsx';

class Friends extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    FB.api('/me', res => {
      console.log(res);
      fetch('/friends', {
        body: { 'userID': res.id },
        headers: { 'Content-Type': 'application/json' } 
      }).then(res => {
        return res.json();
      }).then(res => {
        this.setState({
          friends: res
        })
      });
    });
  }

  render() {
    let friends = [];
    this.state.friends.forEach(friend => {
      friends.push(<Friend name={friend.name} address={friend.address}/>);
    });

    return (
      <div className="Friends">
        <h1>Saved friends</h1>
        {friends}
      </div>
    );
  }
}

export default Friends;