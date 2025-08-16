import React, { useEffect, useRef, useState } from "react";
import "./ManageWishlistModal.css";
import { RxCross1 } from "react-icons/rx";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useUser } from "../../../hooks/useUser";
import { fetchManageWishlist } from "../../../services/UserService";
import SpinLoader from "../../spin-loader/SpinLoader";
import { toast } from "react-toastify";
const ManageWishlistModal = ({ closeManageWishlist, activeList }) => {
  const { user,setUserDetails,updateWishlist } = useUser();
  const [loading,setLoading]=useState(false)
  const wishlists = user.wishlists;
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    wishlistId: null,
    listName: "",
    email: "",
    isDefault: false,
  });

  const initialListDetails = wishlists.find(
    (wishlist) => wishlist._id === activeList
  );

  useClickOutside(modalRef, closeManageWishlist);

  const handleFormData = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const { listName, email, isDefault } = initialListDetails;
    setFormData({ wishlistId: activeList, listName, email, isDefault });
  }, [activeList, initialListDetails]);

  const resetFormData = (e) => {
    e.preventDefault();
    const { listName, email, isDefault } = initialListDetails;
    setFormData({ wishlistId: activeList, listName, email, isDefault });
  };

  const handleSubmitForm = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const data=await fetchManageWishlist(user,setUserDetails,formData);
      toast.success('Wishlist edited successfully')
      updateWishlist(data)
    } catch (error) {
      toast.error(error.message||'unable to edit wishlist')
    }
    finally{
      setLoading(false);
      closeManageWishlist()
    }
  };

  return (
    <div className="layover">
      <div ref={modalRef} id="manage-wishlist-modal" className="modal">
        {loading&&<SpinLoader/>}
        <header>
          <h4>Manage Wishlist</h4>
          <button className="all-centered" onClick={closeManageWishlist}>
            <RxCross1 />
          </button>
        </header>
        <main>
          <form onSubmit={handleSubmitForm}>
            <div>
              <label htmlFor="list-name">List name : </label>
              <input
                required={true}
                value={formData.listName}
                name="listName"
                onChange={handleFormData}
                type="text"
                id="list-name"
              />
            </div>
            <div>
              <label htmlFor="email">E mail : </label>
              <input
                value={formData.email}
                type="text"
                name="email"
                onChange={handleFormData}
                id="email"
              />
            </div>
            <div>
              <label htmlFor="privacy">Privacy : </label>
              <input type="text" id="privacy" value="Private" disabled={true} />
            </div>
            {!initialListDetails.isDefault&&<div>
              <label htmlFor=""></label>
              <div>
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  name="isDefault"
                  onChange={handleFormData}
                />
                <span>Default List</span>
              </div>
            </div>}
            <div>
              <button
                type="button"
                onClick={resetFormData}
                className="secondary-btn"
              >
                Reset
              </button>
              <button type="submit" className="primary-btn">
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ManageWishlistModal;
