import { BACKEND_BASE_URL } from "../Constant";

export async function fetchCreateOrder(amount){
     try {
        let response=await fetch(`${BACKEND_BASE_URL}/order`,{
           method:'POST',
           headers: {
               "Content-Type": "application/json",
             },
           body: JSON.stringify({amount}),
        })
        response=await response.json();
        if(!response.success)
           throw response.message
        return response.data;
     } catch (error) {
        throw error
     }

}

export async function fetchVerifyPayment(paymentResponse,shippingAddress,products){
   const{razorpay_signature:signature,razorpay_payment_id:paymentId,razorpay_order_id:orderId}=paymentResponse;
   console.log({orderId,paymentId,shippingAddress,products,signature})
}