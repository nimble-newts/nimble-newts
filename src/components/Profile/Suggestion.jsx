import React from 'react';

const Suggestion = ({ name, address, city, zip, url, onDelete }) => (
  <div className="Suggestion">
    <div className="Suggestion-name">{name}</div>
    <div className="Suggestion-address1">{address}</div>
    <div className="Suggestion-address2">{city}, {zip}</div>
    <div className="Suggestion-url"><a href={url}>yelp</a></div>
    <input type="submit" value="Delete" onClick={onDelete}></input>
  </div>
);

export default Suggestion;