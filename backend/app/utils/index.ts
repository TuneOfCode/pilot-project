import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
export const formatObject = (obj: any) => JSON.parse(JSON.stringify(obj));
export const removeFile = async (path: string | any) => {
  fs.unlink(path, (err: Error | any) => {
    if (err) {
      console.log(`===> Error occured: ${err}`);
    }
    console.log(`===> Path '${path}' was deleted`);
  });
};

export const generateToken = (
  payload: string | Object | Buffer,
  secret: jwt.Secret,
  expiresIn: number | string | any
) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: jwt.Secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error: any) {
    console.log("===> error: ", error);
    throw new Error(error);
  }
};

export const decodeToken = (token: string): any => {
  return jwt.decode(token, { complete: true });
};

export const encodePassword = async (
  password: string | any,
  salt: number = 11
) => {
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  return await bcrypt.compare(password, hashPassword);
};

export const encodePasswordSync = (password: string, salt: number = 11) => {
  return bcrypt.hashSync(password, salt);
};

export const comparePasswordSync = (password: string, hashPassword: string) => {
  return bcrypt.compareSync(password, hashPassword);
};
