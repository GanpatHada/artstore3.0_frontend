import { toast } from "react-toastify";
import { BACKEND_BASE_URL } from "../Constant";
import { getAccessToken } from "../utils/UserHelper";

function redirectToLogin(delay = 1000) {
  setTimeout(() => {
    window.location.href = "/login";
  }, delay);
}

export async function refreshAccessToken(redirect = true) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/user/refreshAccessToken`, {
      method: "POST",
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message);
    }
    return json.data;
  } catch (error) {
    if (redirect) {
      toast.error(
        error.message || "Unable to refresh token, please login again"
      );
      redirectToLogin();
      return null;
    }
    throw error
  }
}

export async function secureFetch(user, setUserDetails, input, init = {}) {
  const headers = {
    ...(init.headers || {}),
    Authorization: `Bearer ${getAccessToken(user)}`,
  };

  try {
    let res = await fetch(input, { ...init, headers });
    let json = await res.json();

    if (!json.success) {
      if (json.errorCode !== "EXPIRED_TOKEN") {
        throw new Error(json.message);
      }

      const accessToken = await refreshAccessToken();
      if (!accessToken) return;
      setUserDetails(prev=>({...prev,accessToken}));

      const newHeaders = {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      };

      res = await fetch(input, {
        ...init,
        headers: newHeaders,
      });

      json = await res.json();
      if (!json.success) {
        throw new Error(json.message);
      }
    }

    return json.data;
  } catch (err) {
    throw err;
  }
}
