import { BACKEND_BASE_URL } from "../Constent";

const getToken = () => localStorage.getItem("token");
export function isAuthenticated(){
  return localStorage.getItem("token");
}

export async function getUser() {
  try {
    if (!getToken()) 
        return {data:null,message:"user is not logged in",success:true};
    const response = await fetch(`${BACKEND_BASE_URL}/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
    const user = await response.json();
    return user;
  } catch (error) {
    throw error;
  }
}

export async function addToCart(productId){
  try {
    const response=await fetch(`${BACKEND_BASE_URL}/user/cart`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      }, 
      body:JSON.stringify({productId})
    })
    const responseJson=await response.json();
    console.log(responseJson)
    return responseJson;
  } catch (error) {
    throw error;
  }
}


export async function addToWishlist(productId){
  try {
    const response=await fetch(`${BACKEND_BASE_URL}/user/wishlist`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      }, 
      body:JSON.stringify({productId})
    })
    const responseJson=await response.json();
    return responseJson;
  } catch (error) {
    throw error;
  }
}

export async function deleteFromCart(productId){
  try {
    const response=await fetch(`${BACKEND_BASE_URL}/user/cart`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      }, 
      body:JSON.stringify({productId})
    })
    const responseJson=await response.json();
    return responseJson;
  } catch (error) {
    throw error
  }
}
export async function deleteFromWishlist(productId){
  try {
    const response=await fetch(`${BACKEND_BASE_URL}/user/wishlist`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      }, 
      body:JSON.stringify({productId})
    })
    const responseJson=await response.json();
    return responseJson;
  } catch (error) {
    throw error
  }
}