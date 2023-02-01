import { Role } from "@prisma/client";

export interface ILoginDTO {
  username: string;
  password: string;
}

export default interface IUser {
  username: string;
  password: string;
  role: Role;
  refreshToken?: string;
}
