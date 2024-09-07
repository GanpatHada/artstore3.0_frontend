import { BACKEND_BASE_URL } from "../Constent";

export async function getProducts() {
  const url = `${BACKEND_BASE_URL}/products`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const products=await response.json();
    return {data:products.data,success:true,message:"products fetched successfully"}
  } catch (error) {
    return {success:false,message:"unable to load products"}
  }
}



export async function getProduct(productId){
  try {
    const response=await fetch(`${BACKEND_BASE_URL}/products/${productId}`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
      
    })
    const responseJson=await response.json();
    return responseJson;
  } catch (error) {
    return {success:false,message:"unable to fetch details"}
  }
}