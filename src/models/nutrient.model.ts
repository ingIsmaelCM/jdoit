import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import MeasureModel from "@/models/measure.model";
import { ICommonField } from "@/utils/interfaces";


export interface INutrient extends  ICommonField{
  cant: number;
  calories: number;
  proteins: number;
  carbohidrates: number;
  fat: number;
  cholesterol: number;
  measureId: string;
}

@Table({
  tableName: "nutrients",
  paranoid: true,
})

export default class NutrientModel extends ModelBase implements INutrient {

  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false
  })
  cant: number;

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

  @ForeignKey(() => MeasureModel)
  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  measureId: string;

  @BelongsTo(() => MeasureModel, {
    foreignKey: "measureId"
  })
  measure: MeasureModel;
}