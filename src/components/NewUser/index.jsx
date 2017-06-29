import React, { Component } from 'react';
import Search from '../Search/index.jsx';

class NewUser extends Component {
  constructor(props) {
    // nothing is being passed down so can get rid of constructor?
    super(props);

  }

  handleNav () {
    console.log('CLicked!');
    document.location.href = '/search';
  }
  // Could use this to redirect to /search
  // handleNav() {
  //   document.location.href = '/search';
  // }

  render() {
    return (  
      <div className="new-user">
        <button onClick={this.handleNav}>X</button>
        New USER PAGE HERE!
      </div>
    );
  }
}

export default NewUser;