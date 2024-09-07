import React, { useContext, useEffect, useState } from "react";
import "./WishlistItem.css";
import { AiOutlineDelete } from "react-icons/ai";
import { getProduct } from "../../../../services/ProductService";
import { toast } from "react-toastify";
import { calculatePrice } from "../../../../utils/ProductHelper";
import UserContext from "../../../../context/userContext";
import { addToCart, deleteFromWishlist } from "../../../../services/UserService";
import SpinLoader from "../../../../components/spin-loader/SpinLoader";
import { productInCart } from "../../../../utils/UserHelper";
import { useNavigate } from "react-router-dom";
const WishlistItem = ({ productId }) => {

  const{state:{user:{cart}},dispatch}=useContext(UserContext)
  const navigate=useNavigate()
  const [product, setProduct] = useState({});
  const [loading,setLoading]=useState(false);
   
  const handleDeleteFromWishlist = async (productId) => {
    try {
      setLoading(true);
      const result = await deleteFromWishlist(productId);
      if (result.success) {
        dispatch({ type: "DELETE_FROM_WISHLIST", payload: productId });
        toast.success(result.message);
      } else toast.error(toast.message);
    } catch (error) {
      toast.error(toast.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if(productInCart(productId,cart))
      navigate("/cart");
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

  const fetchWishlist = async () => {
    try {
      const result = await getProduct(productId);
      if (result.success) {
        setProduct(result.data);
      } else toast.error(result.message);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);
  return (
    <div className="wishlist-item">
      {loading&&<SpinLoader/>}
      <button title="remove from wishlist" className="delete-from-wishlist all-centered" onClick={()=>handleDeleteFromWishlist(productId)}>
        <AiOutlineDelete />
      </button>
      <section className="image-section">
        <img src={product?.imageUrl} alt="N/A" />
      </section>
      <section className="price-section">
        &#8377;{calculatePrice(product?.discount, product.price)}
      </section>
      <section className="button-section">
        <button className="primary-btn" onClick={()=>handleAddToCart(productId)}>{productInCart(productId,cart)?"Go":"Add"} to Cart</button>
      </section>
    </div>
  );
};

export default WishlistItem;
