import { Router } from "express";
import * as userController from "../controllers/UserController";
import authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";
const userRoute = Router();

userRoute.get("/", userController.findAll);

userRoute.get("/:id", userController.findById);

userRoute.get("/search/:username", userController.findByUsername);

userRoute.put("/update/:id", upload.single("image"), userController.update);

userRoute.get("/userlogin/:userId", userController.findbyuserlogin);

// userRoute.delete("/:id", userController.remove);

export default userRoute;

// profileRoute.post(
//   "/",
//   authorization,
//   upload.single("image"),
//   profileController.create
// );
