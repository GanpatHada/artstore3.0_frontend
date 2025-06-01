import { BACKEND_BASE_URL } from "../Constant";

const getAccessToken = (user) => user.accessToken;

export async function getUser() {
  try {
    const response = await fetch(
      `${BACKEND_BASE_URL}/user/refreshAccessToken`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log(result)
    if (!result.success) throw new Error(result.message);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAddToCart(user, productId) {
  try {
    let response = await fetch(`${BACKEND_BASE_URL}/user/cart/${productId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(user),
      },
    });
    response = await response.json();
    if (!response.success) throw new Error(response.message);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function fetchIncrementCartItem(user, productId) {
  try {
    let response = await fetch(`${BACKEND_BASE_URL}/user/cart/${productId}/increment`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(user),
      },
    });
    response = await response.json();
    console.log(response)
    if (!response.success) throw new Error(response.message);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function fetchDecrementCartItem(user, productId) {
  try {
    let response = await fetch(`${BACKEND_BASE_URL}/user/cart/${productId}/decrement`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(user),
      },
    });
    response = await response.json();
    if (!response.success) throw new Error(response.message);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAddToWishlist(user, productId) {
  try {
    let response = await fetch(
      `${BACKEND_BASE_URL}/user/wishlist/${productId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAccessToken(user),
        },
      }
    );
    response = await response.json();
    if (!response.success) throw new Error(response.message);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDeleteFromCart(user, productId) {
  try {
    let response = await fetch(`${BACKEND_BASE_URL}/user/cart/${productId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(user),
      },
    });
    response = await response.json();
    if (!response.success) throw new Error(response.message);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function fetchDeleteFromWishlist(user, productId) {
  try {
    let response = await fetch(
      `${BACKEND_BASE_URL}/user/wishlist/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAccessToken(user),
        },
      }
    );
    response = await response.json();
    if (!response.success) throw new Error(response.message);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDeleteAddress(user, addressId) {
  try {
    let response = await fetch(
      `${BACKEND_BASE_URL}/user/address/${addressId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAccessToken(user),
        },
      }
    );
    response = await response.json();
    if (!response.success) throw new Error(response.message);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchMakeAddressPrimary(user, addressId) {
  try {
    let response = await fetch(
      `${BACKEND_BASE_URL}/user/address/makePrimary/${addressId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAccessToken(user),
        },
      }
    );
    response = await response.json();
    if (!response.success) throw new Error(response.message);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAddAddress(user, addressObj) {
  try {
    let response = await fetch(`${BACKEND_BASE_URL}/user/address/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(user),
      },
      body: JSON.stringify(addressObj),
    });
    response = await response.json();
    if (!response.success) throw new Error(response.message);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchEditAddress(user, addressId, addressObj) {
  try {
    let response = await fetch(
      `${BACKEND_BASE_URL}/user/address/${addressId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAccessToken(user),
        },
        body: JSON.stringify(addressObj),
      }
    );
    response = await response.json();
    if (!response.success) throw new Error(response.message);
    return response.data;
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
