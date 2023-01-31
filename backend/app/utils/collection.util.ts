export default class Collection {
  protected collection: any;
  constructor(collection: any) {
    if (!Array.isArray(collection)) {
      throw new Error("Collection must be an array");
    }
    this.collection = collection;
  }

  paginate(page: string | any = "1", limit: string | any = "8") {
    page = parseInt(page);
    limit = parseInt(limit);
    const totalRecord = this.collection.length;
    const totalPage = Math.ceil(totalRecord / limit);
    if (page < 1) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(page * limit - 1, totalRecord - 1);

    let data: any = [];
    if (page <= totalPage) {
      data = this.collection.slice(startIndex, endIndex + 1);
    }

    return {
      data,
      paginate: {
        page,
        limit,
        totalPage,
        totalRecord,
      },
    };
  }

  search(key: string | any, value: string | any) {
    this.collection = this.collection.filter((item: any) => {
      return item[key].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    return this;
  }

  filter(key: string | any, value: string | any) {
    this.collection = this.collection.filter((item: any) => {
      return item[key] === value;
    });
    return this;
  }
}
