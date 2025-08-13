import { useContext } from "react";
import UserContext from "../context/userContext";
import {
  addAddressAction,
  addNoteToWishlistItemAction,
  addToCartAction,
  addToWishlistAction,
  addWishlistAction,
  decrementCartItemAction,
  deleteAddressAction,
  deleteFromWishlistAction,
  deleteNoteFromWishlistItemAction,
  deleteWishlistAction,
  editAddressAction,
  incrementCartItemAction,
  makeAddressPrimaryAction,
  moveToWishlistAction,
  removeFromCartAction,
  removeFromWishlistAction,
  setUserDetailsAction,
  startUserLoadingAction,
  stopUserLoadingAction,
} from "../actions/userAction";

export const useUser = () => {
  const { state, dispatch } = useContext(UserContext);
  const { user, userLoading } = state;

  const setUserDetails = (user) => setUserDetailsAction(dispatch, user);
  const startUserLoading = () => startUserLoadingAction(dispatch);
  const stopUserLoading = () => stopUserLoadingAction(dispatch);

  const addToCart = (cartItem) => addToCartAction(dispatch, cartItem);
  const incrementCartItem=(cartItem)=>incrementCartItemAction(dispatch,cartItem)
  const decrementCartItem=(cartItem)=>decrementCartItemAction(dispatch,cartItem)
  const removeFromCart = (cartItem) => removeFromCartAction(dispatch, cartItem);


  const addWishlist = (wishlist) =>
    addWishlistAction(dispatch, wishlist);


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
    incrementCartItem,
    decrementCartItem,
    addToWishlist,
    removeFromCart,
    removeFromWishlist,
    deleteAddress,
    makeAddressPrimary,
    addAddress,
    editAddress,
    addWishlist,
    deleteWishlist,
    moveToWishlist,
    deleteFromWishlist,
    addNoteToWishlistItem,
    deleteNoteFromWishlistItem
    
  };
};
