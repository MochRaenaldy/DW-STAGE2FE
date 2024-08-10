import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { Like } from "@prisma/client";

const posts: PostModels[] = [];

export const findAll = async () => {
  return await db.posts.findMany({});
};

export const findById = async (id: number) => {
  return await db.posts.findFirst({
    where: { id },
  });
};

export const create = async (post: Like) => {
  const newPost = await db.posts.create({ data: post });

  return newPost;
};

export const update = async (id: number, post: PostModels) => {
  const updatedPost = await db.posts.update({
    data: post,
    where: { id },
  });

  return updatedPost;
};

export const remove = async (id: number) => {
  await db.posts.delete({ where: { id } });

  return "deleted";
};
