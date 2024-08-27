import { Router } from "express";
import * as LikeController from "../controllers/LikeController"
import authorization from "../middlewares/authorization";

const likeRoute = Router();

likeRoute.post("/:postId",authorization,LikeController.addLike);

likeRoute.get("/:postId", authorization, LikeController.getPostLikes);

export default likeRoute;