import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.postLogin = this.postLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  postLogin(response) {
    if (response.status === 'connected') {
      const respOptions = {
        method: 'post',
        body: JSON.stringify({
          'userID': response.authResponse.userID, 
          'token': response.authResponse.accessToken
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch('/login', respOptions).then(function(res) {
        return res.json();
      }).then(function(res) {
        document.location.href = res.redirect;
      });
    }
  }

  componentDidMount() {
    let app = this;
    FB.getLoginStatus(function(response) { 
      app.postLogin(response);
    });
  }

  handleLogin() {
    let app = this;
    FB.login(function(response) {
      app.postLogin(response);
    });
  }

  render() {
    return (
      <div className='ui centered grid login'>
        <div className="five wide column">
        <div className='ui raised very padded segment login'>
          <h1 className='ui header' style={{fontSize: '45px'}}>Pinpoint
            <div className='sub header' style={{fontSize: '20px'}}>Group activities, on point.</div>
          </h1>
          <div className="ui divider"></div>
          <h3 className="ui left aligned header">
            <i className="marker icon"></i>
            <div className="content">
              Find where to meet, quickly
              <div className="sub header">
                Activities at a central location for everyone
              </div>
            </div>
          </h3>            
          <h3 className="ui left aligned header">
            <i className="user icon"></i>
            <div className="content">
              Save info for future access
              <div className="sub header">
                Profile to store friends and suggestions
              </div>
            </div>
          </h3>
          <h3 className="ui left aligned header">
            <i className="hand peace icon"></i>
            <div className="content">
              Stop planning, get partying
              <div className="sub header">
                Decisions in minutes, partying for hours
              </div>
            </div>
          </h3>
          <div className='button'>
            <button onClick={this.handleLogin} className='ui fluid big facebook button'>
              <i className='facebook icon'></i>
              Get Started
            </button>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Login;

