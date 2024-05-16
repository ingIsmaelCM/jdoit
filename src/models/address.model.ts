import { BelongsTo, Column, DataType, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import MunicipeModel from "@/models/municipe.model";
import ProvinceModel from "@/models/province.model";

export interface IAddress {
  line1: string;
  line2: string;
  provinceId: string;
  municipeId: string;
}

@Table({
  tableName: "address",
  paranoid: true
})
export default class AddressModel extends ModelBase implements IAddress {

  @Column({
    type: DataType.STRING(120),
    allowNull: false
  })
  line1: string;

  @Column({
    type: DataType.STRING(120),
    allowNull: true
  })
  line2: string;

  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  municipeId: string;

  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  provinceId: string;

  @BelongsTo(() => MunicipeModel, {
    foreignKey: "municipeId"
  })
  municipe: MunicipeModel;

  @BelongsTo(() => ProvinceModel, {
    foreignKey: "provinceId"
  })
  province: ProvinceModel;

}