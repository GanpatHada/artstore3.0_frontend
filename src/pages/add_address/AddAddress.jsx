import { useReducer, useState } from "react";
import "./AddAddress.css";
import { toast } from "react-toastify";
import {
  getAutoLocation,
  getRequiredAddress,
} from "../../utils/AddressHelper";
import { useNavigate, useParams } from "react-router-dom";
import { makeCapitalize } from "../../utils/GlobalUtils";
import SpinLoader from "../../components/spin-loader/SpinLoader";
import { useUser } from "../../hooks/useUser";
import {
  addressReducer,
  initialAddressState,
} from "../../reducers/AddressReducer";
import { fetchAddAddress, fetchEditAddress,} from "../../services/UserService";

const AddAddress = () => {
  const {action,addressId } = useParams();
  const {user,addAddress,editAddress,setUserDetails} = useUser();
  const {addresses, fullName, phone}=user;
  const navigate = useNavigate();

  const getInitialAddressState = () => {
    if (action === "edit") return getRequiredAddress(addresses, addressId);
    return initialAddressState;
  };

  const [state, dispatch] = useReducer(
    addressReducer,
    getInitialAddressState()
  );
  const [autoFilling, setAutoFilling] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_ADDRESS", payload: { type: name, value } });
  };

  const handleAutoFill = async () => {
    try {
      setAutoFilling(true);
      let autoFilledAddress = await getAutoLocation();
      autoFilledAddress = {
        ...autoFilledAddress,
        receiverName: fullName || "",
        mobileNumber: phone || "",
      };
      for (let field in autoFilledAddress) {
        dispatch({
          type: "SET_ADDRESS",
          payload: { type: field, value: autoFilledAddress[field] },
        });
      }
    } catch (error) {
      toast.error(`Failed : ${error.message || 'unable to fetch address'}`)
    } finally {
      setAutoFilling(false);
    }
  };

  const fieldsEmpty = () => {
    let address = state;
    let empty = false;
    for (let field in address) {
      if (address[field].trim().length === 0 && field !== "landmark") {
        empty = true;
        break;
      }
    }
    return empty;
  };

  const handleAddOreditAddress = async () => {
    if (fieldsEmpty())
      return toast.warning(`* Fields are required`);
    setLoading(true);
    try {
      if (action === "add") {
        const address = await fetchAddAddress(user,setUserDetails,state);
        addAddress(address);
        toast.success("Address added successfully");
      }
      if (action === "edit") {
        const address = await fetchEditAddress(user,setUserDetails,addressId, state);
        editAddress(address)
        toast.success("Address edited successfully");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
      navigate(-1);
    }
  };
  return (
    <div id="add-address-page" className="all-centered">
      <div id="add-address-box">
        {loading && <SpinLoader />}
        <p>
          My Account {">"} Address {">"} <span>{makeCapitalize(action)}</span>
        </p>
        <h4>{makeCapitalize(action)} Address</h4>
        <p className="alert">feild with asterisk * are required</p>
        <div id="auto-fill-location">
          <strong>
            save time, autofill from your current location and account{" "}
          </strong>
          <button onClick={handleAutoFill}>
            {autoFilling ? "Filling ..." : "Auto Fill"}
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="country">
            Country/Region <span>*</span>
          </label>
          <input
            type="text"
            id="country"
            value={state.country}
            name="country"
            onChange={handleFieldChange}
          />

          <label htmlFor="full-name">
            Full name (first and last name) <span>*</span>
          </label>
          <input
            type="text"
            id="full-name"
            value={state.receiverName}
            name="receiverName"
            onChange={handleFieldChange}
            pl
          />

          <label htmlFor="mob-number">
            Mobile number <span>*</span>
          </label>
          <input
            type="text"
            id="mob-number"
            value={state.mobileNumber}
            name="mobileNumber"
            onChange={handleFieldChange}
          />

          <label htmlFor="pin-code">
            Pin code <span>*</span>
          </label>
          <input
            type="text"
            id="pin-code"
            value={state.pinCode}
            name="pinCode"
            onChange={handleFieldChange}
            p
          />

          <label htmlFor="address-line-1">
            Flat, House no., Building, Company, Apartment <span>*</span>
          </label>
          <input
            type="text"
            id="address-line-1"
            value={state.address1}
            name="address1"
            onChange={handleFieldChange}
            placeholder="eg : Flat no 123, xyz group of recidency"
          />

          <label htmlFor="address-line-2">
            Area, Street, Sector, Village <span>*</span>
          </label>
          <input
            type="text"
            id="address-line-2"
            value={state.address2}
            name="address2"
            onChange={handleFieldChange}
            placeholder="eg : Mahim east"
          />

          <label htmlFor="landmark">Landmark</label>
          <input
            type="text"
            placeholder="eg : near Hinduja hospital"
            id="landmark"
            value={state.landmark}
            name="landmark"
            onChange={handleFieldChange}
          />

          <label htmlFor="city">
            City <span>*</span>
          </label>
          <input
            type="text"
            id="city"
            value={state.city}
            name="city"
            onChange={handleFieldChange}
          />

          <label htmlFor="state">
            State <span>*</span>
          </label>
          <input
            type="text"
            id="state"
            value={state.state}
            name="state"
            onChange={handleFieldChange}
          />
          <button
            className="primary-btn all-centered"
            id="address-button"
            onClick={handleAddOreditAddress}
            disabled={loading}
          >
           {loading ?action==='ADD'?'Adding ...':'Updating ...':<span>{makeCapitalize(action)} Address</span>}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddAddress;
