import React from 'react';
import { browserHistory } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Login from './components/Login/index.jsx';
import Search from './components/Search/index.jsx';
import Profile from './components/Profile/index.jsx';

// let store = createStore(/*reducer*/);

const Routes = ({ store }) => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/search" component={Search} />
      <Route path="/profile" component={Profile} />
    </div>
  </BrowserRouter>
);

export default Routes;
// <Provider store={store}> 
// </Provider>
