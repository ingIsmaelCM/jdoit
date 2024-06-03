import { EPlanDay, EPlanType, IPlan } from "@/models/plan.model";
import ModelBase from "@/models/model.base";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import NutrientModel, { INutrient } from "@/models/nutrient.model";
import PatientModel, { IPatient } from "@/models/patient.model";
import FoodModel, { IFood } from "@/models/food.model";
import PlanFoodModel, { IPlanFood } from "@/models/plan-food.model";

export interface IPlanView extends IPlan {
  patientName: string;
  proteins: number;
  calories: number;
  fat: number;
  carbohidrates: number;
  realProteins: number;
  realCalories: number;
  realFat: number;
  realCarbohidrates: number;

}

@Table({
  tableName: "planview",
  paranoid: true
})
export default class PlanView extends ModelBase implements IPlanView {

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

  @Column({
    type: DataType.STRING(150),
    allowNull: false
  })
  patientName: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  proteins: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  calories: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  fat: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  carbohidrates: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  realProteins: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  realCalories: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  realFat: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  realCarbohidrates: number;

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

  @HasMany(() => PlanFoodModel, {
    foreignKey: "planId"
  })
  planfoods: IPlanFood[];


  static getSearchables(): Array<keyof IPlanView> {
    return ["day", "type", "patientName", "proteins", "calories", "carbohidrates", "fat",
      "realCarbohidrates", "realProteins", "realCalories", "realFat","patientId"];
  }

  static getRelations() {
    return ["nutrient", "patient", "planfoods", "planfoods.food", "planfoods.food.nutrient"];
  }
}