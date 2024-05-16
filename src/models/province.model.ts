import { Column, DataType, HasMany, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";
import MunicipeModel from "@/models/municipe.model";


export interface IProvince extends ICommonField {
  name: string;
  code: string;
  municipes: MunicipeModel[]
}

@Table({
  tableName: "provinces",
  paranoid: true,
  indexes: [
    { fields: ["name"], unique: true },
    { fields: ["code"], unique: true }
  ]
})

export default class ProvinceModel extends ModelBase implements IProvince {

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

  @HasMany(() => MunicipeModel, {
    foreignKey: "provinceId"
  })
  municipes: MunicipeModel[];

  static getSearchables(): Array<keyof  IProvince> {
    return ["name","code"];
  }
  static getRelations(): Array<string> {
    return ["municipes"];
  }
}