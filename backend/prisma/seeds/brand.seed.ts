import { Prisma } from "@prisma/client";
import conn from "../../app/configs/connect.db";

const brandData: Prisma.BrandCreateInput[] = [
  {
    name: "Apple",
    description: "Apple Inc, Cupertino, California",
  },
];

const createSeedBrand = async () => {
  console.info(`Start Brand seeding...`);
  for (const br of brandData) {
    const brand = await conn.brand.create({
      data: br,
    });
    console.log(`Created brand with brand name: ${brand.name}`);
  }
  console.info(`Seeding Brand finished`);
};

createSeedBrand()
  .then(async () => {
    await conn.$disconnect();
  })
  .catch(async (err) => {
    console.error(`Seeding errored: ${err}`);
    await conn.$disconnect();
    process.exit(1);
  });
