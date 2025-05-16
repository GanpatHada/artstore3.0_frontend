import { BACKEND_BASE_URL } from "../Constant";


export async function fetchProducts() {
  const url = `${BACKEND_BASE_URL}/products`;

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