import React, { Component } from 'react';
import SearchBar from './Searchbar.jsx';
import Addresses from './Addresses.jsx';
import Promise from 'bluebird';
import { findDOMNode } from 'react-dom';

class Search extends Component {
  constructor(props) {
    super(props); 

    this.state = {

      // addresses: ['1450 Franklin San Francisco', '1451 Montgomery St San Francisco', '', ''],
      addresses: [],
      centralAddress: '',
      dummyData: {
        lat: 37.4238253802915,
        lng: -122.0829009197085 
      }
    };

    this.changeAddress = this.changeAddress.bind(this);
    this.map;
    this.marker = [];
    this.geocoder;
    this.deletePastMarkers = this.deletePastMarkers.bind(this);      
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleCentralAddress = this.handleCentralAddress.bind(this);
    this.handleYelpMarker = this.handleYelpMarker.bind(this);
    this.grabYelpData = this.grabYelpData.bind(this);
    // this.addAddressToList = this.addAddressToList.bind(this);
  }

  changeAddress (newAddress, i) {
    this.setStateAsync((prevState, props) => {
      console.log(`Changing address newAddress: ${newAddress}, i: ${i}`);
      var array = prevState.addresses.slice();
      array.splice(i, 1, newAddress);
      return {addresses: array};
    }).then(_ => {
      console.log('Changed the addresses: ', JSON.stringify(this.state, null, 2));
    });
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 14,
      center: this.state.dummyData
    });
    this.geocoder = new google.maps.Geocoder();
    Promise.promisifyAll(this);
    // this.handleCentralAddressAsync();
    this.handleSearch('Burritos');
  }

  handleNav() {
    document.location.href = '/profile';
  }

  handleSearch(text) {
    var filteredAddresses = this.state.addresses.filter(address => Boolean(address));
    this.handleCentralAddressAsync(() => {
      console.log('State is now', this.state);
      if (this.marker !== undefined) {
        this.deletePastMarkers();
      }
      Promise.map(filteredAddresses, address => {
        this.geocoder.geocode({'address': address}, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            let location = results[0].geometry.location;
            this.marker.push(new google.maps.Marker({
              map: this.map,
              animation: google.maps.Animation.BOUNCE,
              position: location,
              icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            }));
          }
        }); 
      })
      .then(_=> {
        this.geocoder.geocode({'address': this.state.centralAddress}, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            let location = results[0].geometry.location;
            this.map.setCenter(location);
            this.marker.push(new google.maps.Marker({
              map: this.map,
              animation: google.maps.Animation.BOUNCE,
              position: location,
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }));
          }

          this.grabYelpData(text, (rawData) => {
            this.handleYelpMarker(rawData.businesses);
          });

        }); // end of geocoder.geoCode response
      });
    }); // end of handleCentralAddressAsync

  } //end of handleSearch method

  handleAddress(e) {
    console.log('Adding address?', e);
    this.setState({
      address: e
    });
  }

  handleCentralAddress(callback) {
    console.log(`These are my addresses:`, this.state.addresses);
    var filteredAddresses = this.state.addresses.filter(address => Boolean(address));
    Promise.map(filteredAddresses, (address) => {
      console.log('Address current:', address);
      console.log('Curre state', this.state);
      return new Promise((resolve, reject) => {
        this.geocoder.geocode({'address': address}, (results, status) => {
          console.log('Results: ', results[0].geometry.location);
          var latLongHolder = results[0].geometry.location;
          resolve([latLongHolder.lat(), latLongHolder.lng()]);
        });
      }); 
    })
    .then(locations => {
      console.log('Locations:', locations);
      var bound = new google.maps.LatLngBounds();

      Promise.map(locations, (location) => {
        return new Promise((resolve, reject) => {
          var lat = location[0];
          var long = location[1];
          console.log('Promise, extending bounds');
          bound.extend( new google.maps.LatLng(lat, long));
          resolve();
        });
      }).then(_ => {
        return new Promise((resolve, reject) => {
          var center = bound.getCenter();
          var lat = center.lat();
          var lng = center.lng();
          var latlng = {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
          };
          console.log('Center:', lat, lng);
          this.geocoder.geocode({'location': latlng}, (results, status) => {
            if (status === 'OK') {
              console.log('Possible center points:', results);
              if (results[0]) {
                var centralAddress = results[0].formatted_address;
                console.log('FOrmated address: ', results[0].formatted_address);
                this.setStateAsync((prevState, props) => {
                  return {centralAddress: centralAddress};
                })
                .then(_ => {
                  console.log('Central address changed! Here:', this.state);
                  callback();
                });
              }
            }
          });
        });
        
      });
    });
  }

  handleYelpMarker(rawData) {
    var names = rawData.map(({name}) => name);
    console.log(`Yelp says:`, names);
    rawData.map((item, index) => {
      let position = {
        lat: item.coordinates.latitude,
        lng: item.coordinates.longitude
      };

      let i = index + 1;

      this.marker.push(new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: position
      }));

      let content = 
        '<div>' +
        '<h3>' + item.name + '</h3>' +
        '<div>' + item.url + '</div>' +
        '<div>' + item.location.address1 + '</div>' +
        '</div>';

      let infoWindow = new google.maps.InfoWindow({
        content: content
      });

      this.marker[i].addListener('click', () => {
        infoWindow.open(this.map, this.marker[i]);
      });
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
    }).catch(err => {
      console.error(err);
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
        <Addresses changeAddress={this.changeAddress} handleAddress={this.handleAddress} addresses={this.state.addresses}/>
        <div ref="map" style={style}></div>
      </div>
    );
  }
}

export default Search;