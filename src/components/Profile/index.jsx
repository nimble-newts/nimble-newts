import React from 'react';
import { User } from './user.jsx';
import { Friends } from './friends.jsx';
import { Suggestions } from './suggestions.jsx'

const Profile = ({}) => {
  return
    <div className="Profile">
      <User />
      <Friends />
      <Suggestions />
    </div>
};

export default Profile;