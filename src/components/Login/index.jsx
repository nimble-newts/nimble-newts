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
          <div className='ui segment login'>
            <h1 className='ui header'> Pinpoint </h1>
            <div className='sub header'>When you need to meet your friends. We help you find the place.</div>
            <div className='button'>
              <button onClick={this.handleLogin} className='ui fluid big facebook button'>
                <i className='facebook icon'></i>
                Login
              </button>
            </div>
          </div>
        </div>
    );
  }
}

export default Login;

