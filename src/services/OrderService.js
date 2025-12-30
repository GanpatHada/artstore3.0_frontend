import { BACKEND_BASE_URL } from "../Constant";
import { secureFetch } from "./tokenService";

// Create order

export async function fetchCreateOrder(user, setUserDetails, amount) {
  try {
    const data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError) {
      throw new Error("Server is unreachable. Please try again later.");
    }
    throw error;
  }
}



// Verify payment


export async function fetchVerifyPayment(user, setUserDetails, verifyPaymentParams) {
  try {
    const data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/order/verifyPayment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verifyPaymentParams),
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError) {
      throw new Error("Server is unreachable. Please try again later.");
    }
    throw error;
  }
}
