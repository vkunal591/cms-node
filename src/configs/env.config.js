import { configDotenv } from "dotenv";
import { cleanEnv, str, num } from "envalid";

configDotenv();

const env = cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  JWT_SECRET: str(),
  DB_URI: str(),
  JWT_ACCESS_EXPIRES: str(),
  JWT_REFRESH_EXPIRES_IN: str(),
});

export default env;
