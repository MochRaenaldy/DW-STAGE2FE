import { createPostSchema } from "../libs/validations/post";
import * as likeservice from "../services/LikeService";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import { log } from "console";

export async function addLike(req: Request, res: Response) {
  try {
    console.log("Masuk Like Controller");
    req.body.userId = res.locals.user.id;
    req.body.postId = parseInt(req.params.postId);
    console.log(req.body.userId);
    console.log(req.body.postId);

    // const islike = await likeservice.findFirst(
    //   req.body.postId,
    //   req.body.userId
    // );

    // if (islike) {
    //   let liked = false;
    //    await likeservice.unlike;
    //   return res.json({liked})
    // }
    //   await likeservice.addLike;
    //   let liked = true;
    //   return res.json({liked})

    const like = await likeservice.addLike(req.body.postId, req.body.userId);
    res.json(like);

  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
}

// export async function checkIfLiked(req: Request, res: Response) {
//   const like = await likeservice.checkIfLiked(
//     Number(req.params.postId),
//     res.locals.user.id
//   );
//   res.json(like);
// }

export async function getPostLikes(req: Request, res: Response) {
  const like = await likeservice.getAllPostLikes(Number(req.params.postId));
  res.json(like);
}

// export function create(arg0: string, create: any) {
//     throw new Error("Function not implemented.");
// }

// export const remove = (req: Request, res: Response) => {
//   const post = likeservice.deleteLike(parseInt(req.params.id));
//   res.json(post);
// };
