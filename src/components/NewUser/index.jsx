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
        <div className="ui centered grid">
          <div className="twelve wide column">
            <div className="ui raised very padded segment user">
              <div className="ui centered grid">
                <div className="row">
                  <h1 className="ui header welcome">
                    Welcome to Pinpoint!
                    <div className="sub header">Let's get you pinning...</div>
                  </h1>
                </div>
                <SimpleSlider />
                <div className="row">
                  <div className="right floated right aligned five wide column">
                    <button className="ui secondary labeled icon button" onClick={this.handleNav}>
                      <i className="arrow right icon"></i>
                      Start Searching
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewUser;