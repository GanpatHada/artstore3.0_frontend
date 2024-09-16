import { BACKEND_BASE_URL } from "../Constent";

const { nanoid } = require("nanoid");

export async function createRazorpayOrder(amount) {
  const data = JSON.stringify({
    amount: amount,
    currency: "INR",
    receipt: nanoid(),
  });
  const url = `${BACKEND_BASE_URL}/payment/create-order`;
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    response = await response.json();
    return response;
  } catch (error) {
    throw error;
  }
}


