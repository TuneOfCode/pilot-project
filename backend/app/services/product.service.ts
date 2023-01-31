import { BaseService } from "./base.service";
import conn from "../configs/connect.db";
import { IPaginate } from "./interfaces/base.interface";
import { formatObject } from "../utils";
import Collection from "../utils/collection.util";
import {
  ICreateProductDTO,
  IFilterPrice,
  IUpdateProductDTO,
} from "./interfaces/product.interface";

export class ProductService extends BaseService<any> {
  constructor() {
    super();
    this.setModel(conn.product);
  }

  public async getAllProduct(
    keywordSearch: string,
    paginate: IPaginate,
    filter?: IFilterPrice
  ) {
    // search and filter
    if (keywordSearch && filter?.priceFrom && filter?.priceTo) {
      const dataSearchAndFilter = await this.model.findMany({
        where: {
          OR: [
            {
              name: {
                contains: keywordSearch,
              },
            },
            {
              brand: {
                name: {
                  contains: keywordSearch,
                },
              },
            },
          ],
          price: {
            gte: +filter?.priceFrom,
            lte: +filter?.priceTo,
          },
        },
      });
      const dataPaginate = new Collection(
        formatObject(dataSearchAndFilter)
      ).paginate(paginate?.page, paginate?.limit);
      console.log("===> search and filter");

      return dataPaginate;
    }

    // only search
    if (keywordSearch) {
      const dataSearch = await this.model.findMany({
        where: {
          OR: [
            {
              name: {
                contains: keywordSearch,
              },
            },
            {
              brand: {
                name: {
                  contains: keywordSearch,
                },
              },
            },
          ],
        },
        orderBy: {
          id: "asc",
        },
      });
      const dataPaginate = new Collection(formatObject(dataSearch)).paginate(
        paginate?.page,
        paginate?.limit
      );
      console.log("===> only search");
      return dataPaginate;
    }

    // only filter
    if (filter?.priceFrom && filter?.priceTo) {
      const dataFilter = await this.model.findMany({
        where: {
          price: {
            gte: +filter?.priceFrom,
            lte: +filter?.priceTo,
          },
        },
        orderBy: {
          price: "asc",
        },
      });
      const dataPaginate = new Collection(formatObject(dataFilter)).paginate(
        paginate?.page,
        paginate?.limit
      );
      console.log("===> only filter");
      return dataPaginate;
    }

    // no search and filter
    let data = await this.model.findMany();
    const dataPaginate = new Collection(formatObject(data)).paginate(
      paginate?.page,
      paginate?.limit
    );
    console.log("===> no search and filter");
    return dataPaginate;
  }

  public async getProductById(id: string) {
    return await this.findById(id, {
      include: {
        brand: true,
      },
    });
  }

  public async createProduct(newProductItem: ICreateProductDTO) {
    let dateSale: Date = new Date();
    if (newProductItem.dateSale) {
      dateSale = new Date(newProductItem.dateSale);
    }
    return await this.create({
      data: {
        name: newProductItem.name,
        quantity: +newProductItem.quantity,
        price: +newProductItem.price,
        dateSale,
        thumbnail: newProductItem.thumbnail,
        brand: {
          connect: {
            id: +newProductItem.brandId,
          },
        },
      },
      include: {
        brand: true,
      },
    });
  }

  public async updateProduct(oldProductItem: IUpdateProductDTO) {
    let dateSale: Date = new Date();
    if (oldProductItem.dateSale) {
      dateSale = new Date(oldProductItem.dateSale);
    }
    return await this.update({
      where: {
        id: +oldProductItem.id,
      },
      data: {
        name: oldProductItem.name,
        quantity: +oldProductItem.quantity,
        price: +oldProductItem.price,
        dateSale,
        thumbnail: oldProductItem.thumbnail,
        brand: {
          connect: {
            id: +oldProductItem.brandId,
          },
        },
      },
    });
  }

  public async deleteProduct(productId: string | any) {
    return await this.delete(+productId);
  }
}
