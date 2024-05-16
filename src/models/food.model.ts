import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";
import CategoryModel from "@/models/category.model";
import PlanModel from "@/models/plan.model";
import PlanFoodModel from "@/models/plan-food.model";
import tools from "@/utils/tools";

export interface IFood extends ICommonField {
  name: string;
  categoryId: string;
  nutrientId: string;
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
  set name(value: string){
    this.setDataValue("name",tools.initialToUpper(value))
  }

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


  @BelongsTo(() => CategoryModel)
  category: CategoryModel;

  @BelongsToMany(()=>PlanModel,{
    foreignKey: "planId",
    through: ()=>PlanFoodModel
  })
  plans: PlanModel[]

  static  getSearchables():any[]{
    return ["name", "categoryId","nutrientId"]
  }
}