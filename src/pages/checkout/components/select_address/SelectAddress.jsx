import React, { useContext, useState } from "react";
import "./SelectAddress.css";
import UserContext from "../../../../context/userContext";
import { getAddressString } from "../../../../utils/AddressHelper";
import { FaPlus } from "react-icons/fa";

const Addresses = () => {
  const {
    state: {
      user: { addresses },
    },
  } = useContext(UserContext);
  const [selectedAddress, setSelectedAddress] = useState(
    addresses.length > 0 ? addresses[0]._id : null
  );

  const handleEditAddress = (e) => {
    e.stopPropagation();
  };

  return (
    <div id="address-list">
      {addresses.map((address) => {
        return (
          <div
            key={address._id}
            className={
              address._id === selectedAddress
                ? "selected-address address"
                : "address"
            }
            onClick={() => setSelectedAddress(address._id)}
          >
            <input
              type="radio"
              readOnly={true}
              checked={selectedAddress === address._id}
              name="select-address"
            />
            <p>
              {getAddressString(address)}
              <button onClick={(e) => handleEditAddress(e)}>
                Edit address
              </button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

const SelectAddress = () => {
  const {
    state: {
      user: { addresses },
    },
  } = useContext(UserContext);
  return (
    <section id="select-address-section">
      <h2>Select Delivery Address</h2>
      <div id="select-address-box">
        <h4>Your Addresses</h4>
        {addresses.length > 0 && <Addresses />}
        <button id="add-address-btn" className="links-buttons">
          <span>
            <FaPlus />
          </span>
          Add a new Address
        </button>
        <footer>
          <button id="use-this-address" className="primary-btn">
            Use this address
          </button>
        </footer>
      </div>
    </section>
  );
};

export default SelectAddress;
