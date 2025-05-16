import React from 'react'
import "./MyProfile.css"
import userImage from '../../../../images/userImage.png'
import { useUser } from '../../../../hooks/useUser'
import { MdModeEdit } from "react-icons/md";

const MyProfile = () => {
  const{user:{fullName}}=useUser();
  return (
    <div id='profile-box'>
      <h2>Your Profile</h2>
      <p>Your profile preferences help us personalise recommendations for you.</p>
      <div id="profile-content">
        <section className="image-section">
          <div id="profile-image">
              <img src={userImage} alt="" />
          </div>
          <button className='all-centered' id='change-profile-image-btn'>{fullName.toUpperCase()} <span><MdModeEdit /></span>
          </button>
        </section>
      </div>
    </div>
  )
}

export default MyProfile