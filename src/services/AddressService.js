import { BACKEND_BASE_URL } from "../Constent";
import { getAuthToken } from "../utils/GlobalUtils";

export async function addAddress(address) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/user/address/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getAuthToken(),
      },
      body: JSON.stringify({addressData:address}),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw error;
  }
}

export async function deleteAddress(addressId) {
  try {
    const response = await fetch(
      `${BACKEND_BASE_URL}/user/address/${addressId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: getAuthToken(),
        },
      }
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw error;
  }
}
