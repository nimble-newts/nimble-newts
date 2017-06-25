import React from 'react';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Login } from './components/Login/index.jsx';
import { Search } from './components/Search/index.jsx';
import { Profile } from './components/Profile/index.jsx';

// let store = createStore(/*reducer*/);

const Routes = ({ store }) => (
  <Router history={browserHistory}>
    <div>
      <ul>
        <li><Link to="/(:filter)">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>

      <Route path="/(:filter)" component={Login} />
      <Route path="/search" component={Search} />
      <Route path="/profile" component={Profile} />
    </div>
  </Router>
);

export default Routes;
// <Provider store={store}> 
// </Provider>
