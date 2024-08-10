import db from "../libs/db";
import { IUser } from "../types/user";

const user: IUser[] = [];

export const findAll = async () => {
  return await db.user.findMany({});
};

export const findById = async (id: number) => {
  return await db.user.findFirst({
    where: { id },
  });
};

export const findByUsername = async (username : string) => {
  return await db.user.findFirst({
    where: { username },
  });
};

export const update = async (id: number, post: IUser) => {
  console.log(post)
  const updatedPost = await db.user.update({
    data: post,
    where: { id },
  });

  return updatedPost;
};

export const remove = async (id: number) => {
  await db.user.delete({ where: { id } });

  return "deleted";
};

// export const create = async (post: User) => {
//   const newPost = await db.user.create({ data: post });

//   return newPost;
// };