import "./Account.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import ProfileIcon from "../../images/profileIcon.svg";
import AddressIcon from "../../images/addressIcon.svg";
import OrderIcon from "../../images/boxIcon.svg";
import { BiLogOutCircle } from "react-icons/bi";
import { fetchUserLogout } from "../../services/UserService";
import { useUser } from "../../hooks/useUser";
import { makeCapitalize } from "../../utils/GlobalUtils";

const accountNavs = [
  {
    heading: "Profile",
    description: "View or edit your profile",
    image: ProfileIcon,
    path: "/my_account/profile",
  },
  {
    heading: "Your Addresses",
    description: "View or edit your profile",
    image: AddressIcon,
    path: "/my_account/address",
  },
  {
    heading: "Your Orders",
    description: "View or edit your profile",
    image: OrderIcon,
    path: "/my_account/orders",
  },
];

const SignoutButton = () => {
  const { user, setUserDetails } = useUser();
  const handleLogout = async () => {
    const data = await fetchUserLogout(user, setUserDetails);
    setUserDetails(data);
  };
  return (
    <button onClick={handleLogout} id="signout-button">
      <span>
        <BiLogOutCircle />
      </span>
      Signout
    </button>
  )
}

const AccountNav = ({ nav: { path, heading, description, image } }) => {
  const getNavClass = ({ isActive }) =>
    isActive ? "nav-active-box" : "nav-default-box";

  return (
    <NavLink
      to={path}
      className={(navData) => `${getNavClass(navData)} account-nav`}
    >
      <img className="image" src={image} alt={heading.charAt(0)} />
      <h4 className="heading">{heading}</h4>
      <p className="description">{description}</p>
    </NavLink>
  );
};

const Account = () => {
  const location=useLocation();
  let url=location.pathname.split("/");
  url=url[url.length-1]
  return (
    <div id="account-page-wrapper">
      <div id="account-page">
        <header>
          <div>
            <h2>My Account</h2>
            <p>Your Account {">"} <span>{makeCapitalize(url)}</span></p>
          </div>
          <SignoutButton />
        </header>
        <nav id="account-navs">
          {accountNavs.map((nav, index) => {
            return <AccountNav key={index} nav={nav} />;
          })}
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Account;
