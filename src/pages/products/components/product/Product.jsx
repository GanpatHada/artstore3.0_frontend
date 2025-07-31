import {useState } from "react";
import "./Product.css";
import {
  fetchAddToCart,
} from "../../../../services/UserService";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../../../hooks/useUser";
import StarsCreator from "../../../../components/stars_creator/StarsCreator";
import { makeCapitalize } from "../../../../utils/GlobalUtils";

const ProductImage = ({ productData }) => {
  const productImage = productData?.productImages[0];
  return (
    <section
      style={{ backgroundImage: `url(${productImage})`}}
      className="product-image-section"
    ></section>
  );
};


const ProductInfo = ({ productData }) => {
  return (
    <section className="product-info-section">
      <div>
        <strong className="product-category">{productData?.category}</strong>
        <h4>{productData?.title}</h4>
      </div>
      <div className="ratings">
        <StarsCreator starsCount={productData?.averageRatings} />
      </div>
      {productData?.tags.length > 0 && (
        <div className="tag">{makeCapitalize(productData?.tags[0])}</div>
      )}
      <h3 id="price">{productData?.price.toLocaleString()}</h3>
      {productData?.discount > 0 && (
        <span className="mrp">
          M.R.P : <strike>{productData?.actualPrice}</strike> (
          {`${productData?.discount}% off`})
        </span>
      )}
    </section>
  );
};

const AddtoCartButton = ({ processing, setProcessing, productData }) => {
  const { _id: productId } = productData;
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userLoading, addToCart, setUserDetails } = useUser();
  const isInCart = user?.cart.find(
    (cartItem) => cartItem.product === productId
  );

  const handleAddToCart = async (e) => {
    e.stopPropagation()
    if (!user) return navigate("/login", { state: { from: location } });
    if (isInCart) return navigate("/cart");
    try {
      setProcessing(true);
      const addedCartItem = await fetchAddToCart(
        user,
        setUserDetails,
        productId
      );
      addToCart(addedCartItem);
      toast.success("Product has been added to cart");
    } catch (error) {
      toast.error(error.message || "something went wrong while adding to cart");
    } finally {
      setProcessing(false);
    }
  };

  const isAvailableInCart = () =>
    user?.cart.find((cartItem) => cartItem.product === productId);
  return (
    <button
      className="primary-btn add-to-cart"
      data-loading={processing}
      disabled={userLoading}
      onClick={handleAddToCart}
    >
      {!isAvailableInCart() ? "Add to cart" : "Go to cart"}
    </button>
  );
};

const ProductAction = ({ productData, setProcessing, processing }) => {
  return (
    <section className="product-button-section">
      <AddtoCartButton
        setProcessing={setProcessing}
        processing={processing}
        productData={productData}
      />
    </section>
  );
};

const Product = ({ productData, view }) => {
  const [processing, setProcessing] = useState(false);
  const navigate=useNavigate()
  return (
    <div className={`product ${view.toLowerCase()}`} onClick={()=>navigate(`${productData?._id}`)}>
      <ProductImage productData={productData} />
      <ProductInfo processing={processing} setProcessing={setProcessing} productData={productData} />
      <ProductAction processing={processing} setProcessing={setProcessing} productData={productData} />
    </div>
  );
};

export default Product;
