import { useContext } from "react";
import UserContext from "../context/userContext";
import {
  addAddressAction,
  addToCartAction,
  addToWishlistAction,
  deleteAddressAction,
  editAddressAction,
  makeAddressPrimaryAction,
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
  const removeFromCart = (cartItem) => removeFromCartAction(dispatch, cartItem);
  const addToWishlist = (wishlistItem) =>
    addToWishlistAction(dispatch, wishlistItem);

  const removeFromWishlist=(wishlistItem)=>removeFromWishlistAction(dispatch,wishlistItem)

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
    editAddress
    
  };
};
