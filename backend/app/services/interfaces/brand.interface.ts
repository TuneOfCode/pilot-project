import IProduct from "./product.interface";

export interface ICreateBrandDTO {
  name: string;
  logo?: string;
  description?: string;
}

export interface IUpdateBrandDTO extends ICreateBrandDTO {
  id: number;
}

export default interface IBrand {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  products?: IProduct[];
}
