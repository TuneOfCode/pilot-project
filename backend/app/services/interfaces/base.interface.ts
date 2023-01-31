export interface IPaginate {
  page: number;
  limit: number;
}
export interface IRead<T> {
  findAll(option?: any): Promise<T[]>;
  findOne(option?: any): Promise<T>;
  findById(id: string | any, option?: any): Promise<T>;
  findByPaginate(query: any, paginate: IPaginate): Promise<any>;
}

export interface IWrite<T> {
  create(item: T): Promise<T>;
  update(item: T, id?: string | any): Promise<T>;
  delete(id: string | any): Promise<String>;
}
