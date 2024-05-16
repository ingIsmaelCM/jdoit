import ModelBase from "@/models/model.base";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import NutrientModel from "@/models/nutrient.model";
import PatientModel from "@/models/patient.model";
import { ICommonField } from "@/utils/interfaces";
import PlanFoodModel from "@/models/plan-food.model";
import FoodModel from "@/models/food.model";

export interface IPlan extends ICommonField {
  type: EPlanType,
  day: EPlanDay;
  nutrientId: string;
  patientId: string;
  note: string;
}

export enum EPlanType {
  Desayuno = "Desayuno",
  Merienda1 = "Merienda1",
  Almuerzo = "Almuerzo",
  Merienda2 = "Merienda2",
  Cena = "Cena",
}

export enum EPlanDay {
  Lunes = "Lunes",
  Martes = "Martes",
  Miercoles = "Miércoles",
  Jueves = "Jueves",
  Viernes = "Viernes",
  Sabado = "Sábado"
}

@Table({
  tableName: "plans",
  paranoid: true,
  indexes: [
    { fields: ["type", "patientId", "day"], unique: true }
  ]
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
    type: DataType.STRING(250),
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
  nutrient: NutrientModel;

  @BelongsTo(() => PatientModel, {
    foreignKey: "patientId"
  })
  patient: PatientModel;

  @BelongsToMany(() => FoodModel, {
    foreignKey: "foodId",
    through: () => PlanFoodModel
  })
  foods: FoodModel[];

}