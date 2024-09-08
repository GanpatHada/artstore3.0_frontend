import React, { useContext, useState } from "react";
import "./AddressItem.css";
import SpinLoader from "../../../../components/spin-loader/SpinLoader";
import { useNavigate } from "react-router-dom";
import { deleteAddress } from "../../../../services/AddressService";
import { toast } from "react-toastify";
import UserContext from "../../../../context/userContext";
const AddressItem = ({ address, index }) => {
  const { dispatch } = useContext(UserContext);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const {
    _id,
    name,
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
    setDeleteLoading(true);
    try {
      const result = await deleteAddress(_id);
      if (result.success) {
        dispatch({type:"DELETE_ADDRESS",payload:_id})
        toast.success(result.message);
      }
      else
        toast.error(result.message);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div>
      {deleteLoading && <SpinLoader />}
      {index === 0 && (
        <section className="default-address-section">Default</section>
      )}
      <section className="main-address-section">
        <strong>{name}</strong>
        <p>{`${landmark} , ${address1} , ${address2}`}</p>
        <p>{`${city} , ${state} , ${country} , ${pinCode}`}</p>
        <span>
          <strong>Phone number : </strong>
          {mobileNumber}
        </span>
      </section>
      <section className="address-buttons">
        <button onClick={() => navigate(`/my_account/address/edit/${_id}`)}>
          {" "}
          Edit
        </button>
        <span>|</span>
        <button onClick={handleDeleteAddress}> Remove</button>
        <span>|</span>
        {index !== 0 && <button>Set as default</button>}
      </section>
    </div>
  );
};

export default AddressItem;
