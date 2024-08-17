import { Router } from "express";
import * as postController from "../controllers/PostController";
import Authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";
import authorization from "../middlewares/authorization";
const postRoute = Router();

postRoute.get("/", authorization, postController.findAll);

postRoute.get("/:id", authorization, postController.findById);

postRoute.post(
  "/",
  authorization,
  upload.array("image"),
  postController.create
);

postRoute.put("/:id", authorization, postController.update);

postRoute.delete("/:id", authorization, postController.remove);

export default postRoute;
