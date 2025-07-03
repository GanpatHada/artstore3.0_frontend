import { BACKEND_BASE_URL } from "../Constant";
import { secureFetch } from "./tokenService";

export async function fetchCreateOrder(amount) {
  try {
    let response = await fetch(`${BACKEND_BASE_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    response = await response.json();
    if (!response.success) 
      throw new Error(response.message);
    return response.data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Server is unreachable. Please try again later.");
    }
    throw error;
  }
}


export async function fetchOrderDetails(user,orderId) {
  try {
    let response = await fetch(`${BACKEND_BASE_URL}/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.user.accessToken,
      },
    });
    response = await response.json();
    console.log(response)
    if (!response.success) throw response.message;
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchVerifyPayment(user,setUserDetails,verifyPaymentParams) {
  try {
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/order/verifyPayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verifyPaymentParams),
    });
    return data;
  } catch (error) {
    throw error;
  }
}
