import { BACKEND_BASE_URL } from "../Constant";
import { objectURLToFile } from "../utils/UserHelper";
import { refreshAccessToken, secureFetch } from "./tokenService";


export async function fetchUserDetails() {
  try {
    const accessToken = await refreshAccessToken(false);
    let response = await fetch(`${BACKEND_BASE_URL}/user/`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    });
    response = await response.json();
    if (!response.success) throw new Error(response.message);
    return { ...response.data, accessToken };
  } catch (error) {
    throw error;
  }
}

export async function fetchUpdateProfile({user,setUserDetails, fullName, profileImageUrl}) {
  try {
    const formData = new FormData();
    if (fullName) {
      formData.append("fullName", fullName);
    }
    if (String(profileImageUrl) === "null") {
      formData.append("profileImage", "null");
    } else if (profileImageUrl?.startsWith?.("blob:")) {
      const file = await objectURLToFile(profileImageUrl, "profile.png");
      formData.append("profileImage", file);
    }
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/user`, {
      method: "PATCH",
      body: formData,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAddToCart(user, setUserDetails, productId) {
  try {
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/user/cart/${productId}`,
      {
        method: "POST",
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}
export async function fetchIncrementCartItem(user, setUserDetails, productId) {
  try {
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/user/cart/${productId}/increment`,
      {
        method: "PATCH",
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDecrementCartItem(user, setUserDetails, productId) {
  try {
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/user/cart/${productId}/decrement`,
      {
        method: "PATCH",
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDeleteFromCart(user, setUserDetails, productId) {
  try {
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/user/cart/${productId}`,
      {
        method: "DELETE",
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAddToWishlist(user,setUserDetails,productId) {
  try {
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/user/wishlist/${productId}`,
      {
        method: "POST",
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDeleteFromWishlist(user,setUserDetails, productId) {
  try {
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/user/wishlist/${productId}`,
      {
        method: "DELETE",
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDeleteAddress(user,setUserDetails,addressId) {
  try {
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/user/address/${addressId}`,
      {
        method: "DELETE",
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchMakeAddressPrimary(user,setUserDetails, addressId) {
  try {
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/user/address/makePrimary/${addressId}`,
      {
        method: "POST",
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAddAddress(user,setUserDetails, addressObj) {
  console.log(addressObj);
  try {
    let data = await secureFetch(
     user,
     setUserDetails,
    `${BACKEND_BASE_URL}/user/address/`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify(addressObj),
    });
    console.log(data)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchEditAddress(user,setUserDetails, addressId, addressObj) {
  try {
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/user/address/${addressId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressObj),
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}


export async function fetchUserLogout(user,setUserDetails) {
  try {
    let data = await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/user/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include"
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUserOrders(user,setUserDetails){
  try {
    let data=await secureFetch(
      user,
      setUserDetails,
      `${BACKEND_BASE_URL}/user/orders`,
      {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      }
    )
    return data;
  } catch (error) {
    throw error;
  }
}

export function fetchAddProductToViewedItems(product) {
  const STORAGE_KEY = "viewedProducts";
  const MAX_ITEMS = 4;
  let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  products = products.filter((item) => item.productId !== product.productId);
  products.unshift(product);
  if (products.length > MAX_ITEMS) {
    products.pop();
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}
