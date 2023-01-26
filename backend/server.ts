import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = process.env.PORT || 1801;

// set up middleware for app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    message: "Hoàng Thị Ngọc Yến!",
  });
});

try {
  app.listen(port, (): void => {
    console.info(`App listening on port ${port}`);
  });
} catch (error) {
  console.log(`Error occured: ${error}`);
}
