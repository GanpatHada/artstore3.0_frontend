import React, {useRef, useState } from "react";
import "./CreateWishlistModal.css";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { RxCross1 } from "react-icons/rx";
import {useUser} from '../../../hooks/useUser'
import { fetchAddToWishlist, fetchCreateWishlist } from "../../../services/UserService";
import { toast } from "react-toastify";

const CreateWishlistModal = ({closeCreateWishlist,addItem}) => {
  const modalRef = useRef(null);
  const {user,setUserDetails,addWishlist}=useUser();
  const wishlistNames=user.wishlists.map(wishlist=>wishlist.listName);
  useClickOutside(modalRef, closeCreateWishlist);


  const nextShppingListName=function getNextShoppingListName() {
    const maxNumber = wishlistNames.reduce((max, name) => {
      const match = name.match(/shopping list\s*(\d*)/i);
      const num = match && match[1] ? parseInt(match[1], 10) : 0;
      return Math.max(max, num);
    }, 0);
  
    return `Shopping List ${maxNumber + 1}`;
  }


  const[listName,setListName]=useState(nextShppingListName);
  const [loading,setLoading]=useState(false)

  const handleCreate=async(e)=>{
    e.preventDefault();
    if(listName.trim().length===0)
      return toast.info('List name is required')
    try {
      setLoading(true);
      let itemAdded=false;
      let list = await fetchCreateWishlist(user,setUserDetails,listName);
      if(addItem)
      {
        const item =await fetchAddToWishlist(user,setUserDetails,list._id,addItem)
        list.items.push(item.item);
        itemAdded=true;
      }
      addWishlist(list);
      if(itemAdded)
         toast.success(`Product has been added to ${list.listName}`)
      closeCreateWishlist()  
    } catch (error) {
      toast.error(error.message||'Something went wrong while creating wishlist')
    }
    finally{
      setLoading(false);
    }
  }
  
  return (
    <div className="layover">
      <div ref={modalRef} id="create-wishlist-modal" className="modal">
        <header>
          <h4>Create a new wishlist</h4>
          <button className="all-centered" onClick={closeCreateWishlist}><RxCross1 /></button>
        </header>
        <main>
          <form action="">
            <div>
              <label htmlFor="list-name"><strong>List name (required)</strong></label>
              <input value={listName} onChange={(e)=>setListName(e.target.value)} type="text" id="list-name" />
              <p>Use lists to save items for later. All lists are private unless you share them with others.</p>
            </div>
            <div>
              <button data-loading={loading} disabled={loading} onClick={handleCreate} className="primary-btn">{loading?'Creating ...':'Create'}</button>
              <button onClick={closeCreateWishlist} className="secondary-btn">Cancel</button>
            </div>    
          </form>
        </main>
      </div>
    </div>
  );
};

export default CreateWishlistModal;
