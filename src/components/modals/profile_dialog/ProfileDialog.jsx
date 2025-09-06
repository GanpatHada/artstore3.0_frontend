import {useRef, useState } from "react";
import "./ProfileDialog.css";
import { IoMdClose } from "react-icons/io";
import defaultProfile from '../../../images/userImage.png'
import SpinLoader from '../../../components/spin-loader/SpinLoader'
import { toast } from "react-toastify";
import { useUser } from "../../../hooks/useUser";
import { fetchUpdateProfile } from "../../../services/UserService";


const ProfileDialog = ({closeProfileDialog}) => {
  const {
    user,setUserDetails
  } = useUser();

  const [currentName,setCurrentName]=useState(user.fullName);
  const [currentPhoto,setCurrentPhoto]=useState(user.profileImage);
  const [loading,setLoading]=useState(false)
  const fileRef=useRef(null)

  const handleSelectImage=(e)=>{
    const file=e.target.files?.[0];
    console.log(file);
    if (file && file.type.startsWith('image/')) {
      setCurrentPhoto(URL.createObjectURL(file));
  }
}
const isFullNameEmpty=()=>currentName.trim().length===0;
const isImageChanged=()=>user.profileImage!==currentPhoto;
const isFullNameChanged=()=>user.fullName.trim()!==currentName.trim()

const profileChanged = () => {
  return isFullNameChanged() || isImageChanged();
};


const handleProfileUpdate=async()=>{
  let params={user,setUserDetails}
  if(isFullNameChanged())
    params["fullName"]=currentName;
  if(isImageChanged())
    params["profileImageUrl"]=currentPhoto;
  try {
    setLoading(true)
    const data=await fetchUpdateProfile(params);
    const {profileImage,fullName}=data;
    setUserDetails({...user,profileImage,fullName})
    toast.success('Profile updated successfully');
    closeProfileDialog();
  } catch (error) {
    toast.error(error.message || "Something went wrong while updating profile")
  }
  finally{
    setLoading(false)
  }
}


const getTextBorder=()=>{
  return isFullNameEmpty()?'1px solid #d50000':'1px solid gray'
}


  return (
    <div className="layover">
      <div id="profile-dialog" className="modal">
         {loading && <SpinLoader/>}
        <header>
          <h4>Edit profile name</h4>
          <button className="all-centered" onClick={closeProfileDialog}>
            <IoMdClose />
          </button>
        </header>
        <main>
          <section id="image-section">
            <div id="image-wrapper">
              <img src={currentPhoto ?? defaultProfile} alt="" />
            </div>
            <input onChange={handleSelectImage} type="file" accept="image/*" ref={fileRef} style={{display:"none"}} />
            <div>
               <button onClick={()=>fileRef.current.click()}  id="change-profile-photo">Change profile photo</button>
               {currentPhoto&& <button id="remove-button" onClick={()=>setCurrentPhoto(null)}>Remove</button>}
            </div>
          </section>
          <input type="text" id="full-name" style={{border:getTextBorder()}} onChange={e=>setCurrentName(e.target.value)} value={currentName} />
          {isFullNameEmpty()&&<span id="name-error">Field cannot be empty!</span>}
          <section id="action">
            <button onClick={closeProfileDialog} id="cancel">Cancel</button>
            <button disabled={!profileChanged() || isFullNameEmpty()} id="continue" className="primary-btn" onClick={handleProfileUpdate}>Continue</button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfileDialog;
