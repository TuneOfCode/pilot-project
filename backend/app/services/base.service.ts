import { IPaginate, IRead, IWrite } from "./interfaces/base.interface";

export abstract class BaseService<T> implements IRead<T>, IWrite<T> {
  protected model: any;

  setModel(model: any) {
    this.model = model;
  }

  getModel() {
    return this.model;
  }

  async findAll(option?: any): Promise<T[]> {
    return await this.model.findMany(option);
  }
  async findOne(option?: any): Promise<T> {
    return await this.model.findUnique(option);
  }
  async findById(id: any, option?: any): Promise<T> {
    if (!id) return id;
    return await this.model.findUnique({
      where: {
        id: +id,
      },
      ...option,
    });
  }
  async findByPaginate(query: any, paginate: IPaginate) {
    const dataPaginate = await this.model.findMany({
      ...query,
      skip: paginate.page,
      take: paginate.limit,
    });
    return dataPaginate;
  }
  async create(item: T): Promise<T> {
    return await this.model.create(item);
  }
  async update(item: T): Promise<T> {
    return await this.model.update(item);
  }
  async delete(id: any): Promise<String> {
    return await this.model.delete({
      where: {
        id,
      },
    });
  }
}
