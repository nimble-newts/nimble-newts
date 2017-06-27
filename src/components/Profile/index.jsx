import React, { Component } from 'react';
import User from './User.jsx';
import Friends from './Friends.jsx';
import Suggestions from './Suggestions.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  }

  componentDidMount() {
    FB.api('/me', res => {
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

  handleNav() {
    document.location.href = '/search';
  }

  render() {
    return (  
      <div className="Profile">
        <User />
        <Friends friends={this.state.friends}/>
        <Suggestions />
        <input type="submit" onClick={this.handleNav} value="Back to Search"></input>
      </div>
    );
  }
}

export default Profile;