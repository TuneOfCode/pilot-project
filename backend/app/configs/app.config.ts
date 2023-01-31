// test env
export const SSL = process.env.SSL || false;
export const PROTOCOL = process.env.PROTOCOL || (SSL ? "https" : "http");
export const HOST = process.env.HOST || "localhost";
export const PORT = process.env.PORT || 1801;
export const DOMAIN = `${PROTOCOL}://${HOST}:${PORT}`;
