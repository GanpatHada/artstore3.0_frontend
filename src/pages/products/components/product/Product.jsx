import React, {useState } from "react";
import "./Product.css";
import {
  fetchAddToCart,
  fetchAddToWishlist,
} from "../../../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpinLoader from "../../../../components/spin-loader/SpinLoader";
import { useUser } from "../../../../hooks/useUser";
const Product = ({
  productData: {
    _id,
    productImages,
    title,
    price,
    discount,
    category,
    actualPrice,
    tags
  },
}) => {
  const [waiting, setWaiting] = useState(false);
  const navigate = useNavigate();
  const{user,userLoading,addToCart,addToWishlist}=useUser()

  

  const handleAddToCart = async(e,productId) => {
    e.stopPropagation();
    if (!user) return navigate("/login");
    if(isAvailableInCart(productId)) return navigate("/cart");
    try {
      setWaiting(true);
      const addedCartItem = await fetchAddToCart(user,productId); 
      addToCart(addedCartItem);
      toast.success('Product has been added to cart')
    } catch (error) {
      toast.error(error.message ||"something went wrong while adding to cart");
    } finally {
      setWaiting(false);
    }
  };
  const handleAddToWishlist = async(e,productId) => {
    e.stopPropagation()
    if (!user) return navigate("/login");
    if(isAvailableInWishlist(productId)) return navigate("/wishlist")
    try {
      setWaiting(true);
      const addedWishlistItem = await fetchAddToWishlist(user,productId);
      addToWishlist(addedWishlistItem)
      toast.success('Product has been added to wishlist')
    } catch (error) {
      toast.error(error.message || "something went wrong while adding to wishlist");
    }
    finally{
      setWaiting(false)
    }
  };


  
  const isAvailableInCart = (productId) => {
    return user?.cart.includes(productId);
  };

  const isAvailableInWishlist=(productId)=>{
    return user?.wishlist.includes(productId);
  }

  return (
    <div className="product" onClick={()=>navigate(`/products/${_id}`)}>
      {waiting && <SpinLoader />}
      <section className="product-image-section">
        <img src={productImages[0]} alt="N/A" />
      </section>
      <section className="product-info-section">
        <h4>{title.length > 20 ? title.slice(0, 20).concat(" ...") : title}</h4>
        <strong className="product-category">{category}</strong>
       {tags.length>0&&<div className="tag">{tags[0]}</div>}
        <h3 id="price">{price}</h3>
        {discount > 0 && (
          <span className="mrp">
            M.R.P : <strike>{actualPrice}</strike> ({`${discount}% off`})
          </span>
        )}
        {user && !userLoading && <section className="product-button-section">
          <button
            className="primary-btn add-to-cart"
            onClick={(e) => handleAddToCart(e,_id)}
          >
            {!isAvailableInCart(_id) ? "Add to cart" : "Go to cart"}
          </button>
          <button className="add-to-wishlist" onClick={(e)=>handleAddToWishlist(e,_id)}>
           {!isAvailableInWishlist(_id)?"Add":"Go"} to Wishlist
            </button>
        </section>}
      </section>
    </div>
  );
};

export default Product;
