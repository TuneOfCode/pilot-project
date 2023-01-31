import { Request } from "express";
import responseCode from "../utils/responseCode.util";
import { responseErrorData, responseSuccessData } from "../utils/response.util";

// middleware for response application
const responseMiddleware = async (req: Request, res: any, next: any) => {
  // return success response
  res.success = (
    data: any = null,
    message = responseCode.SUCCESS.message,
    statusCode = responseCode.SUCCESS.code
  ) => {
    const _res = responseSuccessData(message, statusCode, data, req);
    return res.status(statusCode).json(_res);
  };

  // return error response
  res.errors = (
    error: any = null,
    message = responseCode.INTERNAL_SERVER_ERROR.message,
    statusCode = responseCode.INTERNAL_SERVER_ERROR.code
  ) => {
    if (error && error?.statusCode && error?.message) {
      const _res = responseErrorData(
        error?.message,
        error?.statusCode,
        error,
        req
      );
      return res.status(error?.statusCode).json(_res);
    }
    const _res = responseErrorData(message, statusCode, error, req);
    return res.status(statusCode).json(_res);
  };

  next();
};

export default responseMiddleware;
