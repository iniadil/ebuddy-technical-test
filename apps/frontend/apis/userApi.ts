import axios from "axios";
import { User } from "shared/user";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function fetchUserData(token: string) {
  return axios.get(`${API_BASE}/fetch-user-data`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateUserData(token: string, data: any) {
  return axios.post(`${API_BASE}/update-user-data`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export async function registerUser(
  data: Pick<User, "name" | "email" | "password" | "uid">
) {
  return axios.post(`${API_BASE}/register-user`, data);
}
