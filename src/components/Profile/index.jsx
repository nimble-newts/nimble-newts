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
        <div className='ui grid'>
          <div className='column'>
            <div className='ui segment'>
              <input type="submit" onClick={this.handleNav} value="Back to Search"></input>
              <User />
              <div className='ui divider'></div>
              <Friends />
              <div className='ui divider'></div>              
              <Suggestions />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;