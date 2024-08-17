import { api } from "..";

export const getUserById = async (id: any) => {
  const response = await api.get(`/users/${id}`);
  return response;
};

export const getUserByUsername = async (username: any) => {
  const response = await api.get(`/users/search/${username}`);
  return response;
};