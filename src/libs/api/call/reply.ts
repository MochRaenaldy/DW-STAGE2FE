import { api } from "..";

export const getReplyByPostId = async (postId: string) => {
  const response = await api.get(`/reply/byPost/${postId}`);
  return response;
};

export const addReply = async (postId: string, body: any) => {
  const response = await api.post(`/reply/create/${postId}`, body);
  return response;
};