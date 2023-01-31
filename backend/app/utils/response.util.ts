import { Request, Response } from "express";

export interface IReponseApp {
  status: string;
  statusCode: number;
  message: string;
  data?: any;
  paginate?: string;
  error?: any;
  path?: string;
  time?: string;
}

export const responseSuccessData = (
  message: string,
  statusCode: number,
  data: any,
  req: Request
): IReponseApp => {
  if (
    data?.paginate?.page ||
    (data?.paginate?.page && data?.paginate?.limit) ||
    data?.search ||
    data?.filter
  )
    return {
      status: "success",
      statusCode,
      message,
      data: data?.data,
      paginate: data?.paginate,
      path: req?.originalUrl,
      time: new Date().toLocaleString("es-Us"),
    };
  return {
    status: "success",
    statusCode,
    message,
    data,
    path: req?.originalUrl,
    time: new Date().toLocaleString("es-Us"),
  };
};

export const responseErrorData = (
  message: string,
  statusCode: number,
  error: any,
  req?: Request
): IReponseApp => {
  return {
    status: "failure",
    statusCode,
    message,
    error,
    path: req?.originalUrl,
    time: new Date().toLocaleString("es-Us"),
  };
};
