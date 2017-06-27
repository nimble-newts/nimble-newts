  // <script async defer
  //   src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPU4uTU_sJrKl-gO15ZWRAMOXObp6XoVA&callback=initMap">
  // </script>

  //   <style>
  //   #map {
  //     height: 100%;
  //   }
  //   /* Optional: Makes the sample page fill the window. */
  //   html, body {
  //     height: 100%;
  //     margin: 0;
  //     padding: 0;
  //   }
  // </style>
import React from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.address = this.props.address;
    this.map;
    this.displayInfo = this.displayInfo.bind(this);
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: {lat: 37.774929, lng:-122.419416}
    });
  }

  handleSearch() {
    // this.marker = new google.maps.Marker({
    //   map: map,
    //   animation: google.maps.Animation.DROP,
    //   position: {lat: 37.774929, lng:-122.419416}
    // });
    // this.marker.addListener('click', this.displayInfo);
    console.log(this.address);
  }

  displayInfo() {
    // if (marker.getAnimation() !== null) {
    //   marker.setAnimation(null);
    // } else {
    //   marker.setAnimation(google.maps.Animation.BOUNCE);
    // }
    console.log('hello')
  }

  render() {
    return ()
  }


}

export default Map;