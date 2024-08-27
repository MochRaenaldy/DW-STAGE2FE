import { Router } from "express";
import authorization from "../middlewares/authorization";
import * as followController from "../controllers/FollowController"

const followRoute = Router();

followRoute.post("/:userId", authorization, followController.follow);
followRoute.delete("/:userId", authorization, followController.unfollow);
followRoute.post("/check/:userId", authorization, followController.checkFollow);

export default followRoute