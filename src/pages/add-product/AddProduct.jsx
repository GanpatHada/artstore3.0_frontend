import React, { useRef } from "react";
import "./AddProduct.css";
const AddProduct = () => {
  const uploadFileRef = useRef(null);
  return (
    <form id="add-product-form">
      <header>
        <h1>Add Product</h1>
      </header>
      <div
        className="image-section all-centered"
        onClick={() => uploadFileRef.current.click()}
      >
        upload image <span>*</span>
      </div>
      <input
        ref={uploadFileRef}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
      />
      <div>
        <label htmlFor="title">Enter title of the painting</label>
        <input type="text" />
      </div>
      <div>

      </div>
      <div>

      </div>
      <div>

      </div>
      <div>

      </div>
    </form>
  );
};

export default AddProduct;
