import { BACKEND_BASE_URL } from "../Constant";

export async function login(email, password) {
  const url = `${BACKEND_BASE_URL}/user/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
}

export async function signup(fullName, email, phone, password) {
  const url = `${BACKEND_BASE_URL}/user/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, phone, password }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
}
