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
      console.log(res.id);
      fetch('/friends', {
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
          friends: res
        })
      });
    });
  }

  render() {
    let friends = [];
    for (let i = 0; i < this.state.friends.length; i++) {
      friends.push(<Friend name={this.state.friends[i].name} address={this.state.friends[i].address} key={i}/>);
    }

    return (
      <div className="Friends">
        <h1>Saved friends</h1>
        {friends}
      </div>
    );
  }
}

export default Friends;