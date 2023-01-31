import express from "express";
import productRouter from "./product.router";
import brandRouter from "./brand.router";
import adminRouter from "./admin.router";

const routerAPIV1 = express();

routerAPIV1.use("/admin", adminRouter);
routerAPIV1.use("/brands", brandRouter);
routerAPIV1.use("/products", productRouter);

export default routerAPIV1;
