import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { IPosts } from "../types/post";
import { Posts } from "@prisma/client";


export async function findAllInPost(postId: number) {
  return await db.posts.findMany({
    where: { parentId: postId },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
        },
      },
      comments: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findById = async (postId: number) => {
  return await db.posts.findMany({
    where: { parentId: postId },
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

export async function addReply(reply: Posts) {
console.log(addReply);

const newPost = await db.posts.create({data:reply})

return newPost


  // db.posts.create({
  //   data: {
  //     ...reply,
  //     images: {
  //       create: reply.images?.map((image) => ({ image: image.filename })),
  //     },
  //   },
  // });
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
