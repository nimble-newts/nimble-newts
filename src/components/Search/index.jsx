import React, { Component } from 'react';
import SearchBar from './Searchbar.jsx';
import Addresses from './Addresses.jsx';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

  handleNav() {
    document.location.href = '/profile';
  }

  handleSearch(text) {
    console.log(text);
  }

  handleAddress(text) {
    console.log(text);
  }

  render() {
    return ( 
      <div className="Search">
        <SearchBar handleSearch={this.handleSearch}/>
        <Addresses handleAddress={this.handleAddress}/>
        map goes here
        <input type="submit" onClick={this.handleNav} value="Go to profile"></input>
      </div>
    );
  }
}

export default Search;