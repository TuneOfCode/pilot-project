import cors from "cors";
import express, { Application } from "express";
import path from "path";
import responseMiddleware from "./app/middlewares/response.middleware";
import router from "./app/routers";
import catchErrorsApp from "./app/routers/error/exception.router";
const app: Application = express();
const port: string | number = process.env.PORT || 1801;

// set up middleware for app
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// set up middleware for static file
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(responseMiddleware);

// api router
app.use(router);

// forward to error
app.use("*", catchErrorsApp.catchErrorNotFoundPage);
app.use(catchErrorsApp.catchErrorOther);

try {
  app.listen(port, (): void => {
    console.info(`App listening on port ${port}`);
  });
} catch (error) {
  console.log(`Error occured: ${error}`);
}
