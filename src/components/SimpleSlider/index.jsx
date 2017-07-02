import React, { Component } from 'react';
import Slider from 'react-slick';

class SimpleSlider extends Component {
  constructor (props) {
    super(props);
    this.changeToSearchOnClick = this.props.changeToSearchOnClick;
  }
    // This slider depends heavily on CSS
      // Have you tried: 1) npm install
      // 2) making sure 
        // @import "../../node_modules/slick-carousel/slick/slick.css";
        // @import "../../node_modules/slick-carousel/slick/slick-theme.css";

  render () {
    var settings = {
      className: 'blahhhh',
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      // vertical: true // vertical looks awesome! Keep it!
    };

    var blurbs = {
      0: 'Welcome to the blahBlah app!',
      1: 'We make meetups easy!',
      2: 'Just enter the addresses of you and your friends!',
      3: 'And enter in an activity or type of food!',
      4: 'We help you find places to go that are the most convienient for everyone!'
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
          <button onClick={this.changeToSearchOnClick}>Let's go!</button>
        </div>
      </Slider>
    );
  }
}

export default SimpleSlider;