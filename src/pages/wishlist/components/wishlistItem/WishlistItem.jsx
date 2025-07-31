import React, { useEffect, useState } from "react";
import "./WishlistItem.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";
import { fetchProductDetails } from "../../../../services/ProductService";
import { toast } from "react-toastify";
import {
  fetchAddToCart,
  fetchDeleteFromWishlist,
} from "../../../../services/UserService";
import StarsCreator from "../../../../components/stars_creator/StarsCreator";
import WishlistItemLoader from "../wishlist-item-loader/WishlistItemLoader";

const AvailableWishlists = () => {
  const {
    user: { wishlists },
  } = useUser();
 return(
  <div id="available-wishlists">
  {wishlists.map((wishlist) => {
    return <div key={wishlist._id}>{wishlist.listName}</div>;
  })}
</div>
 );
};

const WishlistItem = ({ item }) => {
  const { user, removeFromWishlist, addToCart, setUserDetails } = useUser();
  const { cart } = user;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const handleDeleteFromWishlist = async (productId) => {
    try {
      setLoading(true);
      const deletedProduct = await fetchDeleteFromWishlist(
        user,
        setUserDetails,
        productId
      );
      removeFromWishlist(deletedProduct);
    } catch (error) {
      toast.error(error.message || "Somethig went wrong while deleting item");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      setLoading(true);
      const addedProduct = await fetchAddToCart(
        user,
        setUserDetails,
        productId
      );
      addToCart(addedProduct);
    } catch (error) {
      toast.error(error.message || "something went wrong while adding to cart");
    } finally {
      setLoading(false);
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
        <button className="cart-btn primary-btn">Add to cart</button>
        <button className="note-btn secondary-btn">Add note</button>
        <button className="move-btn secondary-btn">
          Move
        <AvailableWishlists/>
        </button>
        <button className="share-btn secondary-btn">share</button>
        <button className="delete-btn secondary-btn">delete</button>
      </section>
    </div>
  );
};

export default WishlistItem;
