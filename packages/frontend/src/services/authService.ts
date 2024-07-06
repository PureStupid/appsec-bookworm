import axios from "axios";

import {
  UserLoginBody,
  UserSignUpBody,
  UserLoginResponse,
  UserSignUpResponse,
} from "../types/user.entity";

const API_URL = "http://localhost:3000";

export async function login(user: UserLoginBody): Promise<UserLoginResponse> {
  const response = await axios.post(`${API_URL}/login-${user.role}`, user);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token.token);
  }

  return response.data;
}

export async function signup(
  user: UserSignUpBody
): Promise<UserSignUpResponse> {
  const response = await axios.post(`${API_URL}/signup-${user.role}`, user);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token.token);
  }

  return response.data;
}

export async function logout() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user") ?? "null");
}
