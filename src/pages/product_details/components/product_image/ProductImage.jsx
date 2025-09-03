import "./ProductImage.css";
import { useProductDetails } from "../../../../hooks/useProductDetails";
import { useState } from "react";


const ProductAllImages=({setActiveImageIndex,activeImageIndex})=>{
  const {productDetails:{productImages}}=useProductDetails()
  return(
    <div id="product-all-images">
    {
      productImages.map((productImage,index)=>{
        return(
          <div className={activeImageIndex===index?'active':""} onMouseEnter={()=>setActiveImageIndex(index)} key={index}>
            <img src={productImage} alt="..." />
          </div>
        )
      })
    }
    </div>
  )
}

const ProductActiveImage=({activeImageIndex})=>{
  const {productDetails:{productImages}}=useProductDetails()
  return(
    <div id="product-active-image">
        <img src={productImages[activeImageIndex]} alt="n/a" />
    </div>
  )
}


const ProductImage = () => {
  const [activeImageIndex,setActiveImageIndex]=useState(0)
  return (
    <section id="image-section">
      <ProductAllImages setActiveImageIndex={setActiveImageIndex} activeImageIndex={activeImageIndex}/>
      <ProductActiveImage activeImageIndex={activeImageIndex}/>
    </section>
  );
};

export default ProductImage;
