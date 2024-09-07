import React, { useContext, useState } from "react";
import "./Product.css";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import {
  calculateAverageRating,
  calculatePrice,
  makeStarArray,
} from "../../../../utils/ProductHelper";
import {
  addToCart,
  addToWishlist,
  isAuthenticated,
} from "../../../../services/UserService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import { toast } from "react-toastify";
import SpinLoader from "../../../../components/spin-loader/SpinLoader";
const Product = ({
  productData: {
    _id,
    imageUrl,
    title,
    artist,
    price,
    ratings,
    discount,
    category,
  },
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);

  const starsCount = calculateAverageRating(ratings);
  function getPrice() {
    return calculatePrice(discount, price);
  }

  function starArray() {
    return makeStarArray(starsCount);
  }

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated()) return navigate("/login");
    if(isAvailableInCart(productId)) return navigate("/cart");
    try {
      setLoading(true);
      const result = await addToCart(productId);
      if (result.success) {
        toast.success(result.message);
        dispatch({ type: "ADD_TO_CART", payload: productId });
      }
    } catch (error) {
      toast.error("something went wrong while adding to cart");
    } finally {
      setLoading(false);
    }
  };
  const handleAddToWishlist = async (productId) => {
    if (!isAuthenticated()) return navigate("/login");
    if(isAvailableInWishlist(productId)) return navigate("/wishlist")
    try {
      setLoading(true);
      const result = await addToWishlist(productId);
      if (result.success) {
        toast.success(result.message);
        dispatch({ type: "ADD_TO_WISHLIST", payload: productId });
      }
    } catch (error) {
      toast.error("something went wrong while adding to wishlist");
    }
    finally{
      setLoading(false)
    }
  };

  const isAvailableInCart = (productId) => {
    return user?.cart.includes(productId);
  };

  const isAvailableInWishlist=(productId)=>{
    return user?.wishlist.includes(productId);
  }

  return (
    <div className="product">
      {loading && <SpinLoader />}
      <section className="product-image-section">
        <img src={imageUrl} alt="N/A" />
      </section>
      <section className="product-info-section">
        <h4>{title.length > 20 ? title.slice(0, 20).concat(" ...") : title}</h4>
        <strong className="product-category">{category}</strong>
        <section className="stars">
          {starArray().map((star, index) => {
            if (star === "FULL_STAR") return <IoMdStar key={index} />;
            if (star === "HALF_STAR") return <IoMdStarHalf key={index} />;
            return <IoMdStarOutline key={index} />;
          })}
          <span className="ratings-count">{ratings.length}</span>
        </section>
        <h3 id="price">{getPrice()}</h3>
        {discount > 0 && (
          <span className="mrp">
            M.R.P : <strike>{price}</strike> ({`${discount}% off`})
          </span>
        )}
        <section className="product-button-section">
          <button
            className="primary-btn add-to-cart"
            onClick={() => handleAddToCart(_id)}
          >
            {!isAvailableInCart(_id) ? "Add to cart" : "Go to cart"}
          </button>
          <button className="add-to-wishlist" onClick={()=>handleAddToWishlist(_id)}>
           {!isAvailableInWishlist(_id)?"Add":"Go"} to Wishlist
            </button>
        </section>
      </section>
    </div>
  );
};

export default Product;
