import { Sequelize } from "sequelize-typescript";
import { appConfig, databaseConfig } from "@/configs";
import { Transaction } from "sequelize";

export default class SequelizeConnection {
  private static instance: SequelizeConnection;
  public connection: Sequelize;

  private constructor() {
    this.connection = new Sequelize(databaseConfig);
    if (appConfig.env === "dev") {
      this.connection.sync({ alter: true });
    }
  }

  static getInstance(): SequelizeConnection {
    if (!SequelizeConnection.instance) {
      SequelizeConnection.instance = new SequelizeConnection();
    }
    return SequelizeConnection.instance;
  }

  async getTrans(): Promise<Transaction> {
    return await this.connection.transaction();
  }

}
