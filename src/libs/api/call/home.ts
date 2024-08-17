import { api } from "..";

export const getPost = async () => {
  const response = await api.get("/posts");
  return response;
};

export const createPost = async (body: any) => {
  const response = await api.post("/posts", body);
  return response;
};
