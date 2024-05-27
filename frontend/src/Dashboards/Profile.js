import React from 'react';
import  "../styles/styles.css";

const Profile = ({ profile }) => {
  return (
    <div className="profile-bar open">
      <h2>Profile Information</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    
    </div>
  );
};

export default Profile;
