import conn from "../configs/connect.db";
import { formatObject } from "../utils";
import Collection from "../utils/collection.util";
import { BaseService } from "./base.service";
import { IPaginate } from "./interfaces/base.interface";
import { ICreateBrandDTO, IUpdateBrandDTO } from "./interfaces/brand.interface";

export default class BrandService extends BaseService<any> {
  constructor() {
    super();
    this.setModel(conn.brand);
  }

  public async getAllBrand(keywordSearch: string, paginate: IPaginate) {
    if (!keywordSearch || keywordSearch === "") {
      let data = await this.model.findMany();
      const dataPaginate = new Collection(formatObject(data)).paginate(
        paginate?.page,
        paginate?.limit
      );

      return dataPaginate;
    }
    const dataFilter = await this.model.findMany({
      where: {
        name: {
          contains: keywordSearch,
        },
      },
    });
    const dataPaginate = new Collection(formatObject(dataFilter)).paginate(
      paginate?.page,
      paginate?.limit
    );
    return dataPaginate;
  }

  public async getBrandById(id: string) {
    return await this.findById(id);
  }

  public async createBrand(newBrandItem: ICreateBrandDTO) {
    return await this.create({
      data: {
        name: newBrandItem.name,
        description: newBrandItem.description,
        logo: newBrandItem.logo,
      },
    });
  }

  public async updateBrand(oldBrandItem: IUpdateBrandDTO) {
    return await this.update({
      where: {
        id: +oldBrandItem.id,
      },
      data: {
        name: oldBrandItem.name,
        description: oldBrandItem.description,
        logo: oldBrandItem.logo,
      },
    });
  }

  public async deleteBrand(brandId: string | any) {
    return await this.delete(+brandId);
  }
}
