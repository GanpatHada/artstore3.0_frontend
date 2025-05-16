export function productInWishlist(productId,wishlist){
   return wishlist.includes(productId)
}


export function productInCart(productId,cart){
    return cart.includes(productId)
}

export function cartSubTotal(selectedCartItems){
    return selectedCartItems.reduce((acc, cur) => {
        return (acc += cur.price);
      }, 0);
}