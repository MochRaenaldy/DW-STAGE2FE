import { api } from "..";
import { IRegisterForm } from "../../../types/register";

export const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export const register = async (body: IRegisterForm) => {
  const response = await api.post("/auth/register", body);
  return response.data;
};

export const checkAuth = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};