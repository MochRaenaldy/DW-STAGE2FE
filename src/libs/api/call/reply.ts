import { api } from "..";

export const getReplyByPostId = async (postId: string) => {
  const response = await api.get(`/reply/byPost/${postId}`);
  return response;
};

export const addReply = async (postId: string, formData: any) => {
  const response = await api.post(`/reply/create/${postId}`, formData, {headers: {"Content-Type": "multipart/form-data"}});
  return response; 
};