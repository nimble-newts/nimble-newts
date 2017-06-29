import React, { Component } from 'react';
// import Background from '../../../dist/images/background.jpg';

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
      <div className='login'>
        <div className='ui middle aligned center aligned grid'>
          <div className='ui segment'>
            <h1 className='header'> Nimble Newts Ultimate Unicorn Funtime App </h1>
            <div className='button'>
              <button onClick={this.handleLogin} className='ui fluid big facebook button'>
                <i className='facebook icon'></i>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

