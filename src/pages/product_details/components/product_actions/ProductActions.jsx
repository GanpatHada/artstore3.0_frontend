import { forwardRef, useRef, useState } from "react";
import "./ProductActions.css";
import SpinLoader from "../../../../components/spin-loader/SpinLoader";
import {
  fetchAddToCart,
  fetchAddToWishlist,
} from "../../../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../../../hooks/useUser";
import { useProductDetails } from "../../../../hooks/useProductDetails";
import { useCheckout } from "../../../../hooks/useCheckout";
import { IoIosArrowDown } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import CreateWishlistModal from "../../../../components/modals/create_wishlist_modal/CreateWishlistModal";

const MyWishlists = forwardRef(({ openCreateWishlist }, ref) => {
  const {
    productDetails: { _id: productId },
  } = useProductDetails();
  const { user, setUserDetails, addToWishlist } = useUser();
  const wishlists = user?.wishlists || [];

  const sortedWishlists = [...wishlists].sort(
    (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)
  );

  const handleAddToWishlist = async (wishlistId) => {
    try {
      const data = await fetchAddToWishlist(
        user,
        setUserDetails,
        wishlistId,
        productId
      );
      addToWishlist(data);
      toast.success("Product has been added to wishlist");
    } catch (error) {
      toast.error(
        error.message || "Something went wrong while adding to wishlist"
      );
    }
  };

  return (
    <>
      <div id="my-wishlists" ref={ref}>
        {sortedWishlists.map((wishlist) => (
          <div
            className="wishlist"
            onClick={() => handleAddToWishlist(wishlist._id)}
            key={wishlist._id}
          >
            <h5>{wishlist.listName}</h5>
            <span>{wishlist.privacy}</span>
          </div>
        ))}

        <button
          onClick={(e) => {
            e.stopPropagation();
            openCreateWishlist();
          }}
          className="secondary-text-btn"
        >
          <span>
            <GoPlus />
          </span>
          Create another List
        </button>
      </div>
    </>
  );
});

const AddToWishlist = ({ openCreateWishlist }) => {
  const [showWishlists, setShowWishlists] = useState(false);
  const [loading,setLoading]=useState(false)
  const {
    productDetails: { _id: productId },
  } = useProductDetails();

  const wishlistsRef = useRef(null);
  useClickOutside(wishlistsRef, () => setShowWishlists(false));

  const handleToggleWishlists = (e) => {
    e.stopPropagation();
    setShowWishlists(!showWishlists);
  };

  const { user, setUserDetails, addToWishlist } = useUser();
  const defaultWishlist = user?.wishlists.find(wishlist=>wishlist.isDefault)._id;

  const handleAddToDefaultWishlist = async () => {
    setLoading(true)
    try {
      const data = await fetchAddToWishlist(
        user,
        setUserDetails,
        defaultWishlist,
        productId
      );
      addToWishlist(data);
      toast.success("Product has been added to wishlist");
    } catch (error) {
      toast.error(
        error.message || "Something went wrong while adding to wishlist"
      );
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <section id="wishlist-section">
      <button className="secondary-btn" id="add-to-wishlist">
        <span onClick={handleAddToDefaultWishlist} className="button-text">
          Add{loading&&"ing..."} {!loading&&'to Wish List'}
        </span>
        <span
          onClick={handleToggleWishlists}
          style={{
            transform: showWishlists ? "rotate(180deg)" : "rotate(0deg)",
          }}
          className="button-icon all-centered"
        >
          <IoIosArrowDown />
        </span>
      </button>
      {showWishlists && (
        <MyWishlists
          openCreateWishlist={openCreateWishlist}
          ref={wishlistsRef}
        />
      )}
    </section>
  );
};

const ProductActions = () => {
  const [createWishlist, setCreateWishlist] = useState(false);
  const { user, addToCart, addToWishlist, setUserDetails } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { productDetails } = useProductDetails();
  const { setProducts, setAmount } = useCheckout();

  const closeCreateWishlist = () => setCreateWishlist(false);
  const openCreateWishlist = () => setCreateWishlist(true);

  console.log(createWishlist);

  const handleBuyNow = () => {
    const productToBuy = {
      productId: productDetails._id,
      title: productDetails.title,
      productImage: productDetails.productImages[0],
      price: productDetails.price,
      quantity: 1,
    };

    setProducts([productToBuy]);
    setAmount(productToBuy.price);
    navigate("/checkout");
  };

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    if (!user) return navigate("/login");
    if (isAvailableInCart(productId)) return navigate("/cart");
    try {
      setLoading(true);
      const result = await fetchAddToCart(user, setUserDetails, productId);
      addToCart(result);
      toast.success("product added to cart");
    } catch (error) {
      toast.error(error.message || "something went wrong while adding to cart");
    } finally {
      setLoading(false);
    }
  };

  const isAvailableInCart = (productId) => {
    return user?.cart.find((cartItem) => cartItem.product === productId);
  };

  const {
    productDetails: {
      price,
      artist: { fullName },
      _id,
      stock,
    },
  } = useProductDetails();

  const getStockInfo = () => {
    if (stock < 1) return { text: "Out of stock", color: "red" };
    if (stock < 10)
      return { text: `Only ${stock} left in stock`, color: "orangered" };
    return { text: `${stock} in stock`, color: "green" };
  };

  return (
    <section id="check-out-section">
      {createWishlist && (
        <CreateWishlistModal
          addItem={_id}
          closeCreateWishlist={closeCreateWishlist}
        />
      )}
      {loading && <SpinLoader />}
      <h2>&#8377; {price}</h2>
      <span id="free-delivery-text">
        <span>{price >= 500 && "Free delivery"}</span> Your order is eligible
        for free delivery
      </span>
      <span id="stock-text" style={{ color: getStockInfo().color }}>
        {getStockInfo().text}
      </span>
      <span id="delivery-info">
        <p>
          <span>Delivered by : </span>Artstore
        </p>
        <p>
          <span>Sold by : </span>
          {fullName}
        </p>
        <p>
          <span>Payment :</span>secure transection
        </p>
      </span>
      <section>
        <button
          className="primary-btn"
          onClick={(e) => handleAddToCart(e, _id)}
        >
          {isAvailableInCart(_id) ? "Go" : "Add"} to Cart
        </button>
        <button onClick={handleBuyNow} id="buy-now">
          Buy Now
        </button>
        <hr />
        <AddToWishlist openCreateWishlist={openCreateWishlist} />
      </section>
    </section>
  );
};

export default ProductActions;
