import "./SideNav.css";
import { RxCross1 } from "react-icons/rx";
import { useUser } from "../../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserLogout } from "../../services/UserService";
import { toast } from "react-toastify";
import DotLoader from "../dot-loader/DotLoader";
import { useState } from "react";

const SideNav = ({ setSideNav }) => {
  const { user,setUserDetails } = useUser();
   const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
    <div id="side-nav-layover">
      <nav id="side-nav">
        <button onClick={() => setSideNav(false)} id="close-side-nav-btn">
          <RxCross1 />
        </button>
        <header>
          <h4>Hello, {user?.fullName || ""}</h4>
        </header>
        <main>
          {
            !user?<button onClick={()=>navigate("/login")} className="primary-btn">Signin</button>:
            <><div id="your-lists">
            <h4>Your Lists</h4>
            <ul>
              {user?.wishlists.map((wishlist) => (
                <Link
                  key={wishlist._id}
                  to="/wishlist"
                  state={{ activeList: wishlist._id }}
                >
                  {wishlist.listName}
                </Link>
              ))}
             
            </ul>
          </div>
          <div id="your-account">
            <h4>Your Account</h4>
            <ul>
              <Link to={"/"} onClick={handleLogout}>
                Sign out {loading && <DotLoader />}
              </Link>
              
              <Link to={"/my_account/profile"}>Your Account</Link>
              <Link to={"/my_account/orders"}>Your Orders</Link>
              <Link to={"/wishlist"}>Your Wish Lists</Link>
              <Link>Your Seller Account</Link>
            </ul>
          </div>
            </>
          }
          
        </main>
      </nav>
    </div>
  );
};

export default SideNav;
