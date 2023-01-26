declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string | number;
      DB_HOST: string;
      DB_USER: string;
      DB_PASS: string;
      DB_DBNAME: string;
    }
  }
}

export {};
