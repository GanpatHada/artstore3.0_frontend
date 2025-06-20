import React, {useEffect, useState } from "react";
import "./WishlistItem.css";
import { AiOutlineDelete } from "react-icons/ai";
import SpinLoader from "../../../../components/spin-loader/SpinLoader";
import { productInCart } from "../../../../utils/UserHelper";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";
import { fetchProductDetails } from "../../../../services/ProductService";
import { toast } from "react-toastify";
import { fetchAddToCart, fetchDeleteFromWishlist } from "../../../../services/UserService";
const WishlistItem = ({ productId }) => {

  const{user,removeFromWishlist,addToCart,setUserDetails}=useUser();
  const {cart}=user;
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false);
  const [product,setProduct]=useState(null)
   
  const handleDeleteFromWishlist = async (productId) => {
    try {
      setLoading(true);
      const deletedProduct = await fetchDeleteFromWishlist(user,setUserDetails,productId);
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
      const addedProduct = await fetchAddToCart(user,setUserDetails,productId);
      addToCart(addedProduct)
    } catch (error) {
      toast.error(error.message || "something went wrong while adding to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistProductDetails = async () => {
    try {
      setLoading(true)
      const productDetails = await fetchProductDetails(productId);
      setProduct(productDetails) 
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    handleWishlistProductDetails();
  }, []);
  return (
    <div className="wishlist-item">
      {loading&&<SpinLoader/>}
      <button title="remove from wishlist" className="delete-from-wishlist all-centered" onClick={()=>handleDeleteFromWishlist(productId)}>
        <AiOutlineDelete />
      </button>
      <button className="all-centered product-view-details" onClick={()=>navigate(`/products/${productId}`)}>View Details</button>
      <section className="image-section">
        <img src={product?.productImages[0]} alt="N/A" />
      </section>
      <section className="price-section">
        &#8377;{product?.price}
      </section>
      <section className="button-section">
        {productInCart(productId,cart)?<button className="primary-btn" onClick={()=>navigate("/cart")}>Go to Cart</button>:
        <button className="primary-btn" onClick={()=>handleAddToCart(productId)}>Add to Cart</button>
        }
      </section>
    </div>
  );
};

export default WishlistItem;
