import authRoute from "./AuthRoute";
import postRoute from "./PostRoute";
import { Router } from "express";
import repliesRoute from "./RepliesRoutes";
import userRoute from "./UserRoute";
const route = Router();

route.use("/posts", postRoute);
route.use("/auth", authRoute);
route.use("/reply", repliesRoute);
route.use("/users", userRoute);

export default route;
