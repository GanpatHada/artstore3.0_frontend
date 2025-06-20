export function productInWishlist(productId,wishlist){
   return wishlist.includes(productId)
}


export function productInCart(productId,cart){
    return cart.includes(productId)
}

export function cartSubTotal(selectedCartItems){
    console.log(selectedCartItems)
    return selectedCartItems.reduce((acc, cur) => {
        return (acc += cur.price*cur.quantity);
      }, 0);
}

export async function objectURLToFile(objectURL, filename) {
  const response = await fetch(objectURL);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

export function getAccessToken(user){
  return user.accessToken;
}