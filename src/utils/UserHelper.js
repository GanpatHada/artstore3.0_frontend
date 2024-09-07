export function productInWishlist(productId,wishlist){
   return wishlist.includes(productId)
}


export function productInCart(productId,cart){
    return cart.includes(productId)
}