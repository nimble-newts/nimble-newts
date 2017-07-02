import React, { Component } from 'react';
import SimpleSlider from '../SimpleSlider/index.jsx';

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.handleNav = this.handleNav.bind(this);
  }

  handleNav () {
    document.location.href = '/search';
  } 

  render() {
    return (  
      <div className="new-user">
        <SimpleSlider changeToSearchOnClick={this.handleNav} />
      </div>
    );
  }
}

export default NewUser;