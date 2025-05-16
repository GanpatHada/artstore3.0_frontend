import React, { useEffect, useState } from "react";
import "./CartItem.css";
import { calculatePrice } from "../../../../utils/ProductHelper";
import { fetchProductDetails } from "../../../../services/ProductService";
import { toast } from "react-toastify";
import { fetchDeleteFromCart } from "../../../../services/UserService";
import DotLoader from "../../../../components/dot-loader/DotLoader";
import CartItemLoader from "../cart_item_loader/CartItemLoader";
import { useUser } from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const CartItem = ({ productId, setSelectedCartItems, selectedCartItems }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { user,removeFromCart,} = useUser();
  const [loading, setLoading] = useState({
    type: null,
    status: true,
  });

  //helpers
  const startProductLoading = () =>
    setLoading({ ...loading, type: "PRODUCT", status: true });

  const stopProductLoading = () =>
    setLoading({ ...loading, type: "PRODUCT", status: false });

  const startDeleteLoading = () =>
    setLoading({ ...loading, type: "DELETE", status: true });

  const stopDeleteLoading = () =>
    setLoading({ ...loading, type: "DELETE", status: false });

  const isItemSelected = () => {
    return selectedCartItems.some((item) => item.productId === productId);
  };

  const handleDeleteFromCart = async (productId) => {
    try {
      startDeleteLoading();
      const deletedItem = await fetchDeleteFromCart(user,productId);
      removeFromCart(deletedItem);
      if (isItemSelected(deletedItem))
        setSelectedCartItems(
          selectedCartItems.filter((item) => item.productId !== deletedItem)
        );
    } catch (error) {
      toast.error(error.message || "something went wrong while deleting");
    } finally {
      stopDeleteLoading();
    }
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
        startProductLoading();
        const productDetails = await fetchProductDetails(productId);
        setProduct(productDetails);
      } catch (error) {
        toast.error(
          error.message || "Something went wrong while fetching cart products"
        );
      } finally {
        stopProductLoading();
      }
    };
    fetchCartProduct();
  }, []);

  if (loading.type === "PRODUCT" && loading.status)
    return (
      <div className="cart-item">
        <CartItemLoader />
      </div>
    );
  else
    return (
      <div className="cart-item">
        {product && <><section className="cart-item-check-section all-centered">
          <input
            type="checkbox"
            checked={isItemSelected(productId)}
            onChange={handleItemSelected}
          />
        </section>
        <section className="cart-item-image-section">
          <img src={product.productImages[0]} alt="N/A" />
        </section>
        <section className="cart-item-info-section">
          <h3
            className="product-title"
            onClick={() => navigate(`/products/${productId}`)}
          >
            {product.title}
          </h3>
          <span className="product-artist">
            <strong>Artist : </strong>
            {product.artist.fullName}
          </span>
          <span className="product-mrp">
            <strong>M.R.P. : </strong>
            <strike>{product.price}</strike>
          </span>
          <span className="product-discount">
            Flat <strong>{product.discount}%</strong> off
          </span>
          <section className="cart-button-section">
            <button
              className="delete-from-cart"
              disabled={loading.type === "DELETE" && loading.status}
              onClick={() => handleDeleteFromCart(product._id)}
            >
              {loading.type === "DELETE" && loading.status ? (
                <span>
                  Deleting <DotLoader />
                </span>
              ) : (
                <span>Delete</span>
              )}
            </button>
          </section>
        </section>
        <section className="cart-item-price-section">
          <strong>{product.price.toLocaleString("en-In")}</strong>
        </section></>}
      </div>
    );
};

export default CartItem;
