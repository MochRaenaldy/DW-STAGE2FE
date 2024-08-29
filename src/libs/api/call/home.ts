import { api } from "..";

export const getPost = async () => {
  const response = await api.get("/posts");
  return response;
};

export const getPostById = async (id: string) => {
  const response = await api.get("/posts/" + id);
  return response;
};

export const createPost = async (formData: any) => {
  const response = await api.post("/posts", formData, {headers: {"Content-Type": "multipart/form-data"}});
  return response;
};

export const getAllPostByUserId = async (userid?: string) => {
  const response = await api.get(`/posts/byUser/${userid}`);
  return response;
};

