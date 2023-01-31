import fs from "fs";
export const formatObject = (obj: any) => JSON.parse(JSON.stringify(obj));
export const removeFile = async (path: string | any) => {
  fs.unlink(path, (err: Error | any) => {
    if (err) {
      console.log(`===> Error occured: ${err}`);
    }
    console.log(`===> Path '${path}' was deleted`);
  });
};
