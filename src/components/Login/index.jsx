import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    window.fbAsyncInit = function() { //run as soon as SDK completes loading
      FB.init({
        appId            : '802344973265370',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.9',
        status           : true
      });
      FB.AppEvents.logPageView();
      //SDK function calls must be placed here after init
      FB.getLoginStatus(function(response) { 
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
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  };

  handleLogin() {
    FB.login(function(response) {
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
    })
  };

  render() {
    return (
      <div className="Welcome">
        <div className="Login-header">APP NAME</div>
        <input type="submit" value="Log in" onClick={this.handleLogin}></input>
      </div>
    )
  };
};

export default Login;