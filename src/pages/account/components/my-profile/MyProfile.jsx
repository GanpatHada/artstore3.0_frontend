import "./MyProfile.css";
import userImage from "../../../../images/userImage.png";
import { useUser } from "../../../../hooks/useUser";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import ProfileDialog from "../../../../components/modals/profile_dialog/ProfileDialog";

const MyProfile = () => {
  const {
    user: { fullName, profileImage },
  } = useUser();
  const [openProfileDialog, setOpenProfileDialog] = useState(false);

  const closeProfileDialog = () => setOpenProfileDialog(false);

  return (
    <div id="profile-box">
      {openProfileDialog && (
        <ProfileDialog closeProfileDialog={closeProfileDialog} />
      )}
      <header>
        <h3>Your Profile</h3>
      </header>
      <main id="profile-content">
        <section className="image-section">
          <div id="profile-image">
            <img src={profileImage ?? userImage} alt="" />
          </div>
          <button
            onClick={() => setOpenProfileDialog(true)}
            className="all-centered"
            id="change-profile-image-btn"
          >
            {fullName.toUpperCase()}{" "}
            <span>
              <MdModeEdit />
            </span>
          </button>
        </section>
      </main>
    </div>
  );
};

export default MyProfile;
