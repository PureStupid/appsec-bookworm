import axios, { AxiosResponse } from "axios";

import { UserData, UserLoginBody, UserSignUpBody } from "../types/user.entity";
import { TokenData } from "../../../shared/interfaces/auth.interface";

const API_URL = import.meta.env.VITE_SITE_API_URL as string;

export async function login(user: UserLoginBody): Promise<AxiosResponse> {
  const response = await axios.post(`${API_URL}/login-${user.role}`, user);

  if (response.data.token) {
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }

  return response;
}

export async function signup(user: UserSignUpBody): Promise<AxiosResponse> {
  const response = await axios.post(`${API_URL}/signup-${user.role}`, user);

  if (response.data.token) {
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }

  return response;
}

export async function logout() {
  localStorage.removeItem("token");
}

export function getCurrentToken() {
  return JSON.parse(localStorage.getItem("token") ?? "null") as TokenData;
}

export async function getValidUser() {
  const token = getCurrentToken();
  if (!token) {
    return { name: "", email: "", role: "" } as UserData;
  }
  const response = await axios.get(`${API_URL}/validate-token`, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
  if (response.status === 200) {
    return response.data.user as UserData;
  } else {
    return { name: "", email: "", role: "" } as UserData;
  }
}
