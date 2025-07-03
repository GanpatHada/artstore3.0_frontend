import {useEffect, useState } from "react";
import "./SelectAddress.css";
import { getAddressString } from "../../../../utils/AddressHelper";
import { FaPlus } from "react-icons/fa";
import { useUser } from "../../../../hooks/useUser";
import { useCheckout } from "../../../../hooks/useCheckout";
import { useNavigate } from "react-router-dom";

const Addresses = ({ choosenAddress, setChoosenAddress }) => {
  const {
    user: { addresses },
  } = useUser();
  const navigate = useNavigate();
  const handleEditAddress = (e, addressId) => {
    e.stopPropagation();
    navigate(`/my_account/address/edit/${addressId}`);
  };

  return (
    <div id="address-list">
      {addresses.map((address) => {
        return (
          <div
            key={address._id}
            className={
              address._id === choosenAddress
                ? "selected-address address"
                : "address"
            }
            onClick={() => setChoosenAddress(address._id)}
          >
            <input
              type="radio"
              readOnly={true}
              checked={choosenAddress === address._id}
              name="select-address"
            />
            <p>
              {getAddressString(address)}
              <button onClick={(e) => handleEditAddress(e, address._id)}>
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
  const {user: { addresses }} = useUser();
  const { setAddress,address} = useCheckout();
  const navigate = useNavigate();
  const [choosenAddress, setChoosenAddress] = useState(null);
  const handleAddAddress = (e) => {
    e.stopPropagation();
    navigate(`/my_account/address/add`);
  };

  const getSelectedAddressDetails = () => {
    const addressDetails = addresses.find(
      (ad) => ad._id.toString() === address.toString()
    );
    console.log(addressDetails)
    return getAddressString(addressDetails);
  };

  useEffect(()=>{
    if(addresses.length>0) setChoosenAddress(addresses[0]._id)
  },[])

  return (
    <section id="select-address-section">
      <h2>Select Delivery Address</h2>
      <div id="select-address-box">
        <header>
          <h4>{address ? "Deliver to this address" : "Your Addresses"}</h4>
        </header>
        <main>
          {address ?  <p className="selected-address-text">{getSelectedAddressDetails()}</p>
         : 
          <>
            {addresses.length > 0 && (
              <Addresses choosenAddress={choosenAddress}setChoosenAddress={setChoosenAddress}/>
            )}
            <button id="add-address-btn" onClick={(e) => handleAddAddress(e)} className="links-buttons">
              <span>
                <FaPlus />
              </span>
              Add a new Address
            </button>
          </>
        }
        </main>
        <footer>
          {address ? (
            <button
              id="use-this-address"
              className="primary-btn"
              onClick={()=>setAddress(null)}
            >
              Change
            </button>
          ) : addresses.length>0&&(
            <button
              id="use-this-address"
              className="primary-btn"
              onClick={() => setAddress(choosenAddress)}
            >
              Deliver to this address
            </button>
          )}
        </footer>
      </div>
    </section>
  );
};

export default SelectAddress;
