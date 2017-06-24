import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Login } from './components/Login/index.jsx';
import { Search } from './components/Search/index.jsx';
import { Profile } from './components/Profile/index.jsx';

// let store = createStore(/*reducer*/);

const Routes = ({ store }) => (
  <Provider store={store}> 
  <Router history={browserHistory}>
      <Route path="/(:filter)" component={Login} />
      <Route path="/search" component={Search} />
      <Route path="/profile" component={Profile} />
  </Router>
  </Provider>
);

export default Routes;
