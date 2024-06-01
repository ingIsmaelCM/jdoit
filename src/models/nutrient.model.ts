import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";


export interface INutrient extends  ICommonField{
  portion: string;
  calories: number;
  proteins: number;
  carbohidrates: number;
  fat: number;
  cholesterol: number;
}

@Table({
  tableName: "nutrients",
  paranoid: true,
})

export default class NutrientModel extends ModelBase implements INutrient {

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    defaultValue: "100g"
  })
  set portion(value: string){
    this.setDataValue("portion", value.toLowerCase().replace(/ /gi,""))
  }

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


}