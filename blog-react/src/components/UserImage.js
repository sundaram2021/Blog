import React from 'react';

const UserImage = ({ name }) => {
  const initials = name.charAt(0).toUpperCase();

  const styles = {
    background: `url(https://dummyimage.com/50x50/999/fff&text=${initials})`,
    backgroundSize: 'cover',
    borderRadius: '50%',
  };

  return <div className="user-image" style={styles}></div>;
};

export default UserImage;
