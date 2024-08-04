import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  SECRET_KEY,
  ORIGIN,
  RECAPTCHA_SECRET_KEY,
} = process.env;
