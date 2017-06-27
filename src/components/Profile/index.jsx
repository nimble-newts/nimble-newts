import React, { Component } from 'react';
import User from './User.jsx';
import Friends from './Friends.jsx';
import Suggestions from './Suggestions.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      name: '',
      defaultAddress: '',
      friends: []
    }

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
          photo: res.photo_url,
          name: res.name,
          defaultAddress: res.default_address,
          friends: res.friends
        })
      });
    });
  }

  handleNav() {
    document.location.href = '/search';
  }

  handleDelete(e) {
    e.preventDefault();
    let targetName = e.target.parentNode.children[0].textContent;
    let targetAddress = e.target.parentNode.children[1].textContent;
    console.log('delete!', e.target.parentNode.children[0].textContent);
    FB.api('/me', res => {
      fetch('/friends', {
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
        this.setState({ friends: res });
      })
    });
  }

  render() {
    return (  
      <div className="Profile">
        <User name={this.state.name} photo={this.state.photo} defaultAddress={this.state.defaultAddress}/>
        <Friends friends={this.state.friends} onDelete={this.handleDelete}/>
        <Suggestions />
        <input type="submit" onClick={this.handleNav} value="Back to Search"></input>
      </div>
    );
  }
}

export default Profile;