import { Column, DataType, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import tools from "@/utils/tools";


@Table({
  tableName: "categories",
  paranoid: true,
  indexes: [
    { fields: ["name"], type: "FULLTEXT", unique: true }
  ]
})
export default class CategoryModel extends ModelBase {
  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  set name(value: string) {
    this.setDataValue("name", tools.initialToUpper(value));
  }

  static  getSearchables():string[]{
    return ["name"]
  }
}