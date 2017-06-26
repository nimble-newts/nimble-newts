import React, { Component } from 'react';
import SearchBar from './Searchbar.jsx';
import Addresses from './Addresses.jsx';

class Search extends Component {
  constructor(props) {
    super(props);

<<<<<<< 1756e3ada96052e2e523e0bb35d8ce205a41d5ba
=======
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
>>>>>>> Add function to take centralize inputed address
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

<<<<<<< 1756e3ada96052e2e523e0bb35d8ce205a41d5ba
  handleNav() {
    document.location.href = '/profile';
=======
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: {
        lat: 37.774929, 
        lng: -122.419416
      }
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.state.centralLocation
    });

    this.geocoder = new google.maps.Geocoder();
>>>>>>> Add function to take centralize inputed address
  }

  handleSearch(text) {
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
      console.log(res);
    });


    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.state.centralLocation
    });

    this.geocoder.geocode({'address': this.state.address}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        // this.setState({
        //   centralLocation: results[0].geometry.location
        // });
        let location = results[0].geometry.location;
        this.marker.setPosition(location);
        this.map.panTo(location);
      }
    });
  }

  handleAddress(event) {
    this.setState({
      address: event.target.value,
    });
    // TODO: get event.target.value and geocode it into lat and long 
    //set the state of centralized wit the lat and long
  }

  render() {
<<<<<<< 1756e3ada96052e2e523e0bb35d8ce205a41d5ba
    return ( 
      <div className="Search">
        <SearchBar handleSearch={this.handleSearch}/>
        <Addresses handleAddress={this.handleAddress}/>
        map goes here
        <input type="submit" onClick={this.handleNav} value="Go to profile"></input>
=======
    const style = {width: 500, height:500, border: '1p black solid' };
    
    return (
      <div className="Search">
        <SearchBar handleSearch={this.handleSearch}/>
        <Addresses handleAddress={this.handleAddress}/>
        <div ref='map' style={style}></div>
>>>>>>> Add function to take centralize inputed address
      </div>
    );
  }
}

export default Search;

