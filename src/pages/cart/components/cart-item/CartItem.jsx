import "./CartItem.css";
import { toast } from "react-toastify";
import {fetchDecrementCartItem,fetchDeleteFromCart,fetchIncrementCartItem,} from "../../../../services/UserService";
import { useUser } from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";
import { makeCapitalize } from "../../../../utils/GlobalUtils";
import { useCart } from "../../../../hooks/useCart";
import { useState } from "react";

const QunatitySelector = ({ productId,handleDeleteFromCart}) => {
  const { incrementCartItem, decrementCartItem, user, setUserDetails } = useUser();
  const [qunatityUpdating,setQunatityUpdating]=useState(false)
  const getProductQuantity = (productId) => {
    return (
      user.cart.find((product) => product.product === productId).quantity
    );
  };
  const updateCartItemQuantity = async (type, productId) => {
    try {
      setQunatityUpdating(true)
      switch (type) {
        case "INCREMENT": {
          await fetchIncrementCartItem(user, setUserDetails, productId);
          incrementCartItem(productId);
          break;
        }
        case "DECREMENT": {
          if (getProductQuantity(productId) > 1) {
            await fetchDecrementCartItem(user, setUserDetails, productId);
            decrementCartItem(productId);
          } else {
            await handleDeleteFromCart(productId);
          }
          break;
        }
        default:
          return 0;
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setQunatityUpdating(false);
    }
  };
  return (
    <div className="quantity-selector" style={{opacity:qunatityUpdating?'20%':'100%'}}>
      <button onClick={() => updateCartItemQuantity("DECREMENT", productId)}>
        {getProductQuantity(productId) > 1 ? (
          <AiOutlineMinus />
        ) : (
          <IoTrashBinOutline />
        )}
      </button>
      {getProductQuantity(productId)}
      <button onClick={() => updateCartItemQuantity("INCREMENT", productId)}>
        <IoMdAdd />
      </button>
    </div>
  );
};

const ItemSelector = ({ productId,inStock }) => {
  const { selectedProductIds, toggleSelect } = useCart();
  return (
    <input
      className="product-selector"
      type="checkbox"
      checked={selectedProductIds.includes(productId)}
      onChange={() => toggleSelect(productId)}
      disabled={!inStock}
    />
  );
};

const CartItemPrice = ({tags, discount, price, actualPrice}) => {
  return (
    <section className="cart-item-price-section">
      <p className="tags">{makeCapitalize(tags[0])}</p>
      <div>
        {discount > 0 && <span className="discount">-{discount}%</span>}
        <strong>{price.toLocaleString("en-In")}</strong>
      </div>
      {discount > 0 && (
        <p className="mrp">
          <strike>M.R.P. {actualPrice}</strike>
        </p>
      )}
    </section>
  );
};

const CartItem = ({ cartItem,setCartItems }) => {
  const navigate = useNavigate();
  const { user, setUserDetails, removeFromCart } = useUser();
  const [deleting,setDeleting]=useState(false)

  const stockInfo = (stock) => {
    if (stock === 0) return { color: "#cc0c39", text: "Out of stock" };
    if (stock < 10)
      return { color: "#cc0c39", text: `Only ${stock} left in stock` };
    return { color: "green", text: `In stock (${stock})` };
  };

  const handleDeleteFromCart = async (productId) => {
    try {
      setDeleting(true)
      const deletedItem = await fetchDeleteFromCart(user,setUserDetails,productId);
      setCartItems(prev => prev.filter(item => item._id !== deletedItem));
      removeFromCart(deletedItem);
    } catch (error) {
      toast.error(error.message || "something went wrong while deleting");
    } finally {
      setDeleting(false)
    }
  };

  return (
    <div className={`cart-item ${deleting&&'loading'}`}>
      <ItemSelector productId={cartItem._id} inStock={cartItem.stock>0} />
      <section className="cart-item-image-section">
        <img src={cartItem.productImages[0]} alt="N/A" />
      </section>
      <section className="cart-item-info-section">
        <p
          className="product-title"
          onClick={() => navigate(`/products/${cartItem._id}`)}
        >
          {cartItem.title}
        </p>
        <p
          style={{ color: stockInfo(cartItem.stock).color }}
          className="stock-info"
        >
          {stockInfo(cartItem.stock).text}
        </p>
        <p><strong>{makeCapitalize(cartItem.category)}</strong></p>
        <p>{makeCapitalize(cartItem.medium)} | {makeCapitalize(cartItem.surface)}</p>
        <section className="cart-button-section">
          <QunatitySelector productId={cartItem._id} handleDeleteFromCart={handleDeleteFromCart} />

          <button className="secondary-text-btn" 
          onClick={() => handleDeleteFromCart(cartItem._id)}> Remove
          </button>
          <span>|</span>

          <button className="secondary-text-btn">Move to wishlist</button>
          <span>|</span>

          <button className="secondary-text-btn">Share</button>
        </section>
      </section>
      <CartItemPrice
        tags={cartItem.tags}
        discount={cartItem.discount}
        price={cartItem.price}
        actualPrice={cartItem.actualPrice}
      />
    </div>
  );
};

export default CartItem;
