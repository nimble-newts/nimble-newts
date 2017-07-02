import React, { Component } from 'react';
import User from './User.jsx';
import Friends from './Friends.jsx';
import Suggestions from './Suggestions.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleNav = this.handleNav.bind(this);
  }

  handleNav() {
    document.location.href = '/search';
  }

  render() {
    return (  
      <div className="Profile">
        <div className="ui padded grid">
          <div className="column">
          <button className="ui button" onClick={this.handleNav}>Back to Search</button>
          <User />
          <Friends />
          <div className='ui divider'></div>              
          <Suggestions />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;