import express from "express";
import { FIELD_NAME_UPLOAD_FILE } from "../../constants/upload.constant";
import brandController from "../../controllers/brand.controller";
import { requestMiddleware } from "../../middlewares/request.middleware";
import { uploadFileMiddleware } from "../../middlewares/upload.middleware";
const brandRouter = express.Router();

brandRouter
  .route("/")
  .get(requestMiddleware.brand.getAll, brandController.getListBrand)
  .post(
    uploadFileMiddleware.single(FIELD_NAME_UPLOAD_FILE.BRAND),
    requestMiddleware.brand.checkFields,
    brandController.createBrand
  );

brandRouter
  .route("/:id")
  .all(requestMiddleware.brand.checkBrandId)
  .get(brandController.getItemBrand)
  .put(
    uploadFileMiddleware.single(FIELD_NAME_UPLOAD_FILE.BRAND),
    requestMiddleware.brand.checkFields,
    requestMiddleware.brand.removeOldFile,
    brandController.updateBrand
  )
  .delete(requestMiddleware.brand.removeOldFile, brandController.deleteBrand);

export default brandRouter;
