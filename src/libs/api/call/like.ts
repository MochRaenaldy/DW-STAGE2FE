import { api } from "..";

export async function addLike(postId: number) {
  const response = await api.post(`/like/${postId}`);
  return response;
};

export async function getPostLikes(postId: number) {
  const response = await api.get(`/like/${postId}`);
  return response;
};