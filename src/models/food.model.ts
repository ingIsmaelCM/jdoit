import {
  AfterDestroy, AfterRestore,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Table
} from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";
import CategoryModel, { ICategory } from "@/models/category.model";
import PlanModel, { IPlan } from "@/models/plan.model";
import PlanFoodModel, { IPlanFood } from "@/models/plan-food.model";
import tools from "@/utils/tools";
import NutrientModel, { INutrient } from "@/models/nutrient.model";

export interface IFood extends ICommonField {
  name: string;
  priority: number;
  categoryId: string;
  nutrientId: string;
  category: ICategory;
  nutrient: INutrient;
  plans: IPlan[];
}

@Table({
  tableName: "foods",
  paranoid: true,
  indexes: [
    { fields: ["name"], type: "FULLTEXT" }
  ]
})

export default class FoodModel extends ModelBase implements IFood {

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

  @ForeignKey(() => NutrientModel)
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

  @HasMany(() => PlanFoodModel, {
    foreignKey: "foodId"
  })
  planfoods: IPlanFood[];

  static getSearchables(): any[] {
    return ["name", "categoryId", "nutrientId"];
  }

  @AfterDestroy
  static removePlans(instance: any) {
    instance.getPlanfoods().then((planfoods: PlanFoodModel[]) =>
      planfoods.forEach((planfood: any) =>
        planfood.destroy()));
  }

  @AfterRestore
  static  restorePlans(instance: any){
    instance.getPlanfoods({paranoid: false}).then((planfoods: PlanFoodModel[]) =>
      planfoods.forEach((planfood: any) =>
        planfood.restore()));
  }
  
}