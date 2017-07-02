import React, { Component } from 'react';
import Slider from 'react-slick';

class SimpleSlider extends Component {
  constructor (props) {
    super(props);
    this.changeToSearchOnClick = this.props.changeToSearchOnClick;
  }

  render () {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    var blurbs = {
      0: 'Welcome to Pinpoint!',
      1: 'We make meetups easy!',
      2: 'Just enter the addresses of you and your friends!',
      3: 'And enter in an activity or type of food!',
      4: 'We help you pinpoint places to go!'
    };

    return (
      <Slider {...settings}>
        <div>
          <img src='http://placekitten.com/g/400/200' />
          <p>{blurbs[0]}</p>
        </div>
        <div>
          <img src='http://placekitten.com/g/400/200' />
          <p>{blurbs[1]}</p>
        </div>
        <div>
          <img src='http://placekitten.com/g/400/200' />
          <p>{blurbs[2]}</p>
        </div>
        <div>
          <img src='http://placekitten.com/g/400/200' />
          <p>{blurbs[3]}</p>
        </div>
        <div>
          <img src='http://placekitten.com/g/400/200' />
          <p>{blurbs[4]}</p>
          <button className="ui primary button centered" id="annoying-button" onClick={this.changeToSearchOnClick}>Let's go!</button>
        </div>
      </Slider>
    );
  }
}

export default SimpleSlider;
// console.log('Simple slider has loaded...');