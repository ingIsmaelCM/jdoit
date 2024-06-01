import { Column, DataType, HasMany, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import tools from "@/utils/tools";
import { ICommonField } from "@/utils/interfaces";
import FoodModel, { IFood } from "@/models/food.model";

export interface ICategory extends ICommonField {
  name: string;
  foods: IFood[];
}

@Table({
  tableName: "categories",
  paranoid: true,
  indexes: [
    { fields: ["name"], unique: true }
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

  @HasMany(() => FoodModel, {
    foreignKey: "categoryId"
  })
  foods: IFood[];

  static getSearchables(): string[] {
    return ["name"];
  }
}