import { BACKEND_BASE_URL } from "../Constant";
import { secureFetch } from "./tokenService";


export async function fetchProducts(productIds) {
  let url=`${BACKEND_BASE_URL}/products?ids=${productIds}`;
  if(!productIds)
     url = `${BACKEND_BASE_URL}/products/`;
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    if(!response.success)
      throw new Error(response.message)
    return response.data
  } catch (error) {
   throw error;
  }
}



export async function fetchProductDetails(productId){
  try {
    let response=await fetch(`${BACKEND_BASE_URL}/products/${productId}`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
      
    })
    response=await response.json();
    if(!response.success)
      throw new Error(response.message)
    return response.data
  } catch (error) {
   throw error;
  }
}
export async function fetchUnderOneThousandProducts(){
  try {
    let response=await fetch(`${BACKEND_BASE_URL}/products/productsUnderOneThousand`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
      
    })
    response=await response.json();
    if(!response.success)
      throw new Error(response.message)
    return response.data
  } catch (error) {
   throw error;
  }
}

export async function fetchLimitedTimeDealProducts(){
  try {
    let response=await fetch(`${BACKEND_BASE_URL}/products/getProductsOnLimitedTimeDeal`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
      
    })
    response=await response.json();
    if(!response.success)
      throw new Error(response.message)
    return response.data
  } catch (error) {
   throw error;
  }
}

export async function fetchMinimumFiftyOffProducts(){
  try {
    let response=await fetch(`${BACKEND_BASE_URL}/products/getProductOnHighlyDiscount`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
      
    })
    response=await response.json();
    if(!response.success)
      throw new Error(response.message)
    return response.data
  } catch (error) {
   throw error;
  }
}

export async function fetchAddReview(user, setUserDetails, productId, review) {
  const data = await secureFetch(
    user,
    setUserDetails,
    `${BACKEND_BASE_URL}/products/${productId}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }
  );
  return data;
}

export async function fetchEditReview(user, setUserDetails, productId, reviewId, review) {
  const data = await secureFetch(
    user,
    setUserDetails,
    `${BACKEND_BASE_URL}/products/${productId}/reviews/${reviewId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }
  );
  return data;
}


export async function fetchDeleteReview(user,setUserDetails,productId,reviewId) {
  try {
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/products/${productId}/reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}