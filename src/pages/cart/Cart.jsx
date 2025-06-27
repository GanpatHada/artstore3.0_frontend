import { useEffect, useMemo, useState } from "react";
import "./Cart.css";
import CartItem from "./components/cart-item/CartItem";
import NoItem from "../../components/no_item/NoItem";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useCheckout } from "../../hooks/useCheckout";
import { fetchProducts } from "../../services/ProductService";
import { useCart } from "../../hooks/useCart";

const CartHeader = () => {
  return (
    <header id="cart-header">
      <span>Shopping Cart</span>
      <span>price</span>
    </header>
  );
};

const CartContent = ({ cartItems,setCartItems }) => {
  if (cartItems.length === 0) return <NoItem type="cart" />;
  return (
    <main id="cart-items-wrapper">
      {cartItems.map((cartItem) => {
        return <CartItem key={cartItem._id} cartItem={cartItem} setCartItems={setCartItems} />;
      })}
    </main>
  );
};

const FreeDeliveryMessage = () => {
  return (
    <>
      <span id="free-delivery-text">
        <i className="fa-solid fa-circle-check"></i>Your order is eligible for
        free delivery
      </span>
      <span id="free-delivery-info-text">
        Get free delivery on minimum order of &#8377;500
      </span>
    </>
  );
};

const CheckOutBox = ({ cartSubTotal }) => {
  const { selectedProductIds } = useCart();
  const navigate = useNavigate();
  const {user:{cart}}=useUser();

  const calculateTotalItems=cart.filter(cartItem=>selectedProductIds.includes(cartItem.product))
  .reduce((acc,cur)=>{
     acc=acc+cur.quantity;
     return acc;
  },0)


  const { setAmount, setProducts } = useCheckout();
  // const handleProceedToBuy = () => {
  //   setAmount(cartSubTotal(selectedCartItems));
  //   setProducts(selectedCartItems);
  //   navigate("/checkout");
  // };

  return (
    <section id="checkout-section">
      <section id="checkout-wrapper">
        {cartSubTotal >= 500 && <FreeDeliveryMessage />}
        {selectedProductIds.length === 0 ?
        <p>
          No items selected
        </p>:
        <p>
          Subtotal ({calculateTotalItems} items): &#8377;
          <strong>{cartSubTotal}</strong>
        </p>
        }
        <button
          id="proceed-to-buy-button"
          disabled={selectedProductIds.length === 0}
          className="primary-btn"
        // onClick={handleProceedToBuy}
        >
          Proceed to Buy
        </button>
      </section>
    </section>
  );
};

const Cart = () => {
  const { user: { cart } } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const productIds = cart.map((cartItem) => cartItem.product).join(",");
  const {selectedProductIds,setSelectedAll } = useCart()

  useEffect(() => {
    const getCartItems = async () => {
      const data = await fetchProducts(productIds);
      setCartItems(data);
      setSelectedAll(data.filter(product=>product.stock!==0));
    };
    if(cart.length>0)
      getCartItems();
    // eslint-disable-next-line
  }, []);

  const cartSubTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      if (selectedProductIds.includes(item.product)) {
        const product = cartItems.find(p => p._id === item.product);
        if (product) {
          return total + product.price * item.quantity;
        }
      }
      return total;
    }, 0);
  }, [cart, selectedProductIds, cartItems]);
  return (
    <div id="cart-page">
      <section id="cart-section">
        <CartHeader />
        <CartContent cartItems={cartItems} setCartItems={setCartItems} />
      </section>
      <CheckOutBox cartSubTotal={cartSubTotal} />
      <section id="recommend-section">
        <h3>Recommendations for all products</h3>
      </section>
    </div>
  );
};

export default Cart;
