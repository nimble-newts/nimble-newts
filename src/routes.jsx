import React from 'react';
import { browserHistory } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './components/Login/index.jsx';
import Search from './components/Search/index.jsx';
import Profile from './components/Profile/index.jsx';
import NewUser from './components/NewUser/index.jsx';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/newUser" component={NewUser} />
      <Route path="/search" component={Search} />
      <Route path="/profile" component={Profile} />
    </div>
  </BrowserRouter>
);

export default Routes;
