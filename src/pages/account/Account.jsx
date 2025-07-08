import "./Account.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import ProfileIcon from "../../images/profileIcon.svg";
import AddressIcon from "../../images/addressIcon.svg";
import OrderIcon from "../../images/boxIcon.svg";
import { BiLogOutCircle } from "react-icons/bi";
import { fetchUserLogout } from "../../services/UserService";
import { useUser } from "../../hooks/useUser";
const Account = () => {
  const {user,setUserDetails}=useUser();
  const location = useLocation();
  const getUrl = () => {
    let url = location.pathname;
    console.log(url);
    url = url.replaceAll("/my_account", "");
    url = url.replace("/", "");
    return url.toUpperCase();
  };


  const handleLogout=async()=>{
    const data=await fetchUserLogout(user,setUserDetails);
    setUserDetails(data);
  }

  return (
    <div id="account-page">
      <div>
        <header>
          <div>
            <h1>My Account</h1>
            <p className="breadcrumbs">
              My Account {">"} <span>{getUrl()}</span>
            </p>
          </div>
          <button onClick={handleLogout} id="signout-button"><span><BiLogOutCircle /></span>Signout</button>
        </header>
        <div id="account-navs">
          <NavLink
            to={"/my_account/profile"}
            className={({ isActive }) => {
              return isActive ? "nav-active-box" : "nav-default-box" ;
            }}
          >
            
              <div>
                <img src={ProfileIcon} alt="" />
              </div>
              <div>
                <h4>Profile</h4>
                <p>view or edit your profile</p>
              </div>
            
          </NavLink>
          <NavLink
            to={"/my_account/address"}
            className={({ isActive }) => {
              return isActive ? "nav-active-box" : "nav-default-box";
            }}
          >
            
              <div>
                <img src={AddressIcon} alt="" />
              </div>
              <div>
                <h4>Address</h4>
                <p>edit,add or change your default address</p>
              </div>
            
          </NavLink>
          <NavLink
            to={"/my_account/orders"}
            className={({ isActive }) => {
              return isActive ? "nav-active-box" : "nav-default-box";
            }}
          >
            
              <div>
                <img src={OrderIcon} alt="" />
              </div>
              <div>
                <h4>My orders</h4>
                <p>track your order details from here</p>
              </div>
            
          </NavLink>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
