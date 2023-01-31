import express from "express";
import { FIELD_NAME_UPLOAD_FILE } from "../../constants/upload.constant";
import productController from "../../controllers/product.controller";
import { requestMiddleware } from "../../middlewares/request.middleware";
import { uploadFileMiddleware } from "../../middlewares/upload.middleware";
const productRouter = express.Router({
  mergeParams: true,
});

productRouter
  .route("/")
  .get(requestMiddleware.product.getAll, productController.getListProduct)
  .post(
    uploadFileMiddleware.single(FIELD_NAME_UPLOAD_FILE.PRODUCT),
    requestMiddleware.product.checkFields,
    requestMiddleware.product.checkBrandId,
    productController.createProduct
  );

productRouter
  .route("/:id")
  .all(requestMiddleware.product.checkProductId)
  .get(productController.getItemProduct)
  .put(
    uploadFileMiddleware.single(FIELD_NAME_UPLOAD_FILE.PRODUCT),
    requestMiddleware.product.checkFields,
    requestMiddleware.product.checkBrandId,
    requestMiddleware.product.removeOldFile,
    productController.updateProduct
  )
  .delete(
    requestMiddleware.product.removeOldFile,
    productController.deleteProduct
  );

export default productRouter;
