import React, { Component } from 'react';
import SearchBar from './Searchbar.jsx';
import Addresses from './Addresses.jsx';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      centralLocation: {
        lat: 37.4238253802915,
        lng: -122.0829009197085
      }
    };

    this.map;
    this.marker;
    this.geocoder;   
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.grabYelpData = this.grabYelpData.bind(this);
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: this.state.centralLocation
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.state.centralLocation
    });

    this.geocoder = new google.maps.Geocoder();
  }

  handleNav() {
    document.location.href = '/profile';
  }

  handleSearch(text) {
    this.grabYelpData(text, (rawData) => {
      rawData.businesses.map((item) => {
        let position = {
          lat: item.coordinates.latitude,
          lng: item.coordinates.longitude
        };
        this.marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: position
        });
      });
    });

    

    this.geocoder.geocode({'address': this.state.address}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        let location = results[0].geometry.location;
        this.marker.setPosition(location);
        this.map.setCenter(location);
      }
    });
  }

  handleAddress(event) {
    this.setState({
      address: event.target.value,
    });
  }

  grabYelpData(text, callback) {
    const respOptions = {
      method: 'POST',
      body: JSON.stringify({
        'searchText': text,
        'address': this.state.address
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    fetch('/searches', respOptions).then((res) => {
      return res.json();
    }).then((res) => {
      callback(res);
    });    
  }

  render() {
    const style = {width: 500, height: 500, border: '1p black solid' };
    
    return (
      <div className="Search">
        <input type="submit" onClick={this.handleNav} value="Go to profile"></input>        
        <SearchBar handleSearch={this.handleSearch}/>
        <Addresses handleAddress={this.handleAddress}/>
        <div ref='map' style={style}></div>
      </div>
    );
  }
}

export default Search;

