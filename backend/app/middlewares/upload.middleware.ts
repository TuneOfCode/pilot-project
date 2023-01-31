import multer from "multer";
import { MAX_SIZE_UPLOAD_FILE } from "../constants/upload.constant";
import { requestMiddleware } from "./request.middleware";

export const uploadFileMiddleware = multer({
  storage: requestMiddleware.upload.storage,
  fileFilter: requestMiddleware.upload.fileFilter,
  limits: {
    fileSize: MAX_SIZE_UPLOAD_FILE,
  },
});
