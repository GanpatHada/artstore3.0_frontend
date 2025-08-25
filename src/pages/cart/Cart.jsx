import { useEffect, useMemo} from "react";
import "./Cart.css";
import CartItem from "./components/cart-item/CartItem";
import NoItem from "../../components/no_item/NoItem";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useCheckout } from "../../hooks/useCheckout";
import { fetchProducts } from "../../services/ProductService";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import CartItemLoader from "./components/cart_item_loader/CartItemLoader";
import { cartSubTotal } from "../../utils/UserHelper";

const CartHeader = () => {
  return (
    <header id="cart-header">
      <span>Shopping Cart</span>
      <span>price</span>
    </header>
  );
};

const CartContent = () => {
  const { user: { cart } } = useUser();
  const { cartItems, cartItemsLoading } = useCart();
  
  

  const cartItemsFiltered = useMemo(() => {
    const ids = cart.map((c) => c.product);
    return cartItems.filter((p) => ids.includes(p._id));
  }, [cart, cartItems]);

  if (cart.length === 0) return <NoItem type="cart" />;

  if (cartItemsLoading) return <CartItemLoader count={cart.length}/>;

  if (cartItemsFiltered.length === 0) return <NoItem type="cart" />;
  return (
    <main id="cart-items-wrapper">
      {cartItemsFiltered.map((cartItem) => {
        return <CartItem key={cartItem._id} cartItem={cartItem} />;
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

const Recommendations = () => {
  return (
    <section id="recommend-section">
      <h3>Recommendations for all products</h3>
    </section>
  );
};

const CheckOutBox = () => {
  const { selectedProductIds, cartItems } = useCart();
  const navigate = useNavigate();
  const { user: { cart } } = useUser();
  const {setProducts,setAmount} = useCheckout();
  
  const productsToCheckOut=cart.filter(item=>selectedProductIds.includes(item.product)).map(item=>{
    {
      const product=cartItems.find(p=>p._id===item.product);
      if(product){
        return{
          productId:product._id,
          title:product.title,
          productImage:product.productImages[0],
          price:product.price,
          quantity:item.quantity
        }
      }
    }
  })

  const {cartSubTotal,totalItems}=productsToCheckOut.reduce((total,item)=>{
    total.cartSubTotal+=item.price*item.quantity;
    total.totalItems+=item.quantity;
    return total;
  },{cartSubTotal:0,totalItems:0})

  const handleProceedToBuy = () => {
    setProducts(productsToCheckOut);
    setAmount(cartSubTotal)
    navigate("/checkout");
  };

  return (
    <section id="checkout-section">
      <section id="checkout-wrapper">
        {cartSubTotal >= 500 && <FreeDeliveryMessage />}
        {selectedProductIds.length === 0 ? (
          <p>No items selected</p>
        ) : (
          <p>
            Subtotal ({totalItems} items): &#8377;
            <strong>{cartSubTotal}</strong>
          </p>
        )}
        <button
          id="proceed-to-buy-button"
          disabled={selectedProductIds.length === 0}
          className="primary-btn"
          onClick={handleProceedToBuy}
        >
          Proceed to Buy
        </button>
      </section>
    </section>
  );
};

const Cart = () => {
  const { user: { cart } } = useUser();
  const productIds = cart.map((cartItem) => cartItem.product);
  const {setSelectedAll, setCartItems, startLoading, stopLoading,cartItems,selectedProductIds} = useCart();

  useEffect(() => {
    const getCartItems = async () => {
      try {
        startLoading()
        const data = await fetchProducts(productIds);
        setCartItems(data);
        setSelectedAll(data.filter((product) => product.stock !== 0));
      } catch (error) {
        toast.error(error.message || "unable to load cart products");
      } finally {
        stopLoading();
      }
    };
    if (cart.length > 0) getCartItems();
    // eslint-disable-next-line
  }, []);


  return (
    <div id="cart-page">
      <section id="cart-section">
        <CartHeader />
        <CartContent />
      </section>
      <CheckOutBox />
      <Recommendations />
    </div>
  );
};

export default Cart;
