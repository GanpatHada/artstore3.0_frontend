import React, { useContext } from "react";
import "./Address.css";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../../context/userContext";
import AddressItem from "../address_item/AddressItem";
const Address = () => {
  const {
    state: {
      user: { addresses },
    },
    dispatch,
  } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div>
      <h4>My Addresses</h4>
      <section className="addresses">
        <div
          className="all-centered"
          onClick={() => navigate("/my_account/address/add")}
        >
          <span>
            <FaPlus />
          </span>
          <p>Add Address</p>
        </div>
        {addresses.map((address,index) => {
          return <AddressItem key={address._id} address={address} index={index} />;
        })}
      </section>
    </div>
  );
};

export default Address;
