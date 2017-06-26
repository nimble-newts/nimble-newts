import React from 'react';

const Friend = ({ name, address }) => (
  <div className="Friend">
    <div>Name: {name}</div>
    <div>Address: {address}</div>
  </div>
);

export default Friend;