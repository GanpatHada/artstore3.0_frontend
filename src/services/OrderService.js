import { BACKEND_BASE_URL } from "../Constant";

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
    if (!response.success) throw response.message;
    return response.data;
  } catch (error) {
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

export async function fetchVerifyPayment(
  user, 
  paymentResponse,
  shippingAddress,
  products,
  totalAmount,
  deliveryCharge
) {

  console.log(totalAmount,deliveryCharge) 
  const {
    razorpay_signature: signature,
    razorpay_payment_id: paymentId,
    razorpay_order_id: orderId,
  } = paymentResponse;
  try {
    let response = await fetch(`${BACKEND_BASE_URL}/order/doPayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.accessToken
      },
      body: JSON.stringify({
        orderId,
        paymentId,
        signature,
        products,
        shippingAddress,
        totalAmount,
        deliveryCharge,
      }),
    });
    response = await response.json();
    console.log(response);
    if (!response.success) throw response.message;
    return response.data;
  } catch (error) {
     console.log(error)
    throw error;
  }
}
