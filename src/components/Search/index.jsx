import React, { Component } from 'react';
import SearchBar from './Searchbar.jsx';
import Addresses from './Addresses.jsx';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  handleNav() {
    document.location.href = '/profile';
  }

  render() {
    return ( 
      <div className="Search">
        <SearchBar />
        <Addresses />
        map goes here
        <input type="submit" onClick={this.handleNav} value="Go to profile"></input>
      </div>
    );
  }
}

export default Search;