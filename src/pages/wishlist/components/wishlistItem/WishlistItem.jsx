import { useEffect, useRef, useState } from "react";
import "./WishlistItem.css";
import { useUser } from "../../../../hooks/useUser";
import { fetchProductDetails } from "../../../../services/ProductService";
import { toast } from "react-toastify";
import {
  fetchAddToCart,
  fetchDeleteFromWishlist,
  fetchMoveToWishlist,
} from "../../../../services/UserService";
import StarsCreator from "../../../../components/stars_creator/StarsCreator";
import WishlistItemLoader from "../wishlist-item-loader/WishlistItemLoader";
import { IoIosArrowDown } from "react-icons/io";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import SpinLoader from "../../../../components/spin-loader/SpinLoader";
import { useNavigate } from "react-router-dom";

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
    } catch (error) {
      console.error("Move to wishlist failed:", error);
    } finally {
      setLoading(false);
      closeMenu();
    }
  };

  const otherWishlists = wishlists.filter(
    (wishlist) => wishlist._id !== activeListId
  );

  return (
    <div id="available-wishlists" ref={menuRef} className="p-2 w-64 bg-white shadow rounded">
      {loading && <SpinLoader />}
      {!loading && otherWishlists.length === 0 && (
        <p className="text-sm text-gray-500">No other wishlists available.</p>
      )}
      {!loading &&
        otherWishlists.map((wishlist) => (
          <div
            key={wishlist._id}
            className="wishlist cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
            onClick={(e) => handleMoveToWislist(e, wishlist._id)}
          >
            {wishlist.listName}
          </div>
        ))}
    </div>
  );
};


const WishlistItem = ({ item, activeListId }) => {
  const { user,deleteFromWishlist,addToCart, setUserDetails } = useUser();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [openAvailableWishlists, setOpenAvailableWishlists] = useState(false);
  const [deleting,setDeleting]=useState(false);
  const [addingToCart,setAddingToCart]=useState(false);
  const navigate=useNavigate()


  const handleToggleAvailableWishlists = (e) => {
    e.stopPropagation();
    setOpenAvailableWishlists(!openAvailableWishlists);
  };

  const handleDeleteFromWishlist = async (wishlistId,productId) => {
    try {
      setDeleting(true)
      const deletedProduct = await fetchDeleteFromWishlist(
        user,
        setUserDetails,
        wishlistId,
        productId
      );
      deleteFromWishlist(deletedProduct)
    } catch (error) {
      toast.error(error.message || "Somethig went wrong while deleting item");
    } finally {
      setDeleting(false)
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      setAddingToCart(true)
      const addedProduct = await fetchAddToCart(
        user,
        setUserDetails,
        productId
      );
      addToCart(addedProduct);
    } catch (error) {
      toast.error(error.message || "something went wrong while adding to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlistProductDetails = async () => {
    try {
      setLoading(true);
      const productDetails = await fetchProductDetails(item.product);
      setProduct(productDetails);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleWishlistProductDetails();
  }, []);
  return (
    <div className="wishlist-item">
      {loading && <WishlistItemLoader />}
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
          <StarsCreator
            starsCount={product?.averageRatings}
            showCount={false}
          />
        </section>
      </section>

      <section className="more-info">
        <p>Item added : {item?.createdAt}</p>
      </section>

      <section className="buttons">
        {
          user.cart.find(cartItem=>cartItem.product===item.product)?
          <button onClick={()=>navigate("/cart")} className="secondary-btn">Go to cart</button>:
          <button data-loading={addingToCart} className="cart-btn primary-btn">Add{addingToCart&&'ing...'} to cart</button>
        }
        {/* <button className="note-btn secondary-btn">Add note</button> */}
        <button
          className="move-btn secondary-btn"
          onClick={handleToggleAvailableWishlists}
        >
          <span>Move </span>
          <span className="all-centered">
            <IoIosArrowDown />
          </span>
          {openAvailableWishlists && (
            <AvailableWishlists
              product={item.product}
              activeListId={activeListId}
              closeMenu={() => setOpenAvailableWishlists(false)}
            />
          )}
        </button>
        {/* <button  className="share-btn secondary-btn">share</button> */}
        <button disabled={deleting} onClick={()=>handleDeleteFromWishlist(activeListId,product._id)} className="delete-btn secondary-btn">delete{deleting&&'ing...'}</button>
      </section>
    </div>
  );
};

export default WishlistItem;
