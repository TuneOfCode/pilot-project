import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const adminData: Prisma.AdminCreateInput[] = [
  {
    username: "admin",
    password: "123",
  },
  {
    username: "tof",
    password: "228",
  },
];

const createSeedAdmin = async () => {
  console.info(`Start seeding...`);
  for (const ad of adminData) {
    const admin = await prisma.admin.create({
      data: ad,
    });
    console.log(`Created admin with username: ${admin.username}`);
  }
  console.info(`Seeding finished`);
};

createSeedAdmin()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(`Seeding errored: ${err}`);
    await prisma.$disconnect();
    process.exit(1);
  });
