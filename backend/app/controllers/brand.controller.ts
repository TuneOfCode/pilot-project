import { DOMAIN } from "../configs/app.config";
import { PLACE_SAVE_UPLOAD_FILE } from "../constants/upload.constant";
import BrandService from "../services/brand.service";
import {
  ICreateBrandDTO,
  IUpdateBrandDTO,
} from "../services/interfaces/brand.interface";

class BrandController {
  private readonly brandService: BrandService;
  constructor() {
    this.brandService = new BrandService();
  }

  getListBrand = async (req: any, res: any) => {
    try {
      const { search, page, limit } = req.query;
      const data = await this.brandService.getAllBrand(search, {
        page,
        limit,
      });

      if (data && data?.data?.length === 0) {
        return res.success(null, "Brand item is empty");
      }
      return res.success(data, "Got list brand successfully");
    } catch (error) {
      return res.errors(error);
    }
  };

  getItemBrand = async (req: any, res: any) => {
    try {
      const data = await this.brandService.getBrandById(req.params.id);
      return res.success(data);
    } catch (error) {
      return res.errors(error);
    }
  };

  createBrand = async (req: any, res: any) => {
    try {
      const pathFileInServer = `${DOMAIN}/${PLACE_SAVE_UPLOAD_FILE}/${req.file.filename}`;
      const dataRequest: ICreateBrandDTO = {
        name: req.body.name,
        description: req.body.description,
        logo: pathFileInServer,
      };
      const data = await this.brandService.createBrand(dataRequest);
      return res.success({ id: data.id }, "Created brand successfully");
    } catch (error) {
      return res.errors(error);
    }
  };

  updateBrand = async (req: any, res: any) => {
    try {
      console.log("===> req.body: ", req.body);
      console.log("===> req.file: ", req.file);
      const pathFileInServer = `${DOMAIN}/${PLACE_SAVE_UPLOAD_FILE}/${req.file.filename}`;
      const dataRequest: IUpdateBrandDTO = {
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        logo: pathFileInServer,
      };
      await this.brandService.updateBrand(dataRequest);
      return res.success(null, "Updated brand successfully");
    } catch (error) {
      console.log("===> error: ", error);

      return res.errors(error);
    }
  };

  deleteBrand = async (req: any, res: any) => {
    try {
      await this.brandService.deleteBrand(req.params.id);
      return res.success(null, "Deleted brand success");
    } catch (error) {
      return res.errors(error);
    }
  };
}

export default new BrandController();
