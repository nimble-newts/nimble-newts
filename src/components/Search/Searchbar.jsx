import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    };
    
    this.handleSearchText = this.handleSearchText.bind(this);    
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchText(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleSearchSubmit() {
    console.log(this.state.searchText);
  }

  render() {
    return (
      <div className = "Search-bar">
        <input type="text" onChange={this.handleSearchText}></input>
        <input type="submit" value="Search" onClick={this.handleSearchSubmit}></input>
      </div>
    );
  }
}

export default SearchBar;