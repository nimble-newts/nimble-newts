import React, { Component } from 'react';
import Suggestion from './Suggestion.jsx';

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      suggestions: []
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    FB.api('/me', res => {
      fetch('/profile', {
        method: 'post',
        body: JSON.stringify({ 
          'userID': res.id
        }),
        headers: { 
          'Content-Type': 'application/json' 
        } 
      }).then(res => {
        return res.json();
      }).then(res => {
        this.setState({
          suggestions: res.suggestions
        });
      });
    });
  }

  handleDelete(e) {
    let card = e.target.parentNode.children[0];
    console.log(card);
    let targetName = card.children[0].textContent;
    let targetAddress = card.children[2].children[0].textContent;
    FB.api('/me', res => {
      fetch('/suggestions', {
        method: 'put',
        body: JSON.stringify({
          'userID': res.id,
          'name': targetName,
          'address': targetAddress
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        return res.json();
      }).then(res => {
        this.setState({ suggestions: res });
      });
    });
  }

  render() {
    let suggestionsArr = [];
    for (let i = 0; i < this.state.suggestions.length; i++) {
      let suggest = this.state.suggestions[i];
      suggestionsArr.push(<Suggestion name={suggest.name} address={suggest.address} city={suggest.city} zip={suggest.zip} url={suggest.url} onDelete={this.handleDelete} key={i}/>);
    }

    return (
      <div className="ui padded six column grid">
        <div className="row">
          <h2 className="ui header">
            <i className="marker icon"></i>
            <div className="content">
              Saved Suggestions
              <div className="sub header">
                View past search results - let's get going!
              </div>
            </div>
          </h2>
          <div className="right floated right aligned ten wide column"></div>
        </div>
        <div className="ui cards">
          {suggestionsArr}
        </div>
      </div>
    );
  }
}

export default Suggestions;