import { BACKEND_BASE_URL } from "../Constant";

export async function fetchUserLogin(emailOrPhone, password) {
  const url = `${BACKEND_BASE_URL}/user/login`;
  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailOrPhone, password }),
    });
    const data = await res.json();
    if(!data.success)
      throw new Error(data.message)
    return data.data;
  } catch (error) {
    throw new Error(error?.message || "Unable to login at the moment");
  }
}

export async function fetchUserRegistration(fullName, email, phone, password) {
  const url = `${BACKEND_BASE_URL}/user/register`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, phone, password }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    throw new Error(error?.message || "Unable to register at the moment");
  }
}
