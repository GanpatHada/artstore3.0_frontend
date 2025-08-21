import { useContext } from "react";

import { WishlistContext } from "../context/WishlistContext";
import { closeModalAction, openModalAction, setActiveListAction, toggleViewAction } from "../actions/wishlistAction";

export const useWishlist = () => {
  const { state, dispatch } = useContext(WishlistContext);

  const setActiveList = (listId) => setActiveListAction(dispatch, listId);
  const toggleView = () => toggleViewAction(dispatch);
  const openModal = (modalName) => openModalAction(dispatch, modalName);
  const closeModal = () => closeModalAction(dispatch);

  return {
    view: state.view,
    activeList: state.activeList,
    activeModal: state.activeModal,
    setActiveList,
    toggleView,
    openModal,
    closeModal,
    
  };
};
