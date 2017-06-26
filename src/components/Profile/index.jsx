import React, { Component } from 'react';
import User from './User.jsx';
import Friends from './Friends.jsx';
import Suggestions from './Suggestions.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  handleNav() {
    document.location.href = '/search';
  }

  render() {
    return (  
      <div className="Profile">
        <User />
        <Friends />
        <Suggestions />
        <input type="submit" onClick={this.handleNav} value="Back to Search"></input>
      </div>
    );
  }
}

export default Profile;