import { Prisma, Role } from "@prisma/client";
import conn from "../../app/configs/connect.db";
import { encodePassword } from "../../app/utils";

const adminData: Prisma.UserCreateInput[] = [
  {
    username: "_admin",
    password: "123",
    role: Role.SUPER_ADMIN,
  },
  {
    username: "_tof",
    password: "228",
    role: Role.ADMIN,
  },
];

const userData: Prisma.UserCreateInput[] = [
  {
    username: "_user_1",
    password: "123",
    profile: {
      create: {
        firstName: "John",
        lastName: "Doe",
      },
    },
  },
  {
    username: "_user_2",
    password: "123",
    profile: {
      create: {
        firstName: "Jane",
        lastName: "Smith",
      },
    },
  },
];

const createSeedAdminAndUser = async () => {
  console.info(`Start Admin seeding...`);
  for (const ad of adminData) {
    const hashPassword = await encodePassword(ad.password);
    ad.password = hashPassword;
    const admin = await conn.user.create({
      data: ad,
    });
    console.log(`Created admin with username: ${admin.username}`);
  }
  console.info(`Seeding Admin finished`);

  console.info(`Start User seeding...`);
  for (const u of userData) {
    const hashPassword = await encodePassword(u.password);
    u.password = hashPassword;
    const user = await conn.user.create({
      data: u,
    });
    console.log(`Created admin with username: ${user.username}`);
  }
  console.info(`Seeding User finished`);
};

createSeedAdminAndUser()
  .then(async () => {
    await conn.$disconnect();
  })
  .catch(async (err) => {
    console.error(`Seeding errored: ${err}`);
    await conn.$disconnect();
    process.exit(1);
  });
