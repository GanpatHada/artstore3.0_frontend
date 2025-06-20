import { useEffect} from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../services/ProductService";
import { toast } from "react-toastify";
import ProductInfo from './components/product_info/ProductInfo'
import { fetchAddProductToViewedItems } from "../../services/UserService";
import { useProductDetails } from "../../hooks/useProductDetails";
import ProductDetailsLoader from "./components/product_details_loader/ProductDetailsLoader";


const ProductDetails = () => {
 
  const {productId}=useParams();
  const {productDetails,loading,startProductDetailsLoading,stopProductDetailsLoading,setProductDetails}=useProductDetails();
  const getProductDetails=async()=>{
    startProductDetailsLoading()
    try {
      const product=await fetchProductDetails(productId);
      setProductDetails(product);
      fetchAddProductToViewedItems({productId:product._id,productImage:product.productImages[0]})
    } catch (error) {
      toast.error(error.message || "Something went wrong")
    }
    finally{
      stopProductDetailsLoading()
    }  
  }

  useEffect(()=>{
    if(!productDetails)
       getProductDetails()
  },[])

  return (
    <div id="product-details-page">
      <div id="product-details-wrapper">
        {(!loading && productDetails) ? (   
            <ProductInfo/>
        ) : (
          <ProductDetailsLoader/>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
