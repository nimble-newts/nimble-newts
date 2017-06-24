import React from 'react';
import { User } from './User.jsx';
import { Friends } from './Friends.jsx';
import { Suggestions } from './Suggestions.jsx';

const Profile = ({}) => (   
  <div className="Profile">
    <User />
    <Friends />
    <Suggestions />
  </div>
);

export default Profile;