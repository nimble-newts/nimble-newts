import React from 'react';

const Friend = ({ name, address, onDelete }) => (
  <div className="ui column">
    <div className="Friend-name">{name}</div>
    <div className="Friend-address">{address}</div>
    <input type="submit" value="Delete" onClick={onDelete}></input>
  </div>
);

export default Friend;