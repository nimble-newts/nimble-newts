import React, { Component } from 'react';
import SearchBar from './Searchbar.jsx';
import Addresses from './Addresses.jsx';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      addresses: [],
      centralAddress: '',
      dummyData: {
        lat: 37.4238253802915,
        lng: -122.0829009197085
      }
    };

    this.map;
    this.marker = [];
    this.geocoder;
    this.deletePastMarkers = this.deletePastMarkers.bind(this);      
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleAddAddress = this.handleAddAddress.bind(this);
    this.handleCentralAddress = this.handleCentralAddress.bind(this);
    this.handleYelpMarker = this.handleYelpMarker.bind(this);
    this.grabYelpData = this.grabYelpData.bind(this);
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 14,
      center: this.state.dummyData
    });

    this.geocoder = new google.maps.Geocoder();

    this.handleCentralAddress();
  }

  handleNav() {
    document.location.href = '/profile';
  }

  handleSearch(text) {
    if (this.marker !== undefined) {
      this.deletePastMarkers();
    }


    this.grabYelpData(text, (rawData) => {
      this.handleYelpMarker(rawData.businesses);
    });

    this.geocoder.geocode({'address': this.state.centralAddress}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        let location = results[0].geometry.location;
        console.log(location);
        this.map.setCenter(location);
        this.marker.push(new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: location
        }));
      }
    });
  }

  handleAddress(e) {
    this.setState({
      address: e
    });
  }

  handleAddAddress() {
    this.state.addresses.push(this.state.address);
  }

  handleCentralAddress() {
    //TODO: With this.state.addresses (an array), map through the addresses 
    // Grab central point
    // Set state of centralLocation to the central place
    this.setState({
      centralAddress: '944 Market Street San Francisco'
    });
  }

  handleYelpMarker(rawData) {
    rawData.map((item) => {
      let position = {
        lat: item.coordinates.latitude,
        lng: item.coordinates.longitude
      };
      this.marker.push(new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.BOUNCE,
        position: position
      }));
    });
  }

  grabYelpData(text, callback) {
    const respOptions = {
      method: 'POST',
      body: JSON.stringify({
        'searchText': text,
        'address': this.state.centralAddress
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

  deletePastMarkers() {
    for (var i = 0; i < this.marker.length; i++) {
      this.marker[i].setMap(null);
    }
  }

  render() {
    const style = {width: 500, height: 500, border: '1p black solid' };
    
    return (
      <div className="Search">
        <input type="submit" onClick={this.handleNav} value="Go to profile"></input>        
        <SearchBar handleSearch={this.handleSearch}/>
        <Addresses handleAddress={this.handleAddress} handleAddAddress={this.handleAddAddress}/>
        <div ref='map' style={style}></div>
      </div>
    );
  }
}

export default Search;

