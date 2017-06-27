import React from 'react';
import Friend from './Friend.jsx';

const Friends = ({ friends }) => {
  let friendsArr = [];
  for (let i = 0; i < friends.length; i++) {
    friendsArr.push(<Friend name={friends[i].name} address={friends[i].address} key={i}/>);
  }

  return (
    <div className="Friends">
      <h1>Saved friends</h1>
      {friendsArr}
    </div>
  );
}

export default Friends;