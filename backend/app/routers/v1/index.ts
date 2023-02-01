import express from "express";
import productRouter from "./product.router";
import brandRouter from "./brand.router";
import userRouter from "./user.router";
import { requestMiddleware } from "../../middlewares/request.middleware";

const routerAPIV1 = express();

routerAPIV1.use("/users", userRouter);
routerAPIV1.use(
  "/brands",
  requestMiddleware.user.checkToken,
  requestMiddleware.user.checkTokenExpired,
  requestMiddleware.user.checkVerifyToken,
  brandRouter
);
routerAPIV1.use(
  "/products",
  requestMiddleware.user.checkToken,
  requestMiddleware.user.checkTokenExpired,
  requestMiddleware.user.checkVerifyToken,
  productRouter
);

export default routerAPIV1;
