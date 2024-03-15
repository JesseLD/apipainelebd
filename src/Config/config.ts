import dotenv from "dotenv";
dotenv.config();

/**
 * Configuration object for the application. Using dotenv lib to load environment variables.
 *
 */
export const config = {
  port: process.env.PORT || 3000,
  apiUrl: process.env.API_URL || "http://localhost:3000",
  sequelize_database: process.env.SEQUELIZE_DB_NAME || "test",
  sequelize_db_host: process.env.SEQUELIZE_DB_HOST || "localhost",
  sequelize_db_user: process.env.SEQUELIZE_DB_USER || "root",
  sequelize_db_password: process.env.SEQUELIZE_DB_PASSWORD || "",
  sequelize_db_port:
    Number.parseInt(process.env.SEQUELIZE_DB_PORT as string) || 3306,
  apiKey: process.env.API_KEY || "",
};
