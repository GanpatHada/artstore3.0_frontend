import { BACKEND_BASE_URL } from "../Constant";
import { secureFetch } from "./tokenService";


export async function fetchProducts(productIds = [], fields = []) {
  const params = new URLSearchParams();

  if (productIds.length > 0) {
    params.append("ids", productIds.join(",")); 
  }

  if (fields.length > 0) {
    params.append("fields", fields.join(","));
  }

  let url = `${BACKEND_BASE_URL}/products`;
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}




export async function fetchProductDetails(productId,requiredFields){
  let url=`${BACKEND_BASE_URL}/products/${productId}`
  if(requiredFields)
    url=url.concat(`?fields=${requiredFields.join(",")}`)
  try {
    let response=await fetch(url,{
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

export async function fetchSpecialProducts(){
  try {
    let res=await fetch(`${BACKEND_BASE_URL}/products/special?type=under1k,highDiscount,limitedDeal`);
    res=await res.json();
    if(res.success){
      return res.data;
    }
    throw new Error(res.message);
  } catch (error) {
    throw error;
  }

}


export async function fetchgetReview(user,setUserDetails,productId){
  const data=await secureFetch(
    user,
    setUserDetails,
    `${BACKEND_BASE_URL}/products/${productId}/reviews`,
     {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data
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