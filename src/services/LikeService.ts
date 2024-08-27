import { exist } from "joi";
import db from "../libs/db";

export async function addLike(postId: number, userId: number) {
  console.log("Masuk Like Service");
  // const check = await checkIfLiked(postId, userId);
  // if (check) return await deleteLike(postId, userId);

  // const like = await db.like.create({
  const islike = await db.like.findFirst({
    where: {
      AND: [{ postId: postId }, { userId: userId }],
    },
    include: {
      post: true,
      user: true,
    },
  });

  if (!islike) {
    const handlelike = await db.like.create({
      data: { postId: postId, userId: userId },
    });
    return handlelike;
  }
  const handlelike = await db.like.delete({
    where: {
      id: islike.id,
    },
  });
  return handlelike;
}

// export const findFirst = async (postId: number, userId: number) => {
//   return await db.like.findFirst({
//     where: {
//       postId,
//       userId,
//     },
//   });
// };

//  export const unlike = async (postId: number, userId: number) => {
//    const deletedLike = await db.like.findFirst({
//      where: {
//        postId,
//        userId,
//      },
//    });
//    return await db.like.delete({
//      where: {
//        id: deletedLike?.id,
//      },
//    });
//  }
  
// export async function deleteLike(postId: number, userId: number) {
//   return await db.like.delete({
//     where: {
//       postId_userId: { postId, userId },
//     },
//   });
// }

export async function getAllPostLikes(postId: number) {
  return await db.like.findMany({
    where: {
      postId,
    },
  });
}

// export async function checkIfLiked(postId: number, userId: number) {
//   const likesList = await getAllPostLikes(postId); //ambil semua like dari suatu post
//   let like = false;
//   likesList.forEach((e) => {
//     if (e.userId == userId) {
//       //cek satu satu klo udh di like atau blm
//       like = true;
//     }
//   });
//   return like;
// }
