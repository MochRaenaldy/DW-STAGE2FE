import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { IPosts } from "../types/post";

const posts: PostModels[] = [];

export async function findAll(postId: number) {
  db.posts.findMany({
    where: { parentId: postId },
  });
};

export const findById = async (id: number) => {
  return await db.posts.findFirst({
    where: { id },
    // join table
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
        },
      },
    },
  });
};

export async function addReply(reply: IPosts) {
  db.posts.create({
    data: {
      ...reply,
      images: {
        create: reply.images?.map((image) => ({ image: image.filename })),
      },
    },
  });
}


export function create(body: any) {
  throw new Error("Function not implemented.");
}
// export const update = async (id: number, post: PostModels) => {
//   const updatedPost = await db.posts.update({
//     data: post,
//     where: { id },
//   });

//   return updatedPost;
// };

// export const remove = async (id: number) => {
//   await db.posts.delete({ where: { id } });

//   return "deleted";
// };
