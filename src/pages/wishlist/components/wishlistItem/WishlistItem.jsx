import {useRef, useState } from "react";
import "./WishlistItem.css";
import { useUser } from "../../../../hooks/useUser";
import { toast } from "react-toastify";
import {
  fetchAddToCart,
  fetchDeleteFromWishlist,
  fetchMoveToWishlist,
} from "../../../../services/UserService";
import StarsCreator from "../../../../components/stars_creator/StarsCreator";
import { IoIosArrowDown } from "react-icons/io";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import SpinLoader from "../../../../components/spin-loader/SpinLoader";
import { useNavigate } from "react-router-dom";
import NoteModal from "../../../../components/modals/note_modal/NoteModal";
import { formattDate } from "../../../../utils/GlobalUtils";

const AvailableWishlists = ({ activeListId, closeMenu, product }) => {
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);
  const { user, setUserDetails, moveToWishlist } = useUser();
  const { wishlists } = user;
  


  useClickOutside(menuRef, closeMenu);

  const handleMoveToWislist = async (e, targetWishlistId) => {
    e.stopPropagation();
    if (loading) return;

    try {
      setLoading(true);

      const data = await fetchMoveToWishlist(
        user,
        setUserDetails,
        activeListId,
        product,
        targetWishlistId
      );

      const payload = {
        productId: data.productId,
        sourceWishlistId: data.fromWishlistId,
        targetWishlistId: data.toWishlistId,
      };
      moveToWishlist(payload);

      const targetWishlistName=wishlists.find(wishlist=>wishlist._id===targetWishlistId)?.listName

      toast.info(`Product has been moved to ${targetWishlistName||""}`)
    } catch (error) {
      toast.error(error.message||'Unable to move product')
    } finally {
      setLoading(false);
      closeMenu();
    }
  };

  const otherWishlists = wishlists.filter(
    (wishlist) => wishlist._id !== activeListId
  );

  return (
    <div id="available-wishlists" ref={menuRef} className="">
      {loading&&<SpinLoader/>}
      {otherWishlists.length === 0?
        <p className="">No other wishlists available.</p>:
        otherWishlists.map((wishlist) => (
          <div
            key={wishlist._id}
            className="wishlist"
            onClick={(e) => handleMoveToWislist(e, wishlist._id)}
          >
            {wishlist.listName}
          </div>
        ))}
    </div>
  );
};


const WishlistItem = ({ product, activeListId }) => {
  const { user, deleteFromWishlist, addToCart, setUserDetails } = useUser();
  const { wishlists } = user;
  const [noteModal, setNoteModal] = useState(false);
  const [initialNote, setInitialNote] = useState(null);
  const [openAvailableWishlists, setOpenAvailableWishlists] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const navigate = useNavigate();

  const currentWishlist = wishlists.find(wl => wl._id === activeListId);
  const currentItem = currentWishlist?.items?.find(item => item.product === product._id);

  const handleNoteModal = (e) => {
    e.stopPropagation();
    setInitialNote(currentItem?.note || null);
    setNoteModal(true);
  };

  const handleToggleAvailableWishlists = (e) => {
    e.stopPropagation();
    setOpenAvailableWishlists(prev => !prev);
  };

  const handleDeleteFromWishlist = async (wishlistId, productId) => {
    try {
      setDeleting(true);
      const deletedProduct = await fetchDeleteFromWishlist(user, setUserDetails, wishlistId, productId);
      deleteFromWishlist(deletedProduct);
    } catch (error) {
      toast.error(error.message || "Something went wrong while deleting item");
    } finally {
      setDeleting(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      const addedProduct = await fetchAddToCart(user, setUserDetails, product._id);
      addToCart(addedProduct);
    } catch (error) {
      toast.error(error.message || "Something went wrong while adding to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="wishlist-item">
      {noteModal && (
        <NoteModal
          wishlistId={activeListId}
          productId={product._id}
          initialNote={initialNote}
          closeModal={() => setNoteModal(false)}
        />
      )}
      <section className="image-wrapper">
        <div
          className="image"
          style={{ backgroundImage: `url(${product?.productImages[0]})` }}
        ></div>
      </section>
      <section className="title-artist-ratings">
        <h5>{product?.title}</h5>
        <p>By {product?.artist?.fullName}</p>
        <section className="ratings">
          <StarsCreator starsCount={product?.averageRatings} showCount={false} />
        </section>
        <h4>&#8377;{product?.price}</h4>
      </section>
      
      <section className="more-info">
        {currentItem?.note && (
          <>
            <p>{currentItem.note.comment}</p>
            <p>Priority : {currentItem.note.priority}</p>
          </>
        )}
        <p>Item added : {formattDate(currentItem?.createdAt)}</p>
      </section>

      <section className="buttons">
        {user.cart.find(cartItem => cartItem.product === product._id) ? (
          <button onClick={() => navigate("/cart")} className="secondary-btn">
            Go to cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            data-loading={addingToCart}
            className="cart-btn primary-btn"
          >
            Add{addingToCart && "ing..."} to cart
          </button>
        )}
        <button onClick={handleNoteModal} className="note-btn secondary-btn">
          {currentItem?.note ? "Edit" : "Add"} note
        </button>
        <button className="move-btn secondary-btn" onClick={handleToggleAvailableWishlists}>
          <span>Move </span>
          <span className="all-centered">
            <IoIosArrowDown />
          </span>
          {openAvailableWishlists && (
            <AvailableWishlists
              product={product._id}
              activeListId={activeListId}
              closeMenu={() => setOpenAvailableWishlists(false)}
            />
          )}
        </button>
        <button className="share-btn secondary-btn">share</button>
        <button
          disabled={deleting}
          onClick={() => handleDeleteFromWishlist(activeListId, product._id)}
          className="delete-btn secondary-btn"
        >
          delete{deleting && "ing..."}
        </button>
      </section>
    </div>
  );
};
 
export default WishlistItem
