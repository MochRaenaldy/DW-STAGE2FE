import { api } from "..";

export const getUserById = async (id: any) => {
  const response = await api.get(`/users/${id}`);
  return response;
};

export const getUserByUsername = async (username: any) => {
  const response = await api.get(`/users/search/${username}`);
  return response;
};

export const findAll = async () => {
  const response = await api.get(`/users`);
  return response;
};

export const update = async (id: number, body :any) => {
  const response = await api.patch(`/users/update/${id}`, body);
  return response;
};