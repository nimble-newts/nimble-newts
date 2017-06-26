import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
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
          fetch('/login', {
            body: {
              token: response.authResponse.accessToken
            }
          }).then(function(res) {
            return res.text();
          }).then(function(res) {
            res = JSON.parse(res);
            document.location.href = res.redirect;
          });
        } else {
          
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

  render() {
    return (
      <div className="Welcome">
        <div className="Login-header">APP NAME</div>
        <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false">
        </div>
      </div>
    )
  };
};

export default Login;