export function loadRazorpayScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
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
    color: "#3897ce",
  },
  config: {
    service_worker: {
      enabled: false,
    },
  },
};
