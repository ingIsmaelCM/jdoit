import ModelBase from "@/models/model.base";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import NutrientModel, { INutrient } from "@/models/nutrient.model";
import PatientModel, { IPatient } from "@/models/patient.model";
import { ICommonField } from "@/utils/interfaces";
import PlanFoodModel, { IPlanFood } from "@/models/plan-food.model";
import FoodModel, { IFood } from "@/models/food.model";

export interface IPlan extends ICommonField {
  type: EPlanType,
  day: EPlanDay;
  nutrientId: string;
  patientId: string;
  note: string;
  patient: IPatient;
  nutrient: INutrient;
  foods: IFood[],
  planfoods: IPlanFood[]
}

export enum EPlanType {
  Desayuno = "Desayuno",
  Merienda1 = "Merienda1",
  Almuerzo = "Almuerzo",
  Merienda2 = "Merienda2",
  Cena = "Cena",
}

export enum EPlanDay {
  L = "Lunes",
  M = "Martes",
  X = "Miércoles",
  J = "Jueves",
  V = "Viernes",
  S = "Sábado",
  D="Domingo"
}

@Table({
  tableName: "plans",
  paranoid: true,
 
})
export default class PlanModel extends ModelBase implements IPlan {

  @Column({
    type: DataType.ENUM(...Object.values(EPlanType)),
    allowNull: false
  })
  type: EPlanType;


  @Column({
    type: DataType.ENUM(...Object.values(EPlanDay)),
    allowNull: false
  })
  day: EPlanDay;

  @Column({
    type: DataType.TEXT("long"),
    allowNull: true
  })
  note: string;

  @ForeignKey(() => NutrientModel)
  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  nutrientId: string;

  @ForeignKey(() => PatientModel)
  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  patientId: string;

  @BelongsTo(() => NutrientModel, {
    foreignKey: "nutrientId"
  })
  nutrient: INutrient;

  @BelongsTo(() => PatientModel, {
    foreignKey: "patientId"
  })
  patient: IPatient;

  @BelongsToMany(() => FoodModel, {
    foreignKey: "foodId",
    through: () => PlanFoodModel
  })
  foods: IFood[];

  @HasMany(()=>PlanFoodModel,{
    foreignKey: "planId"
  })
  planfoods: IPlanFood[]


  static  getSearchables():Array<keyof IPlan>{
    return ["day","type"]
  }

  static  getRelations(){
    return ["nutrient","patient","planfoods","planfoods.food","planfoods.food.nutrient",]
  }

}