import React from 'react';
import  "../styles/studentdashboard.css";

const Profile = ({ profile }) => {
  return (
    <div className="profile-bar open">
      <h2>Profile Information</h2>
      <div className='information_div'>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      </div>
    </div>
  );
};

export default Profile;
