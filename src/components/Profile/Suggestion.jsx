import React from 'react';

const Suggestion = ({ name, address, city, zip, url, onDelete }) => (
  <div className="yellow card">
    <div className="content">
      <div className="header">{name}</div>
      <div className="meta"><a href={url}>yelp</a></div>
      <div className="description">
        <div className="Suggestion-address1">{address}</div>
        <div className="Suggestion-address2">{city}, {zip}</div>
      </div>
    </div>
    <div className="ui bottom attached button" onClick={onDelete}>
      <i className="minus icon"></i>
      Delete
    </div>
  </div>
);

export default Suggestion;