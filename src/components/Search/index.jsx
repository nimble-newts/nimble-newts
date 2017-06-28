import React, { Component } from 'react';
import SearchBar from './Searchbar.jsx';
import Addresses from './Addresses.jsx';
import Promise from 'bluebird';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.handleCentralAddress = this.handleCentralAddress.bind(this);
    this.handleYelpMarker = this.handleYelpMarker.bind(this);
    this.grabYelpData = this.grabYelpData.bind(this);
    this.addAddressToList = this.addAddressToList.bind(this);
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 14,
      center: this.state.dummyData
    });

    this.geocoder = new google.maps.Geocoder();
    Promise.promisifyAll(this);
    this.handleCentralAddressAsync();

  }

  handleNav() {
    document.location.href = '/profile';
  }

  handleSearch(text) {
    console.log(`Handling search, input:`, text); 
    if (this.marker !== undefined) {
      this.deletePastMarkers();
    }

<<<<<<< 1368d2bf316756fc3a314f6b4f7aa5da49ecaa33
=======
    this.grabYelpData(text, (rawData) => {
      console.log('Raw meat: ', rawData);
      this.handleYelpMarker(rawData.businesses);
    });

    // puts central address marker down
>>>>>>> Fix markers to display correct info window
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
    });

    this.grabYelpData(text, (rawData) => {
      this.handleYelpMarker(rawData.businesses);
    });

  }

  handleAddress(e) {
    console.log('Adding address?', e);
    this.setState({
      address: e
    });
  }

  addAddressToList (address) {
    console.log('This address passed in:', address);
    this.setStateAsync((prevState, props) => {
      addresses: prevState.addresses.push(address);
    }).then(_ => {
      console.log('(comp addresses state)', this.state.addresses);
      this.handleCentralAddress();
    });
  }

  handleCentralAddress() {
    // turn all elements in addresses to lat + long
    // this.state.addresses.map(address => {
    //   return new Promise((resolve, reject) => {

    //   });
    // });
    // find central location
    // set state to new central address
    // this.setStateAsync({
    //   centralAddress: '944 Market Street San Francisco'
    // }).then(_ => {
    console.log(`These are my addresses:`, this.state.addresses);
    Promise.map(this.state.addresses, (address) => {
      console.log('Address current:', address);
      console.log('Curre state', this.state);
      return new Promise((resolve, reject) => {
        this.geocoder.geocode({'address': address}, (results, status) => {
          console.log('Results: ', results[0].geometry.location);
          var latLongHolder = results[0].geometry.location;
          resolve([latLongHolder.lat(), latLongHolder.lng()]);
        });
      }); 
    }).then(locations => {
      console.log('Locations:', locations);
      var bound = new google.maps.LatLngBounds();

      Promise.map(locations, (location) => {
        return new Promise((resolve, reject) => {
          var lat = location[0];
          var long = location[1];
          bound.extend( new google.maps.LatLng(lat, long));
          resolve();
        });
      }).then(_ => {
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
            console.log(results);
            if (results[0]) {
              var centralAddress = results[0].formatted_address;
              console.log('FOrmated address: ', results[0].formatted_address);
              this.setState({
                centralAddress: centralAddress
              });
            }
          }
        });
      });
        // reverse geocode stuff to a location
        
        // then, set location to central address

    });
    // });
  }

  handleYelpMarker(rawData) {
    console.log(`Heres raw data, expecting addresses...`, rawData);
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
<<<<<<< 1368d2bf316756fc3a314f6b4f7aa5da49ecaa33
        <Addresses handleAddress={this.handleAddress}/>
=======
        <Addresses addAddressToList={this.addAddressToList} handleAddress={this.handleAddress} handleAddAddress={this.handleAddAddress}/>
>>>>>>> Fix markers to display correct info window
        <div ref='map' style={style}></div>
      </div>
    );
  }
}

export default Search;

