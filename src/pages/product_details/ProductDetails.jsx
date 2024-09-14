import React, { useEffect, useState } from "react";
import "./ProductDetails.css";

import { getProduct } from "../../services/ProductService";
import { toast } from "react-toastify";

import Ratings from "./components/ratings/Ratings";
import Reviews from "./components/reviews/Reviews";
import { useParams } from "react-router-dom";
import ProductInfo from "./components/product_info/ProductInfo";
import SpinLoader from "../../components/spin-loader/SpinLoader";
const ProductDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const result = await getProduct(productId);
      if (result.success) {
        setProductDetails(result.data);
      } else toast.error(result.error);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isObjectEmpty=Object.keys(productDetails).length===0

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div id="product-details-page">
      <div id="product-details-wrapper">
        {(!loading && !isObjectEmpty) ? (
          <>
            <ProductInfo productDetails={productDetails} />
            <Ratings ratings={productDetails.ratings} />
            <Reviews reviews={productDetails.reviews} />
          </>
        ) : (
          <SpinLoader />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
