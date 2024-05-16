import { Column, DataType, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";
import tools from "@/utils/tools";

export  interface  IMeasure extends  ICommonField{
  name: string;
  sigla: string
}
@Table({
  tableName: "measures",
  paranoid: true,
  indexes:[
    {fields:["name"], type: "FULLTEXT"},
    {fields:["sigla"], type: "FULLTEXT"},
  ]
})

export  default class MeasureModel extends ModelBase implements  IMeasure{

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  set name(value: string){
    this.setDataValue("name",tools.initialToUpper(value))
  }

  @Column({
    type: DataType.STRING(10),
    allowNull: false
  })
  set sigla(value: string){
    this.setDataValue("sigla",value.toUpperCase())
  }
}