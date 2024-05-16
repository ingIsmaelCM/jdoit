import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";
import PlanModel from "@/models/plan.model";
import FoodModel from "@/models/food.model";

export interface IPlanFood extends ICommonField {
  planId: string;
  foodId: string;
  portion: number;
}

@Table({
  tableName: "plan_foods",
  paranoid: true
})
export default class PlanFoodModel extends ModelBase implements IPlanFood {

  @ForeignKey(() => PlanModel)
  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  planId: string;

  @ForeignKey(() => FoodModel)
  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  foodId: string;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: false
  })
  portion: number;


  @BelongsTo(() => PlanModel, {
    foreignKey: "planId"
  })
  plan: PlanModel;

  @BelongsTo(() => FoodModel, {
    foreignKey: "foodId"
  })
  food: FoodModel;
}