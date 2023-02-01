import express from "express";
import userController from "../../controllers/user.controller";
import { requestMiddleware } from "../../middlewares/request.middleware";
const userRouter = express.Router();

userRouter.route("/").get((req: any, res: any) => {
  res.success(null, `welcome to user with path: ${req?.originalUrl}`);
});

userRouter.route("/refreshToken").post(userController.refreshToken);

userRouter
  .route("/login")
  .post(requestMiddleware.user.checkFields, userController.login);

export default userRouter;
