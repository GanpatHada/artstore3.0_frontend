import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../services/ProductService";
import { toast } from "react-toastify";
import SpinLoader from '../../components/spin-loader/SpinLoader'
import ProductInfo from './components/product_info/ProductInfo'
import { fetchAddProductToViewedItems } from "../../services/UserService";


const ProductDetails = () => {
 
  const {productId}=useParams();
  const [productDetails,setProductDetails]=useState(null);
  const [loading,setLoading]=useState(false);


  const getProductDetails=async()=>{
    try {
      setLoading(true);
      const product=await fetchProductDetails(productId);
      setProductDetails(product);
      fetchAddProductToViewedItems({productId:product._id,productImage:product.productImages[0]})
    } catch (error) {
      toast.error(error.message || "Something went wrong")
    }
    finally{
      setLoading(false);
    }  
  }

  useEffect(()=>{
    getProductDetails()
  },[])

  return (
    <div id="product-details-page">
      <div id="product-details-wrapper">
        {(!loading && productDetails) ? (   
            <ProductInfo productDetails={productDetails} />
        ) : (
          <SpinLoader />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
