import express from "express";
const adminRouter = express.Router();

adminRouter.route("/").get((req: any, res: any) => {
  res.success(null, `welcome to admin with path: ${req?.baseUrl}`);
});

adminRouter.route("/auth").post((req: any, res: any) => {
  res.success();
});

export default adminRouter;
