import { useState } from 'react'
import { useUser } from '../../../../hooks/useUser';
import { useWishlist } from '../../../../hooks/useWishlist';
import './WishlistActionMenu.css'
import { fetchDeleteWishlist } from '../../../../services/UserService';
import { toast } from 'react-toastify';

const WishlistActionMenu = () => {
   const { user, setUserDetails, deleteWishlist } = useUser();
    const [loading, setLoading] = useState(false);
    const {openModal,activeList}=useWishlist();
    const {user:{wishlists}}=useUser()
    const {setActiveList}=useWishlist()
  
    const openManageWishlistModal = (e) => {
      e.stopPropagation();
      openModal("MANAGE_LIST");
    };
  
    const handleDeleteList = async () => {
      try {
        setLoading(true);
        const wishlistId = await fetchDeleteWishlist(
          user,
          setUserDetails,
          activeList
        );
        setActiveList(wishlists.find(wishlist=>wishlist.isDefault)._id)
        deleteWishlist(wishlistId);
      } catch (error) {
        toast.error(
          error.message || "Something went wrong while deleting wishlist"
        );
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div id="wishlist-action-menu">
        <button onClick={openManageWishlistModal}>Manage List</button>
        <button disabled={loading} onClick={handleDeleteList}>
          {loading ? "Deleting ..." : "Delete List"}
        </button>
      </div>
    );
}

export default WishlistActionMenu
