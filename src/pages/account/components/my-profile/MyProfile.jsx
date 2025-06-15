
import "./MyProfile.css"
import userImage from '../../../../images/userImage.png'
import { useUser } from '../../../../hooks/useUser'
import { MdModeEdit } from "react-icons/md";
import ProfileDialog from '../../../../components/profile_dialog/ProfileDialog';
import { useState } from "react";

const MyProfile = () => {
  const{user:{fullName,profileImage}}=useUser();
  const [openProfileDialog,setOpenProfileDialog]=useState(false);

  const closeProfileDialog=()=>setOpenProfileDialog(false)

  return (
    <div id='profile-box'>
      {openProfileDialog && <ProfileDialog closeProfileDialog={closeProfileDialog}/>}
      <h2>Your Profile</h2>
      <p>Your profile preferences help us personalise recommendations for you.</p>
      <div id="profile-content">
        <section className="image-section">
          <div id="profile-image">
              <img src={profileImage ?? userImage} alt="" />
          </div>
          <button onClick={()=>setOpenProfileDialog(true)} className='all-centered' id='change-profile-image-btn'>{fullName.toUpperCase()} <span><MdModeEdit /></span>
          </button>
        </section>
      </div>
    </div>
  )
}

export default MyProfile