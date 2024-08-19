import { Router } from "express";
import { UserController } from "./UserController";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/user", userController.getAll);
userRouter.get("/user/:id", userController.getOneById);
userRouter.post("/user", userController.create);
userRouter.put("/user", userController.update);
userRouter.delete("/user/:id",userController.delete);

export {userRouter};