import { BelongsTo, Column, DataType, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import MunicipeModel, { IMunicipe } from "@/models/municipe.model";
import ProvinceModel, { IProvince } from "@/models/province.model";
import { ICommonField } from "@/utils/interfaces";
import tools from "@/utils/tools";

export interface IAddress extends ICommonField{
  line1: string;
  line2: string;
  provinceId: string;
  municipeId: string;
  municipe: IMunicipe,
  province: IProvince
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
  set line1(val: string){
    val && this.setDataValue("line1", tools.initialToUpper(val))
  }

  @Column({
    type: DataType.STRING(120),
    allowNull: true
  })
  set line2(val: string){
    val && this.setDataValue("line2", tools.initialToUpper(val))
  }

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
  municipe: IMunicipe;

  @BelongsTo(() => ProvinceModel, {
    foreignKey: "provinceId"
  })
  province: IProvince;

}