import { Prisma } from "@prisma/client";
import conn from "../../app/configs/connect.db";

const productData: Prisma.ProductCreateInput[] = [
  {
    name: "Iphone 7",
    quantity: 100,
    price: 10000000,
    thumbnail:
      "https://www.xtmobile.vn/vnt_upload/product/Hinh_DT/Iphone/iphone7/thumbs/(600x600)_crop_iphone-7-black-xtmobile.jpg",
    brand: {
      connect: {
        id: 1,
      },
    },
  },
  {
    name: "Iphone X",
    quantity: 200,
    price: 20000000,
    thumbnail:
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-2.jpg",
    brand: {
      connect: {
        id: 1,
      },
    },
  },
];

const createSeedProduct = async () => {
  console.info(`Start Product seeding...`);
  for (const prod of productData) {
    const product = await conn.product.create({
      data: prod,
    });
    console.log(`Created product with product name: ${product.name}`);
  }
  console.info(`Seeding Product finished`);
};

createSeedProduct()
  .then(async () => {
    await conn.$disconnect();
  })
  .catch(async (err) => {
    console.error(`Seeding errored: ${err}`);
    await conn.$disconnect();
    process.exit(1);
  });
