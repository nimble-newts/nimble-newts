import React from 'react';

const Friend = ({ name, address }) => (
  <div className="Friend">
    <span>Name: {name}</span>
    <span>Address: {address}</span>
  </div>
);

export default Friend;