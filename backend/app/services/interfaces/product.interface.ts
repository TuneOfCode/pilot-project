import IBrand from "./brand.interface";

export interface IFilterPrice {
  priceFrom: number;
  priceTo: number;
}

export interface ICreateProductDTO {
  name: string;
  quantity: number;
  price: number;
  dateSale?: string;
  thumbnail?: string;
  brandId: number;
}

export interface IUpdateProductDTO extends ICreateProductDTO {
  id: number;
}

export default interface IProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
  dataSale?: Date;
  thumbnail?: string;
  brand: IBrand[];
}
