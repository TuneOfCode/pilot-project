// test env
export const JWT = {
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN || "secret_access_token",
  SECRET_REFRESH_TOKEN:
    process.env.SECRET_REFRESH_TOKEN || "secret_refresh_token",
  EXPIRES_IN_ACCESS_TOKEN: process.env.EXPIRES_IN_ACCESS_TOKEN || 60 * 60,
  EXPIRES_IN_REFRESH_TOKEN:
    process.env.EXPIRES_IN_REFRESH_TOKEN || 60 * 60 * 24 * 30,
};
