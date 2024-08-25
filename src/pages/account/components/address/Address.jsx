import React, {} from "react";
import "./Address.css";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Address = () => {
  const navigate=useNavigate()
  return (
    <div>
      <h4>My Addresses</h4>
      <section className="addresses">
        <div className="all-centered" onClick={()=>navigate('/my_account/address/add_address')}>
          <span>
            <FaPlus />
          </span>
          <p>Add Address</p>
        </div>
        <div>
          <section className="default-address-section">Default</section>
          <section className="main-address-section">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, in
              iste, nam dignissimos omnis repudiandae placeat hic vero,
              architecto ipsam fugiat distinctio fugit perspiciatis voluptates
              impedit nemo dicta ad eaque.
            </p>
          </section>
          <section className="address-buttons">
            <button> Edit</button>
            <span>|</span>
            <button> Remove</button>
            <span>|</span>
            <button> Set as default</button>
          </section>
        </div>
        <div>this is address</div>
        <div>this is address</div>
        <div>this is address</div>
        <div>this is address</div>
        <div>this is address</div>
      </section>
    </div>
  );
};

export default Address;
