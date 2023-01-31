import responseCode from "../../utils/responseCode.util";
const catchErrorsApp = {
  // set up middleware for status code 400
  catchErrorNotFoundPage: (req: any, res: any, next: any) => {
    return res.errors(
      null,
      responseCode.NOT_FOUND.message,
      responseCode.NOT_FOUND.code
    );
  },
  // set up middleware for error application
  catchErrorOther: (err: any, req: any, res: any, next: any) => {
    switch (err?.statusCode) {
      // 400
      case responseCode.BAD_REQUEST.code:
        return res.errors(
          err,
          responseCode.BAD_REQUEST.message,
          responseCode.BAD_REQUEST.message
        );
      // 401
      case responseCode.UNAUTHORIZED.code:
        return res.errors(
          err,
          responseCode.UNAUTHORIZED.message,
          responseCode.UNAUTHORIZED.message
        );
      // 403
      case responseCode.FORBIDDEN.code:
        return res.errors(
          err,
          responseCode.FORBIDDEN.message,
          responseCode.FORBIDDEN.message
        );
      case responseCode.INTERNAL_SERVER_ERROR.code:
        // 500
        return res.errors(
          err,
          responseCode.INTERNAL_SERVER_ERROR.message,
          responseCode.INTERNAL_SERVER_ERROR.message
        );
      default:
        return res.errors(err, err?.message, err?.statusCode);
    }
  },
};

export default catchErrorsApp;
