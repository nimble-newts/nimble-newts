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
      0: 'Enter a search term and addresses to quickly see central meetup locations.',
      1: 'Pin the search results for later viewing in your profile.',
      2: 'Save addresses as friends to easily use them again in future searches.',
      3: 'Store a default address that gets automatically pulled into the search addresses.',
      4: 'Get searching!'
    };

    return (
      <div className="row">
        <div className="fourteen wide column">
        <Slider {...settings}>
          <div>
            <img src='./dist/images/search.png' />
            <p>{blurbs[0]}</p>
          </div>
          <div>
            <img src='./dist/images/save-suggestions.png' />
            <p>{blurbs[1]}</p>
          </div>
          <div>
            <img src='./dist/images/save-friends.png' />
            <p>{blurbs[2]}</p>
          </div>
          <div>
            <img src='./dist/images/default-address.png' />
            <p>{blurbs[3]}</p>
          </div>
          <div>
            <img src='./dist/images/final.png' />
            <p>{blurbs[4]}</p>
          </div>
        </Slider>
        </div>
      </div>
    );
  }
}

export default SimpleSlider;