import { Prisma } from "@prisma/client";
import conn from "../../app/configs/connect.db";

const adminData: Prisma.AdminCreateInput[] = [
  {
    username: "_admin",
    password: "123",
  },
  {
    username: "_tof",
    password: "228",
  },
];

const createSeedAdmin = async () => {
  console.info(`Start seeding...`);
  for (const ad of adminData) {
    const admin = await conn.admin.create({
      data: ad,
    });
    console.log(`Created admin with username: ${admin.username}`);
  }
  console.info(`Seeding finished`);
};

createSeedAdmin()
  .then(async () => {
    await conn.$disconnect();
  })
  .catch(async (err) => {
    console.error(`Seeding errored: ${err}`);
    await conn.$disconnect();
    process.exit(1);
  });
