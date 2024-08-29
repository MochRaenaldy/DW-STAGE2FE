import { Router } from "express";
import * as replyController from "../controllers/ReplyController";
import authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";
const repliesRoute = Router();

repliesRoute.get("/byPost/:postId", replyController.findAllInPost);

repliesRoute.get("/:id", replyController.findById);

repliesRoute.post(
  "/create/:postId",
  authorization,
  upload.array("images"),
  replyController.addReply
);

// repliesRoute.put("/:id", replyController.update);

// repliesRoute.delete("/:id", replyController.remove);

export default repliesRoute;
