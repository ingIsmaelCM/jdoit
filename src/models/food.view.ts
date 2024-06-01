import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import FoodModel, { IFood } from "@/models/food.model";
import ModelBase from "@/models/model.base";
import tools from "@/utils/tools";
import CategoryModel, { ICategory } from "@/models/category.model";
import NutrientModel, { INutrient } from "@/models/nutrient.model";
import PlanModel, { IPlan } from "@/models/plan.model";
import PlanFoodModel from "@/models/plan-food.model";

export interface IFoodView extends IFood {
  portion: string;
  calories: number;
  proteins: number;
  carbohidrates: number;
  fat: number;
  cholesterol: number;
  categoryName: string;
}

@Table({
  tableName: "foodview",
  paranoid: true,
  indexes: []
})

export default class FoodView extends ModelBase implements IFoodView {

  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  set name(value: string) {
    this.setDataValue("name", tools.initialToUpper(value));
  }

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: false,
    defaultValue: 1
  })
  priority: number;

  @ForeignKey(() => CategoryModel)
  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  categoryId: string;

  @Column({
    type: DataType.STRING(75),
    allowNull: true
  })
  nutrientId: string;


  @BelongsTo(() => CategoryModel, {
    foreignKey: "categoryId"
  })
  category: ICategory;

  @BelongsTo(() => NutrientModel, {
    foreignKey: "nutrientId"
  })
  nutrient: INutrient;


  @BelongsToMany(() => PlanModel, {
    foreignKey: "planId",
    through: () => PlanFoodModel
  })
  plans: IPlan[];


  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  portion: string;

  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 0
  })
  calories: number;

  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 0
  })
  proteins: number;


  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 0
  })
  carbohidrates: number;


  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 0
  })
  fat: number;

  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 0
  })
  cholesterol: number;


  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  categoryName: string;


  static getSearchables(): Array<keyof IFoodView> {
    return [...FoodModel.getSearchables(), "calories", "carbohidrates",
      "categoryId", "cholesterol", "categoryName", "categoryId",
      "proteins", "fat", "portion", "priority"];
  }

  static getRelations(): Array<string> {
    return [];
  }

}