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
  };

  componentDidMount() {
    let app = this;
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
        app.postLogin(response);
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
    let app = this;
    FB.login(function(response) {
      app.postLogin(response);
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