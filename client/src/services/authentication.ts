import jwt from "jsonwebtoken";
import apiService from "./apiService";
import { SERVICES } from "@config/index";

export const login = async (data) => {
  return await apiService.post("/user/login", data, { isPrivate: false });
};

export const getAccountInfo = async () => {
  return await apiService.get("/users/me");
};

export const getUserInfoToken = () => {
  const token = getToken();

  if (!token) return;

  return jwt.decode(token);
};

export const clearToken = () => {
  localStorage.removeItem(SERVICES.AuthenticationHeaderField);
};

export const getToken = () => {
  return localStorage.getItem(SERVICES.AuthenticationHeaderField);
};

export const setToken = (token) => {
  localStorage.setItem(SERVICES.AuthenticationHeaderField, token);
};
