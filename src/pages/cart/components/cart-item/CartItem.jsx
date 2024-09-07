import React, { useContext, useEffect, useState } from "react";
import "./CartItem.css";
import { calculatePrice } from "../../../../utils/ProductHelper";
import { getProduct } from "../../../../services/ProductService";
import { toast } from "react-toastify";
import { deleteFromCart } from "../../../../services/UserService";
import UserContext from "../../../../context/userContext";
import DotLoader from "../../../../components/dot-loader/DotLoader";
const CartItem = ({ productId,setSubTotal,subTotal }) => {
  const [product, setProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { state:{user:{wishlist}}, dispatch } = useContext(UserContext);

  const handleDeleteFromCart = async (productId) => {
    try {
      setDeleteLoading(true);
      const result = await deleteFromCart(productId);
      if (result.success) {
        dispatch({ type: "DELETE_FROM_CART", payload: productId });
        toast.success(productId);
      } else toast.error(toast.message);
    } catch (error) {
      toast.error(toast.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const isItemInWishlist=()=>{
     return wishlist.includes(productId)
  }

  useEffect(() => {
    const fetchCartProduct = async () => {
      try {
        const result = await getProduct(productId);
        if (result.success) 
        {
          setProduct(result.data);
          setSubTotal(subTotal+calculatePrice(result.data.discount,result.data.price))
        }  
        else toast.error(result.message);
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    };
    fetchCartProduct();
  }, []);

  return (
    <div className="cart-item">
      {product && (
        <>
          <section className="cart-item-image-section">
            <img src={product.imageUrl} alt="N/A" />
          </section>
          <section className="cart-item-info-section">
            <h3 className="product-title">{product.title}</h3>
            <span className="product-artist">
              <strong>Artist : </strong>
              {product.artist}
            </span>
            <span className="product-mrp">
              <strong>M.R.P. : </strong>
              <strike>{product.price}</strike>
            </span>
            <span className="product-discount">
              Flat <strong>{product.discount}%</strong> off
            </span>
            <span className="limited-deal">
              <strong>Limited time deal</strong>
            </span>
            <section className="cart-button-section">
              <button
                className="delete-from-cart"
                disabled={deleteLoading}
                onClick={() => handleDeleteFromCart(product._id)}
              >
                {deleteLoading ? (
                  <>
                    Deleting <DotLoader />
                  </>
                ) : (
                  "Delete"
                )}
              </button>
              {(!isItemInWishlist()) && <button className="add-to-wishlist-button">
                Add to wishlist
              </button>}
            </section>
          </section>
          <section className="cart-item-price-section">
            <strong>{calculatePrice(product.discount, product.price)}</strong>
          </section>
        </>
      )}
    </div>
  );
};

export default CartItem;
