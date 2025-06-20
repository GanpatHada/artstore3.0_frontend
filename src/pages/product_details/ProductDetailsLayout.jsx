import { Outlet } from "react-router-dom";
import ProductDetailsProvider from "../../context/ProductDetailsContext";

const ProductDetailsLayout = () => {
  return (
    <ProductDetailsProvider>
      <Outlet />
    </ProductDetailsProvider>
  );
};

export default ProductDetailsLayout;
