import React from 'react';

const Friend = ({ name, address, onDelete }) => (                                              
  <div className="pink card">
    <div className="content">
      <div className="header">{name}</div>
      <div className="meta">
        {address}
      </div>
    </div>
    <div className="ui bottom attached button" onClick={onDelete}>
      <i className="minus icon"></i>
      Delete
    </div>
  </div>
);

export default Friend;