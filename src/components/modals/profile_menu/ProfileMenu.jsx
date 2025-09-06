import "./ProfileMenu.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DefaultProfileImage from "../../../images/userImage.png";
import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { toast } from "react-toastify";
import { fetchUserLogout } from "../../../services/UserService";
import DotLoader from "../../dot-loader/DotLoader";
const ProfileMenu = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUserDetails } = useUser();
  const handleLogout = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const data = await fetchUserLogout(user, setUserDetails);
      setUserDetails(data);
    } catch (error) {
      toast.error(error.message || "Something went wrong while logging out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="profile-menu">
      {!user ? (
        <button onClick={() => navigate("/login")} className="primary-btn">
          Sign in
        </button>
      ) : (
        <>
          <header>
            <img src={user.profileImage || DefaultProfileImage} alt="." />
            <div>
              <h5>{user?.fullName || ""}</h5>
              <p>{user?.email || ""}</p>
            </div>
          </header>
          <main>
            <div id="your-lists">
              <h4>Your Lists</h4>
              <ul>
                {user.wishlists.map((wishlist) => (
                  <Link key={wishlist._id} to="/wishlist" state={{ activeList: wishlist._id }}>
                  {wishlist.listName}
                  </Link>
                ))}
                <hr />
              </ul>
            </div>
            <div id="your-account">
              <h4>Your Account</h4>
              <ul>
                <Link to={"/"} onClick={handleLogout}>
                  Sign out {loading && <DotLoader />}
                </Link>
                <hr />
                <Link to={"/my_account/profile"}>Your Account</Link>
                <Link to={"/my_account/orders"}>Your Orders</Link>
                <Link to={"/wishlist"}>Your Wish Lists</Link>
                <Link>Your Seller Account</Link>
              </ul>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default ProfileMenu;
