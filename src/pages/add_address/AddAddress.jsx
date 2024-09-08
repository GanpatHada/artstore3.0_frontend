import React, { useContext, useEffect, useState } from "react";
import "./AddAddress.css";
import { toast } from "react-toastify";
import {
  getAutoLocation,
  initialAddressState,
} from "../../utils/AddressHelper";
import { addAddress } from "../../services/AddressService";
import Loader from "../../images/loading.gif";
import { useLocation, useParams } from "react-router-dom";
import UserContext from "../../context/userContext";
import { makeCapitalize } from "../../utils/GlobalUtils";
import SpinLoader from "../../components/spin-loader/SpinLoader";
const AddAddress = () => {
  const { pathname } = useLocation();
  const { addressId } = useParams();

  const { state: userState, dispatch } = useContext(UserContext);
  const { addresses } = userState.user;

  const [autoFillText, setAutoFillText] = useState("Auto fill");
  // const [defaultAddress, setDefaultAddress] = useState(false);  //to do
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(initialAddressState);

  //internal Helper function//

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleAutoFill = async () => {
    setAutoFillText("Auto filling ...");
    try {
      const autoFilledAddress = await getAutoLocation();
      const { city, state, country, postcode, road, county } =
        autoFilledAddress;
      setAddress({
        ...address,
        city,
        country,
        pinCode: postcode,
        state,
        address2: `${road || ""}${road ? "," : ""}${county || ""}`,
      });
    } catch (error) {
      toast.error("location not found");
    } finally {
      setAutoFillText("Auto fill");
    }
  };

  const handleFetchedAddress = () => {
    const requiredAddress = addresses.find(
      (address) => address._id === addressId
    );
    if (!requiredAddress) toast.error("address not found");
    else {
      delete requiredAddress["_id"];
      setAddress({ ...requiredAddress });
    }
  };

  const areFieldErrors = () => {
    let errors = false;
    for (let field in address) {
      if (
        address[field].trim().length === 0 &&
        field !== "landmark" &&
        field !== "address2"
      ) {
        errors = true;
        toast.warning(`* fields are required`);
        break;
      }
    }
    return errors;
  };

  const handleAddAddress = async () => {
    let errors = areFieldErrors();
    if (errors) return 0;
    setLoading(true);
    try {
      const result = await addAddress(address);
      console.log(result.success);
      if (result.success) {
        dispatch({ type: "ADD_ADDRESS", payload: result.data });
        setAddress({...initialAddressState})
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  const getPage = () => {
    return pathname.includes("/my_account/address/edit/") ? "edit" : "add";
  };

  useEffect(() => {
    toast.warning("This is demo")
    if (pathname.includes("/my_account/address/edit/")) handleFetchedAddress();
  }, []);

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
  return (
    <div id="add-address-page" className="all-centered">
      <div id="add-address-box">
        {loading && <SpinLoader />}
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
            type="text"
            id="mob-number"
            value={mobileNumber}
            name="mobileNumber"
            onChange={handleFieldChange}
          />

          <label htmlFor="pin-code">Pin code *</label>
          <input
            type="text"
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

          {/* <input
            type="checkbox"
            checked={defaultAddress}
            onChange={() => setDefaultAddress(!defaultAddress)}
          />
          <label htmlFor="d" id="default-address">
            {" "}
            Make this my default address
          </label> */}
          <button
            className="primary-btn all-centered"
            id="address-button"
            onClick={handleAddAddress}
            disabled={loading}
          >
            {loading ? (
              <img src={Loader} alt="" />
            ) : (
              <span>{makeCapitalize(getPage())} Address</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddAddress;
