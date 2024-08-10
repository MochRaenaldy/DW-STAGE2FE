import { createPostSchema } from "../libs/validations/post";
import * as likeservice from "../services/LikeService";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const findAll = async (req: Request, res: Response) => {
  const posts = await likeservice.findAll();
  res.json(posts);
};

export const findById = async (req: Request, res: Response) => {
  const post = await likeservice.findById(parseInt(req.params.id));
  res.json(post);
};

export const create = async (req: Request, res: Response) => {
  try {
    await createPostSchema.validateAsync(req.body);

    console.log(req.file);
    if (req.file) {
      req.body.image = req.file.filename;
    }

    const post = await likeservice.create(req.body);
    res.json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const update = (req: Request, res: Response) => {
  const post = likeservice.update(parseInt(req.params.id), req.body);
  res.json(post);
};

export const remove = (req: Request, res: Response) => {
  const post = likeservice.remove(parseInt(req.params.id));
  res.json(post);
};
