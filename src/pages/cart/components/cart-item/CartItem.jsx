import React, { useEffect, useState } from "react";
import "./CartItem.css";
import { fetchProductDetails } from "../../../../services/ProductService";
import { toast } from "react-toastify";
import {
  fetchDecrementCartItem,
  fetchDeleteFromCart,
  fetchIncrementCartItem,
} from "../../../../services/UserService";
import DotLoader from "../../../../components/dot-loader/DotLoader";
import CartItemLoader from "../cart_item_loader/CartItemLoader";
import { useUser } from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import SpinLoader from "../../../../components/spin-loader/SpinLoader";
import { IoTrashBinOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";

const CartItem = ({ cartProduct, setSelectedCartItems, selectedCartItems }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { user, setUserDetails, removeFromCart, incrementCartItem, decrementCartItem } =
    useUser();
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
    return selectedCartItems.some(
      (item) => item.productId === cartProduct.product
    );
  };

  const startQunatityLoading = () =>
    setLoading({ ...loading, type: "QUANTITY", status: true });
  const stopQuantitylaoding = () =>
    setLoading({ ...loading, type: "QUANTITY", status: false });

  const handleDeleteFromCart = async (productId) => {
    try {
      startDeleteLoading();
      const deletedItem = await fetchDeleteFromCart(user,setUserDetails,productId);
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
        selectedCartItems.filter(
          (item) => item.productId!== cartProduct.product
        )
      );
    const selectedProduct={
      productId:cartProduct.product,
      quantity:cartProduct.quantity,
      price:product.price
    }  
    setSelectedCartItems([...selectedCartItems,selectedProduct]);
  };

  const updateCartItemQuantity = async (type, productId) => {
     let newQuantity = cartProduct.quantity
    startQunatityLoading();
    try {
      switch (type) {
        case "INCREMENT": {
          await fetchIncrementCartItem(user,setUserDetails, productId);
          incrementCartItem(productId);
          newQuantity=newQuantity+1;
          break;
        }
        case "DECREMENT": {
          if (cartProduct.quantity > 1) {
            await fetchDecrementCartItem(user,setUserDetails, productId);
            decrementCartItem(productId);
            newQuantity=newQuantity-1
          } else {
            await handleDeleteFromCart(productId)
          }
          break;
        }
        default:
          return 0;
      }
      setSelectedCartItems(prev=>prev.map(p=>{
        if(p.productId===productId)
          return {...p,quantity:newQuantity}
        else
          return {...p}
      }))
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      stopQuantitylaoding();
    }
  };

  useEffect(() => {
    const fetchCartProduct = async () => {
      try {
        startProductLoading();
        const productDetails = await fetchProductDetails(cartProduct.product);
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
        {product && (
          <>
            <section className="cart-item-check-section all-centered">
              <input
                type="checkbox"
                checked={isItemSelected(cartProduct.product)}
                onChange={handleItemSelected}
              />
            </section>
            <section className="cart-item-image-section">
              <img src={product.productImages[0]} alt="N/A" />
            </section>
            <section className="cart-item-info-section">
              <h3
                className="product-title"
                onClick={() => navigate(`/products/${cartProduct.product}`)}
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
                <div className="quantity-selector">
                  {loading.type === "QUANTITY" && loading.status ? (
                    <SpinLoader />
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          updateCartItemQuantity(
                            "DECREMENT",
                            cartProduct.product
                          )
                        }
                      >
                        {cartProduct.quantity > 1 ? (
                          <AiOutlineMinus />
                        ) : (
                          <IoTrashBinOutline />
                        )}
                      </button>
                      {cartProduct.quantity}
                      <button
                        onClick={() =>
                          updateCartItemQuantity(
                            "INCREMENT",
                            cartProduct.product
                          )
                        }
                      >
                        <IoMdAdd />
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="delete-from-cart"
                  disabled={loading.type === "DELETE" && loading.status}
                  onClick={() => handleDeleteFromCart(cartProduct.product)}
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
            </section>
          </>
        )}
      </div>
    );
};

export default CartItem;
