import React, { useContext, useEffect, useState } from "react";
import "./CartItem.css";
import { calculatePrice } from "../../../../utils/ProductHelper";
import { getProduct } from "../../../../services/ProductService";
import { toast } from "react-toastify";
import { deleteFromCart } from "../../../../services/UserService";
import UserContext from "../../../../context/userContext";
import DotLoader from "../../../../components/dot-loader/DotLoader";
import CartItemLoader from "../cart_item_loader/CartItemLoader";
const CartItem = ({ productId, setSelectedCartItems, selectedCartItems }) => {
  const [product, setProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {
    state: {
      user: { wishlist },
    },
    dispatch,
  } = useContext(UserContext);

  const handleDeleteFromCart = async (productId) => {
    try {
      setDeleteLoading(true);
      const result = await deleteFromCart(productId);
      if (result.success) {
        dispatch({ type: "DELETE_FROM_CART", payload: productId });
        setSelectedCartItems(
          selectedCartItems.filter((item) => item.productId !== productId)
        );
        toast.success("Product has been removed from cart");
      } else toast.error(toast.message);
    } catch (error) {
      toast.error(toast.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const isItemInWishlist = () => {
    return wishlist.includes(productId);
  };

  const isItemSelected = () => {
    return selectedCartItems.find((item) => item.productId === productId);
  };

  const handleItemSelected = () => {
    if (isItemSelected())
      return setSelectedCartItems(
        selectedCartItems.filter((item) => item.productId !== productId)
      );
    const itemObject = {
      productId,
      title: product.title,
      price: calculatePrice(product.discount, product.price),
    };
    setSelectedCartItems([...selectedCartItems, itemObject]);
  };

  useEffect(() => {
    const fetchCartProduct = async () => {
      try {
        setProductLoading(true);
        const result = await getProduct(productId);
        if (result.success) {
          setProduct(result.data);
        } else toast.error(result.message);
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        setProductLoading(false);
      }
    };
    fetchCartProduct();
  }, []);

  return (
    <div className="cart-item">
      {productLoading && <CartItemLoader />}
      {product&&<><section className="cart-item-check-section all-centered">
        <input
          type="checkbox"
          checked={isItemSelected()}
          onChange={handleItemSelected}
        />
      </section>
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
          {!isItemInWishlist() && (
            <button className="add-to-wishlist-button">Add to wishlist</button>
          )}
        </section>
      </section>
      <section className="cart-item-price-section">
        <strong>{calculatePrice(product.discount, product.price)}</strong>
      </section></>}
    </div>
  );
};

export default CartItem;
