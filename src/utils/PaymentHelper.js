export function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (
      document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      )
    ) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      reject(new Error("Failed to load Razorpay SDK"));
    };
    document.body.appendChild(script);
  });
}

export const razorpayOptions = {
  key: process.env.REACT_APP_RAZORPAY_KEY,
  currency: "INR",
  name: "Artstore",
  description: "payment to artstore",
  image: "...",
  prefill: {
    name: "artstore",
    email: "artstore@gmail.com",
    contact: "9876543210",
  },
  theme: {
    color: "#c7511f",
  },
  config: {
    service_worker: {
      enabled: false,
    },
  },
};

export const getVerifyPaymentParams = (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  productsList,
  address,
  totalAmount,
  deliveryCharge
) => ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  address,
  totalAmount,
  deliveryCharge,
  products: productsList.map(({ productId, quantity }) => ({
    productId,
    quantity,
  })),
});
