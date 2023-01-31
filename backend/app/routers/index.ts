import express from "express";
import API_V1 from "./v1";
const router = express();

router.get("/", (req: any, res: any) => {
  res.success(null, "Welcome to the API");
});
router.use("/api/v1", API_V1);

export default router;
