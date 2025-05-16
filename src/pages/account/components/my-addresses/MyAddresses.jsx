import React from "react";
import "./MyAddresses.css";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddressItem from "../address_item/AddressItem";
import { useUser } from "../../../../hooks/useUser";

const AddAddressButton = () => {
  return (
    <div >
      <Link className="all-centered" to="/my_account/address/add">
        <span>
          <FaPlus />
        </span>
        <p>Add Address</p>
      </Link>
    </div>
  );
};

const MyAddressesList = () => {
  const {
    user: { addresses },
  } = useUser();
  return (
    <section className="addresses">
      <AddAddressButton />
      {addresses.map((address, index) => {
        return (
          <AddressItem key={address._id} address={address} index={index} />
        );
      })}
    </section>
  );
};

const MyAddresses = () => {
  return (
    <div>
      <h2>Your Addresses</h2>
      <MyAddressesList />
    </div>
  );
};

export default MyAddresses;
