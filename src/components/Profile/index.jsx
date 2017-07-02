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
      <div className="profile">
        <div className="ui centered stackable relaxed padded grid container">
          <div className="fifteen wide column">
            <button className="ui secondary labeled icon button" onClick={this.handleNav}>
              <i className="arrow left icon"></i>
              Search
            </button>
            <User className="user" />
            <Friends className="friends" />
            <div className='ui section divider'></div>            
            <Suggestions className="suggestions" />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;