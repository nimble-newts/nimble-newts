import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.props.handleSearch;

    this.state = {
      searchText: ''
    };
    
    this.handleSearchText = this.handleSearchText.bind(this);    
  }

  handleSearchText(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  render() {
    return (
      <div className ="ui action input">
        <input type="text" onChange={this.handleSearchText} placeholder='You know you want tacos' size='28'></input>
        <button className="ui primary button" onClick={(e) => this.handleSearch(e, this.state.searchText)}>Search</button>
      </div>
    );
  }
}

export default SearchBar;