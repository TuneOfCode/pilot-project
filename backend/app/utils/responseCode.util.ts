const responseCode = {
  SUCCESS: {
    code: 200,
    message: "Success",
  },
  CREATED: {
    code: 201,
    message: "Created",
  },

  BAD_REQUEST: {
    code: 400,
    message: "Bad request",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Unauthorized",
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden",
  },
  NOT_FOUND: {
    code: 404,
    message: "Not found",
  },

  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Internal server error",
  },
};

export default responseCode;
