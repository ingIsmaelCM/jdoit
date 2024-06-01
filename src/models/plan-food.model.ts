import {
  AfterBulkCreate,
  AfterCreate,
  AfterSave,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table
} from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";
import PlanModel from "@/models/plan.model";
import FoodModel from "@/models/food.model";
import { BadRequestException } from "@nestjs/common";

export interface IPlanFood extends ICommonField {
  planId: string;
  foodId: string;
  portion: number;
}

@Table({
  tableName: "plan_foods",
  paranoid: true,
  indexes: [{
    fields: ["foodId", "planId"],
    unique: true
  }]
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
 get portion(){
    return Number(this.getDataValue("portion"))
  }


  @BelongsTo(() => PlanModel, {
    foreignKey: "planId"
  })
  plan: PlanModel;

  @BelongsTo(() => FoodModel.scope(null), {
    foreignKey: "foodId",
  })
  food: FoodModel;

  @AfterBulkCreate
  static async updatePriority(instance: PlanFoodModel[]) {
    try {
     instance.forEach((planFood: PlanFoodModel)=>{
       FoodModel.findByPk(planFood.foodId).then((f: FoodModel) => {
         if (f.priority < 5) {
           f.priority=Number(f.priority)+0.01;
           f.save();
         }
       });
     })
    }catch (e:any){
      throw new BadRequestException("Error al actualizar los alimentos")
    }
  }
}