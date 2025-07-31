import "./Wishlist.css";
import WishlistItem from "./components/wishlistItem/WishlistItem";
import { useUser } from "../../hooks/useUser";
import { BsGridFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import CreateWishlistModal from "../../components/modals/create_wishlist_modal/CreateWishlistModal";
import { RiFileList3Line } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import { fetchDeleteWishlist } from "../../services/UserService";
import { toast } from "react-toastify";

const WishListSidebar = ({ activeList, setActiveList }) => {
  const {
    user: { wishlists },
  } = useUser();
  return (
    <aside>
      {wishlists.map((wishlist) => {
        return (
          <div
            onClick={() => setActiveList(wishlist._id)}
            key={wishlist._id}
            style={{
              background:
                wishlist._id === activeList ? "whitesmoke" : "transparent",
            }}
          >
            <strong>{wishlist.listName}</strong>
            {wishlist.isDefault && <p>default list</p>}
          </div>
        );
      })}
    </aside>
  );
};

const EmptyList = () => {
  return (
    <div className="empty-list">
      <div>
      <RiFileList3Line />
      </div>
      <div>
      There are no items in this List. <br />
      Add items you want to shop for.
      </div>
    </div>
  );
};

const WishlistMenu=({activeList})=>{
  const{user,setUserDetails,deleteWishlist}=useUser();
  const [loading,setLoading]=useState(false)
  const handleDeleteList=async()=>{
    try {
      setLoading(true)
      const wishlistId=await fetchDeleteWishlist(user,setUserDetails,activeList);
      deleteWishlist(wishlistId);
    } catch (error) {
      toast.error(error.message||'Something went wrong while deleting wishlist')
    }
    finally{
      setLoading(false)
    }
  }

  return(
    <div id="wishlist-menu">
        <button>Manage List</button>
        <button disabled={loading} onClick={handleDeleteList}>{loading?'Deleting ...':'Delete List'}</button>
    </div>
  )
}

const WishlistContent = ({ activeList }) => {
  const[showMenu,setShowMenu]=useState(false)
  const {
    user: { wishlists },
  } = useUser();
  const activeListDetail = wishlists.find(
    (wishlist) => wishlist._id === activeList
  );

  return (
    <div id="wishlist-content">
      <section id="hero">
        <h4>{activeListDetail?.listName}</h4>
        <button onMouseEnter={()=>setShowMenu(true)} onMouseLeave={()=>setShowMenu(false)} className="secondary-btn all-centered">
          <HiDotsHorizontal />
       {showMenu&& <WishlistMenu activeList={activeList}/>}
        </button>
      </section>
      <header>
        <div>
          <button className="active">
            <BsGridFill />
          </button>
          <button>
            <GiHamburgerMenu />
          </button>
        </div>
        <div>
          <input type="search" placeholder="Search this list" />
        </div>
      </header>
      {activeListDetail?.items.length == 0 ?<EmptyList />: 
        <main id="wishlist-item-wrapper">
       { activeListDetail?.items.map((item) => (
            <WishlistItem key={item.product} item={item} />
          ))}
        </main>
        }
      
    </div>
  );
};

const Wishlist = () => {
  const {
    user: { wishlists },
  } = useUser();
  const [activeList, setActiveList] = useState(null);
  const [createWishlist, setCreateWishlist] = useState(false);

  function getActiveListId() {
    const activeListId = wishlists.find((wishlist) => wishlist.isDefault)._id;
    return activeListId;
  }

  useEffect(()=>{
     setActiveList(getActiveListId())
  },[wishlists])

  const closeCreateWishlist = () => setCreateWishlist(false);

  const handleCreateWislist = (e) => {
    e.stopPropagation();
    setCreateWishlist(true);
  };

  return (
    <div id="wishlist-page">
      {createWishlist && (
        <CreateWishlistModal closeCreateWishlist={closeCreateWishlist} />
      )}
      <div id="wishlist-wrapper">
        <header>
          <h2>Your Wishlist</h2>
          <button onClick={handleCreateWislist} className="secondary-text-btn">
            Create a List
          </button>
        </header>
        <main>
          <WishListSidebar
            activeList={activeList}
            setActiveList={setActiveList}
          />
          <WishlistContent activeList={activeList} />
        </main>
      </div>
    </div>
  );
};

export default Wishlist;
