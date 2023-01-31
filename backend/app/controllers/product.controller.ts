import { DOMAIN } from "../configs/app.config";
import { PLACE_SAVE_UPLOAD_FILE } from "../constants/upload.constant";
import {
  ICreateProductDTO,
  IUpdateProductDTO,
} from "../services/interfaces/product.interface";
import { ProductService } from "../services/product.service";
import { removeFile } from "../utils";

class ProductController {
  private readonly productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }

  getListProduct = async (req: any, res: any) => {
    try {
      const { search, page, limit, priceFrom, priceTo } = req.query;
      const data = await this.productService.getAllProduct(
        search,
        {
          page,
          limit,
        },
        {
          priceFrom,
          priceTo,
        }
      );

      if (data && data?.data?.length === 0) {
        return res.success(null, "Product item is empty");
      }
      return res.success(data, "Got list product successfully");
    } catch (error) {
      return res.errors(error);
    }
  };

  getItemProduct = async (req: any, res: any) => {
    try {
      const data = await this.productService.getProductById(req.params.id);
      return res.success(data);
    } catch (error) {
      return res.errors(error);
    }
  };

  createProduct = async (req: any, res: any) => {
    try {
      const pathFileInServer = `${DOMAIN}/${PLACE_SAVE_UPLOAD_FILE}/${req.file.filename}`;
      const dataRequest: ICreateProductDTO = {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        brandId: req.body.brandId,
        thumbnail: pathFileInServer,
      };
      const data = await this.productService.createProduct(dataRequest);
      return res.success({ id: data.id }, "Created product successfully");
    } catch (error) {
      return res.errors(error);
    }
  };

  updateProduct = async (req: any, res: any) => {
    try {
      const pathFileInServer = `${DOMAIN}/${PLACE_SAVE_UPLOAD_FILE}/${req.file.filename}`;
      const dataRequest: IUpdateProductDTO = {
        id: req.params.id,
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        brandId: req.body.brandId,
        thumbnail: pathFileInServer,
      };
      await this.productService.updateProduct(dataRequest);
      return res.success(null, "Updated product successfully");
    } catch (error) {
      return res.errors(error);
    }
  };

  deleteProduct = async (req: any, res: any) => {
    const productId = req.params.id;
    try {
      await this.productService.deleteProduct(productId);
      return res.success(null, "Deleted product success");
    } catch (error) {
      return res.errors(error);
    }
  };
}

export default new ProductController();
