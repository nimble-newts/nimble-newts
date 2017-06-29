import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Promise from 'bluebird';
import SearchBar from './Searchbar.jsx';
import Addresses from './Addresses.jsx';
import { handleSave } from './helpers/save.js';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dummyData: {
        lat: 37.4238253802915,
        lng: -122.0829009197085
      },
      currentAddresses: []
    };

    this.map;
    this.marker = [];
    this.geocoder;
    this.centralAddress = '';

    this.deletePastMarkers = this.deletePastMarkers.bind(this);      
    this.handleSearch = this.handleSearch.bind(this);
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

    Promise.promisifyAll(this);
  }

  handleNav() {
    document.location.href = '/profile';
  }

  grabAddresses(e) {
    let currentAddresses = [];
    let addressesDiv = e.target.parentNode.parentNode.children[2].children;
    for (let i = 0; i < addressesDiv.length - 1; i++) {
      currentAddresses.push(addressesDiv[i].firstChild.value);
    }
    return currentAddresses;
  }

  handleSearch(e, text) {
    let currentAddresses = this.grabAddresses(e);
    let filteredAddresses = currentAddresses.filter(address => Boolean(address));

    this.handleCentralAddressAsync(filteredAddresses, () => {
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
      }).then(() => {
        this.geocoder.geocode({'address': this.centralAddress}, (results, status) => {
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
            this.handleYelpMarker(rawData.businesses, filteredAddresses.length);
            this.setState({ currentAddresses: currentAddresses });
          });
        });
      });
    });
  }

  handleCentralAddress(filteredAddresses, callback) {
    Promise.map(filteredAddresses, (address) => {
      return new Promise((resolve, reject) => {
        this.geocoder.geocode({'address': address}, (results, status) => {
          let latLongHolder = results[0].geometry.location;
          resolve([latLongHolder.lat(), latLongHolder.lng()]);
        });
      }); 
    }).then(locations => {
      let bound = new google.maps.LatLngBounds();

      Promise.map(locations, (location) => {
        return new Promise((resolve, reject) => {
          let lat = location[0];
          let long = location[1];
          bound.extend( new google.maps.LatLng(lat, long));
          resolve();
        });
      }).then(_ => {
        return new Promise((resolve, reject) => {
          let center = bound.getCenter();
          let lat = center.lat();
          let lng = center.lng();
          let latlng = {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
          };
          this.geocoder.geocode({'location': latlng}, (results, status) => {
            if (status === 'OK') {
              if (results[0]) {
                let centralAddress = results[0].formatted_address;
                this.centralAddress = centralAddress;
                callback();
              }
            }
          });
        });
      });
    });
  }

  handleYelpMarker(rawData, length) {
    rawData.map((item, index) => {
      let position = {
        lat: item.coordinates.latitude,
        lng: item.coordinates.longitude
      };
      
      let i = index + length + 1;

      this.marker.push(new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: position
      }));


      let content =
        `<div>
          <h3 class="name">${item.name}</h3>
          <a href="${item.url}" class="url">yelp</a>
          <div class="address1">${item.location.address1}</div>
          <div class="city">${item.location.city}</div>
          <div class="zip">${item.location.zip_code}</div>
          <input id="marker-save" type="submit" value ="save" data-action="save">
        </div>`;

      let infoWindow = new google.maps.InfoWindow({
        content: content
      });

      this.marker[i].addListener('click', () => {
        infoWindow.open(this.map, this.marker[i]);
      });
    });

    let map = findDOMNode(this.refs.map);
    $(map).on('click', '#marker-save', function(event) { handleSave($(this)); });
  }

  grabYelpData(text, callback) {
    const respOptions = {
      method: 'POST',
      body: JSON.stringify({
        'searchText': text,
        'address': this.centralAddress
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
    this.marker = [];
  }

  render() {
    const style = {width: 500, height: 500 , border: '1p black solid'};
    
    return (
      <div className='searchPage'>
        <div className="ui page grid">
            <div className="two column row">
                <div className="column"> 
                    <div className="ui segment">
                        <div className="ui vertical segment">
                          <SearchBar handleSearch={this.handleSearch}/>
                        </div>
                        <div className="ui vertical segment">
                          <Addresses currentAddresses={this.state.currentAddresses}/>
                        </div>
                    </div>
                </div>
                <div className="column"> 
                  <div className="ui segment">
                      <div className="ui vertical segment">
                        <input type="submit" onClick={this.handleNav} value="Go to profile"></input>        
                      </div>
                      <div className="ui vertical segment">
                        <div ref='map' className='map'></div>
                      </div>
                  </div>
                </div>
            </div>
      </div>
      </div>
    );
  }
}

export default Search;

