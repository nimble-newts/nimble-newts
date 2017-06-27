import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.props.handleSearch;

    this.state = {
      searchText: ''
    };
    
    this.handleSearchText = this.handleSearchText.bind(this);    
  }

  handleSearchText(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  render() {
    return (
      <div className = "Search-bar">
        <input type="text" onChange={this.handleSearchText} placeholder='You know you want tacos'></input>
        <input type="submit" value="Search" onClick={() => this.handleSearch(this.state.searchText)}></input>
      </div>
    );
  }
}

export default SearchBar;