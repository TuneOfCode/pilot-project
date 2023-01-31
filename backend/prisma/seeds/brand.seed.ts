import { Prisma } from "@prisma/client";
import conn from "../../app/configs/connect.db";

const brandData: Prisma.BrandCreateInput[] = [
  {
    name: "Apple",
    description: "Apple Inc, Cupertino, California",
    products: {
      create: [
        {
          name: "Iphone 7",
          quantity: 100,
          price: 10000000,
          thumbnail:
            "https://www.xtmobile.vn/vnt_upload/product/Hinh_DT/Iphone/iphone7/thumbs/(600x600)_crop_iphone-7-black-xtmobile.jpg",
        },
        {
          name: "Iphone X",
          quantity: 200,
          price: 20000000,
          thumbnail:
            "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-2.jpg",
        },
      ],
    },
  },
];

const createeSeedBrand = async () => {
  console.info(`Start seeding...`);
  for (const br of brandData) {
    const brand = await conn.brand.create({
      data: br,
    });
    console.log(`Created brand with brand name: ${brand.name}`);
  }
  console.info(`Seeding finished`);
};

createeSeedBrand()
  .then(async () => {
    await conn.$disconnect();
  })
  .catch(async (err) => {
    console.error(`Seeding errored: ${err}`);
    await conn.$disconnect();
    process.exit(1);
  });
