import React, { useContext, useState } from "react";
import "./AddressItem.css";
import SpinLoader from "../../../../components/spin-loader/SpinLoader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchDeleteAddress,
  fetchMakeAddressPrimary,
} from "../../../../services/UserService";
import { useUser } from "../../../../hooks/useUser";
const AddressItem = ({ address, index }) => {
  const { deleteAddress, makeAddressPrimary } = useUser();
  const {user}=useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    _id,
    receiverName,
    city,
    mobileNumber,
    address1,
    address2,
    state,
    country,
    landmark,
    pinCode,
  } = address;
  const handleDeleteAddress = async () => {
    setLoading(true);
    try {
      const deletedAddress = await fetchDeleteAddress(_id);
      deleteAddress(deletedAddress);
    } catch (error) {
      toast.error(error.message || "Unable to delete address");
    } finally {
      setLoading(false);
    }
  };

  const setPrimaryAddress = async () => {
    setLoading(true);
    try {
      const primaryAddressId = await fetchMakeAddressPrimary(user,_id);
      makeAddressPrimary(primaryAddressId);
    } catch (error) {
      toast.error(error.message || "Unable to delete address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <SpinLoader />}
      {index === 0 && (
        <section className="default-address-section">Default</section>
      )}
      <section className="main-address-section">
        <strong>{receiverName}</strong>
        <p>{`${landmark} , ${address1} , ${address2}`}</p>
        <p>{`${city} , ${state} , ${country} , ${pinCode}`}</p>
        <span>
          <strong>Phone number : </strong>
          {mobileNumber}
        </span>
      </section>
      <section className="address-buttons">
        <button onClick={() => navigate(`/my_account/address/edit/${_id}`)}>
          Edit
        </button>
        <span>|</span>
        <button onClick={handleDeleteAddress}> Remove</button>
        <span>|</span>
        {index !== 0 && <button onClick={setPrimaryAddress}>Set as default</button>}
      </section>
    </div>
  );
};

export default AddressItem;
