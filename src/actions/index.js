export const setActivity = activity => {
  return { 
    type: 'SET_ACTIVITY',
    activity
  };
};

export const setAddresses = addresses => {
  return {
    type: 'SET_ADDRESSES',
    addresses
  };
};
