import { SequelizeOptions } from "sequelize-typescript";
import { Dialect } from "sequelize";
import * as path from "path";

const databaseConfig: SequelizeOptions = {
  database: process.env.DATABASE_NAME || "mydb",
  username: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  dialect: <Dialect>(process.env.DATABASE_DIALECT || "mysql"),
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT || "3306"),
  logging: false,
  timezone: process.env.DATABASE_TIMEZONE||'-04:00',
  models:[path.resolve(__dirname, "../**/*.model.*"), path.resolve(__dirname, "../**/*.view.*")],
  dialectOptions:{

  }
};
export default databaseConfig;