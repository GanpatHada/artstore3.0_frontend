import React, { useState } from "react";
import "./AddAddress.css";
import { toast } from "react-toastify";
import { getAutoLocation } from "../../utils/AddressHelper";
import { addAddress } from "../../services/AddressService";
import Loader from "../../images/loading.gif";
const AddAddress = () => {
  const [autoFillText, setAutoFillText] = useState("Auto fill");
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    country: "",
    name: "",
    mobileNumber: "",
    pinCode: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
  });
  const {
    country,
    name,
    mobileNumber,
    pinCode,
    address1,
    address2,
    landmark,
    city,
    state,
  } = address;

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const startLoading=()=>setLoading(true);
  const stopLoading=()=>setLoading(false);

  const handleAutoFill = async () => {
    setAutoFillText("Auto filling...");
    const autoFilledAddress = await getAutoLocation();
    const { city, state, country, postcode, road, county } = autoFilledAddress;
    setAddress({
      ...address,
      city,
      country,
      pinCode: postcode,
      state,
      address2: `${road || ""}${road ? "," : ""}${county || ""}`,
    });
    setAutoFillText("Auto fill");
  };

  const handleAddAddress = () => {
    let errors = false;
    for (let field in address) {
      if (
        address[field].trim().length === 0 &&
        field !== "landmark" &&
        field !== "address2"
      ) {
        errors = true;
        toast.error(`* fields are required`);
        break;
      }
    }
    if (errors) return 0;
    addAddress(address, defaultAddress,startLoading,stopLoading);
  };

  return (
    <div id="add-address-page">
      <div id="add-address-box">
        <p>
          My Account {">"} Address {">"} <span>{"Add Address"}</span>
        </p>
        <h4>{"Add"} Address</h4>
        <p className="alert">feild with asterisk (*) are required</p>
        <div id="auto-fill-location">
          <strong>save time, autofill your current location </strong>
          <button onClick={handleAutoFill}>{autoFillText}</button>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="country">Country/Region *</label>
          <input
            type="text"
            id="country"
            value={country}
            name="country"
            onChange={handleFieldChange}
          />

          <label htmlFor="full-name">Full name (first and last name) *</label>
          <input
            type="text"
            id="full-name"
            value={name}
            name="name"
            onChange={handleFieldChange}
          />

          <label htmlFor="mob-number">Mobile number *</label>
          <input
            type="number"
            id="mob-number"
            value={mobileNumber}
            name="mobileNumber"
            onChange={handleFieldChange}
          />

          <label htmlFor="pin-code">Pin code *</label>
          <input
            type="number"
            id="pin-code"
            value={pinCode}
            name="pinCode"
            onChange={handleFieldChange}
          />

          <label htmlFor="address-line-1">
            Flat, House no., Building, Company, Apartment *
          </label>
          <input
            type="text"
            id="address-line-1"
            value={address1}
            name="address1"
            onChange={handleFieldChange}
          />

          <label htmlFor="address-line-2">Area, Street, Sector, Village</label>
          <input
            type="text"
            id="address-line-2"
            value={address2}
            name="address2"
            onChange={handleFieldChange}
          />

          <label htmlFor="landmark">Landmark</label>
          <input
            type="text"
            placeholder="eg. near Hinduja hospital"
            id="landmark"
            value={landmark}
            name="landmark"
            onChange={handleFieldChange}
          />

          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            value={city}
            name="city"
            onChange={handleFieldChange}
          />

          <label htmlFor="state">State *</label>
          <input
            type="text"
            id="state"
            value={state}
            name="state"
            onChange={handleFieldChange}
          />

          <input
            type="checkbox"
            checked={defaultAddress}
            onChange={() => setDefaultAddress(!defaultAddress)}
          />
          <label htmlFor="d" id="default-address">
            {" "}
            Make this my default address
          </label>
          <button
            className="primary-btn all-centered"
            id="address-button"
            onClick={handleAddAddress}
            disabled={loading}
          >
           {loading?<img src={Loader} alt="" />:<span>Add Address</span>}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddAddress;
