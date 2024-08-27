import db from "../libs/db";
import { IUser } from "../types/user";

const user: IUser[] = [];

export const findAll = async () => {
  return await db.user.findMany({});
};

export const findbyuserlogin = async (userId :number) => {
return await db.user.findMany({
  where: {
    NOT: {
      id : userId,
    },
  }
})
};

export const findById = async (id: number) => {
  return await db.user.findFirst({
    where: { id },
  });
};

export const findByUsername = async (username: string) => {
  console.log(username);
  return await db.user.findMany({
    where: {
      username: {
        contains: username,
      },
    },
  });
};

export const update = async (id: number, update: IUser) => {
  console.log(update);
  const updatedUser = await db.user.update({
    data: update,
    where: { id },
  });

  return updatedUser;
};

export const remove = async (id: number) => {
  await db.user.delete({ where: { id } });

  return "deleted";
};

// export const create = async (post: User) => {
//   const newPost = await db.user.create({ data: post });

//   return newPost;
// };
