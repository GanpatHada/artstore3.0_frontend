export const setUserDetailsAction=(dispatch,user)=>dispatch({type:'SET_USER',payload:user})
export const startUserLoadingAction=(dispatch)=>dispatch({type:'START_USER_LOADING'})
export const stopUserLoadingAction=(dispatch)=>dispatch({type:'STOP_USER_LOADING'})
export const addToCartAction=(dispatch,cartItem)=>dispatch({type:'ADD_TO_CART',payload:cartItem})
export const updateCartItemAction=(dispatch,cartItem)=>dispatch({type:'UPDATE_CART_ITEM',payload:cartItem})
export const removeFromCartAction=(dispatch,cartItem)=>dispatch({type:"REMOVE_FROM_CART",payload:cartItem})


export const addWishlistAction=(dispatch,wishlist)=>dispatch({type:'ADD_WISHLIST',payload:wishlist})
export const updateWishlistAction=(dispatch,wishlist)=>dispatch({type:'UPDATE_WISHLIST',payload:wishlist})
export const deleteWishlistAction=(dispatch,wishlist)=>dispatch({type:'DELETE_WISHLIST',payload:wishlist})
export const addToWishlistAction=(dispatch,wishlistData)=>dispatch({type:'ADD_TO_WISHLIST',payload:wishlistData})
export const moveToWishlistAction=(dispatch,wishlistData)=>dispatch({type:'MOVE_TO_WISHLIST',payload:wishlistData})
export const deleteFromWishlistAction=(dispatch,wishlistData)=>dispatch({type:'DELETE_FROM_WISHLIST',payload:wishlistData})
export const addNoteToWishlistItemAction=(dispatch,noteData)=>dispatch({type:'ADD_NOTE_TO_WISHLIST_ITEM',payload:noteData})
export const deleteNoteFromWishlistItemAction=(dispatch,wishlistData)=>dispatch({type:'DELETE_NOTE_FROM_WISHLIST_ITEM',payload:wishlistData})


export const removeFromWishlistAction=(dispatch,wishlistItem)=>dispatch({type:"REMOVE_FROM_WISHLIST",payload:wishlistItem})
export const addAddressAction=(dispatch,addressData)=>dispatch({type:'ADD_ADDRESS',payload:addressData})
export const deleteAddressAction=(dispatch,addressId)=>dispatch({type:'DELETE_ADDRESS',payload:addressId})
export const makeAddressPrimaryAction=(dispatch,addressId)=>dispatch({type:'MAKE_ADDRESS_PRIMARY',payload:addressId})
export const editAddressAction=(dispatch,addressData)=>dispatch({type:'EDIT_ADDRESS',payload:addressData})