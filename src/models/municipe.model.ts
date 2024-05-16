import { BelongsTo, Column, DataType, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";
import ProvinceModel from "@/models/province.model";


export interface IMunicipe extends ICommonField {
  name: string;
  code: string;
  provinceId: string;
  province: ProvinceModel
}

@Table({
  tableName: "municipes",
  paranoid: true,
  indexes: [
    { fields: ["name"], unique: true },
    { fields: ["code","provinceId"], unique: true }
  ]
})

export default class MunicipeModel extends ModelBase implements IMunicipe {

  @Column({
    type: DataType.STRING(70),
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  code: string;

  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  provinceId: string;


  @BelongsTo(() => ProvinceModel, {
    foreignKey: "provinceId"
  })
  province: ProvinceModel;
}