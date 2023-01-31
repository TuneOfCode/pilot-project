import path from "path";
import multer from "multer";
import {
  extensions,
  PLACE_SAVE_UPLOAD_FILE,
} from "../constants/upload.constant";
import BrandService from "../services/brand.service";
import { ProductService } from "../services/product.service";
import { removeFile } from "../utils";
import { DOMAIN } from "../configs/app.config";
export const requestMiddleware = {
  // middleware for request product
  product: {
    // middleware for request product get all
    getAll(req: any, res: any, next: any) {
      let { search, page, limit, priceFrom, priceTo } = req.query;
      if (search) {
        req.query.search = search ? search : "";
      }
      if (page) {
        req.query.page = page ? page : "1";
      }
      if (limit) {
        req.query.limit = limit ? limit : "8";
      }
      if (priceFrom && priceTo) {
        req.query.filter = {
          priceFrom: priceFrom ? priceFrom : "0",
          priceTo: priceTo ? priceTo : "100000000",
        };
      }
      next();
    },
    // middleware check fields
    async checkFields(req: any, res: any, next: any) {
      const { name, quantity, price, brandId } = req.body;
      if (!name || !quantity || !price || !brandId) {
        return res.errors(null, "Missing required fields", 400);
      }
      if (!req.file)
        return res.errors(null, "Missing required fields: thumbnail", 400);
      next();
    },
    // middleware check brandId existed
    async checkBrandId(req: any, res: any, next: any) {
      const { brandId } = req.body;
      const brand = await new BrandService().getBrandById(brandId);
      if (!brand || !brand?.id) {
        removeFile(req.file.path);
        return res.errors(null, `BrandId: ${brandId} not exists`, 400);
      }
      next();
    },
    // middleware check file existed in update product
    async removeOldFile(req: any, res: any, next: any) {
      let { id } = req.params;
      const product = await new ProductService().getProductById(id);
      const pathFileInServer = product?.thumbnail.split(`${DOMAIN}/`)[1];
      removeFile(pathFileInServer);
      next();
    },
    // middleware check productId existed
    async checkProductId(req: any, res: any, next: any) {
      let { id } = req.params;
      const product = await new ProductService().getProductById(id);
      if (!product || !product?.id) {
        return res.errors(null, `ProductID: ${id} not exists`, 400);
      }
      next();
    },
  },

  // middleware for request brand
  brand: {
    // middleware for request brand get all
    getAll(req: any, res: any, next: any) {
      let { search, page, limit } = req.query;
      if (search) {
        req.query.search = search ? search : "";
      }
      if (page) {
        req.query.page = page ? page : "1";
      }
      if (limit) {
        req.query.limit = limit ? limit : "8";
      }
      next();
    },
    // middleware check brandId existed
    async checkBrandId(req: any, res: any, next: any) {
      let { id } = req.params;
      const brand = await new BrandService().getBrandById(id);
      if (!brand || !brand?.id) {
        return res.errors(null, `BrandID: ${id} not exists`, 400);
      }
      next();
    },
    // middleware check fields
    async checkFields(req: any, res: any, next: any) {
      let { name, description } = req.body;
      if (!name || !description) {
        return res.errors(null, "Missing required fields", 400);
      }
      if (!req.file)
        return res.errors(null, "Missing required fields: logo", 400);
      next();
    },
    // middleware check file existed in update brand
    async removeOldFile(req: any, res: any, next: any) {
      let { id } = req.params;
      const brand = await new BrandService().getBrandById(id);
      const pathFileInServer = brand?.logo.split(`${DOMAIN}/`)[1];
      removeFile(pathFileInServer);
      next();
    },
  },
  // middleware for upload file
  upload: {
    // check extension file of request file upload
    fileFilter(req: any, file: Express.Multer.File, callback: any) {
      const extensionFile = path.extname(file.originalname.toLowerCase());
      if (!extensions.includes(extensionFile)) {
        return callback(
          "File type is supported .png|.jpg|.jpeg|.gif|.webp|.psd",
          false
        );
      }
      callback(null, true);
    },
    // define storage for upload file
    storage: multer.diskStorage({
      destination: (req: any, file: Express.Multer.File, callback: any) => {
        callback(null, PLACE_SAVE_UPLOAD_FILE);
      },
      filename: (req: any, file: Express.Multer.File, callback: any) => {
        console.log("===> file: ", file);
        const extensionFile = path.extname(file.originalname.toLowerCase());
        const filename = file.originalname
          .split(extensionFile)[0]
          .replace(/\s+/g, "-");
        callback(null, `[${Date.now()}]-${filename}${extensionFile}`);
      },
    }),
  },
};
