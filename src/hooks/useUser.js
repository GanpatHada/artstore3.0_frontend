import { useContext } from "react";
import UserContext from "../context/userContext";
import {
  addAddressAction,
  addNoteToWishlistItemAction,
  addToCartAction,
  addToWishlistAction,
  addWishlistAction,
  deleteAddressAction,
  deleteFromWishlistAction,
  deleteNoteFromWishlistItemAction,
  deleteWishlistAction,
  editAddressAction,
  makeAddressPrimaryAction,
  moveToWishlistAction,
  removeFromCartAction,
  removeFromWishlistAction,
  setUserDetailsAction,
  startUserLoadingAction,
  stopUserLoadingAction,
  updateCartItemAction,
  updateWishlistAction,
} from "../actions/userAction";

export const useUser = () => {
  const { state, dispatch } = useContext(UserContext);
  const { user, userLoading } = state;

  const setUserDetails = (user) => setUserDetailsAction(dispatch, user);
  const startUserLoading = () => startUserLoadingAction(dispatch);
  const stopUserLoading = () => stopUserLoadingAction(dispatch);

  const addToCart = (cartItem) => addToCartAction(dispatch, cartItem);
  const updateCartItem=(cartItem)=>updateCartItemAction(dispatch,cartItem)
  const removeFromCart = (cartItem) => removeFromCartAction(dispatch, cartItem);


  const addWishlist = (wishlist) =>
    addWishlistAction(dispatch, wishlist);

  const updateWishlist = (wishlist) =>
    updateWishlistAction(dispatch, wishlist);


  const deleteWishlist = (wishlist) =>
    deleteWishlistAction(dispatch, wishlist);


  const addToWishlist = (wishlistData) =>
    addToWishlistAction(dispatch, wishlistData);


  const moveToWishlist = (wishlistData) =>
    moveToWishlistAction(dispatch, wishlistData);


  const deleteFromWishlist = (wishlistData) =>
    deleteFromWishlistAction(dispatch, wishlistData);

  const removeFromWishlist=(wishlistItem)=>removeFromWishlistAction(dispatch,wishlistItem)

  const addNoteToWishlistItem=(noteData)=>addNoteToWishlistItemAction(dispatch,noteData)
  const deleteNoteFromWishlistItem=(wishlistData)=>deleteNoteFromWishlistItemAction(dispatch,wishlistData)

  const deleteAddress=(addressId)=>deleteAddressAction(dispatch,addressId)
  const makeAddressPrimary=(addressId)=>makeAddressPrimaryAction(dispatch,addressId)
  const addAddress=(addressData)=>addAddressAction(dispatch,addressData)
  const editAddress=(addressData)=>editAddressAction(dispatch,addressData);

  return {
    setUserDetails,
    startUserLoading,
    stopUserLoading,
    user,
    userLoading,
    addToCart,
    addToWishlist,
    removeFromCart,
    removeFromWishlist,
    deleteAddress,
    makeAddressPrimary,
    addAddress,
    editAddress,
    addWishlist,
    updateWishlist,
    deleteWishlist,
    moveToWishlist,
    deleteFromWishlist,
    addNoteToWishlistItem,
    deleteNoteFromWishlistItem,
    updateCartItem
    
  };
};
