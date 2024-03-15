/**
 * Sequelize Interface connection
 * Used for RAW SQL Queries
 *
 */
// Path: src/Api/Database/sequelize.ts

import { Sequelize } from "sequelize";
import { config } from "../../Config/config";
export const sequelize = new Sequelize(
  config.sequelize_database,
  config.sequelize_db_user,
  config.sequelize_db_password,
  {
    dialect: "mysql",
    port: config.sequelize_db_port,
    dialectModule: require("mysql2"),
    host: config.sequelize_db_host,
  },
);
