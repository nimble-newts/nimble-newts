import React from 'react';

const User = ({ name, photo, defaultAddress }) => (
  <div className="User-info">
    <h1>USER INFO</h1>
    <img className="User-photo" src={photo}></img>
    <div className="User-name">{name}</div>
    <div className="User-address">Default Address: {defaultAddress}</div> 
  </div>
);

export default User;