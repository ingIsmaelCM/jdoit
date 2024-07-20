import UserModel, { IUser } from "@/models/user.model";
import { Column, DataType, Table } from "sequelize-typescript";
import { EInfoGender, EInfoType } from "@/models/info.model";
import { IAddress } from "@/models/address.model";
import { IMunicipe } from "@/models/municipe.model";
import { IProvince } from "@/models/province.model";
import tools from "@/utils/tools";


export interface  IUserView extends  IUser{
  email: string;
  phone: string;
  dni: string;
  gender: string;
  infoType: EInfoType;
  infoId: string;
  note: string;
  addressId: string;
  line1: string;
  line2: string;
  provinceId: string;
  municipeId: string;
  municipe: string,
  province: string,
  provinceCode: string;

}

@Table({
  paranoid: true,
  tableName: "userview"
})
export default class UserView extends UserModel implements  IUserView{


  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  email: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true
  })
  phone: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true
  })
  dni: string;

  @Column({
    type: DataType.ENUM(...Object.values(EInfoGender)),
    defaultValue: EInfoGender.Indefinido,
    allowNull: false
  })
  gender: EInfoGender;

  @Column({
    type: DataType.ENUM(...Object.values(EInfoType)),
    allowNull: false
  })
  infoType: EInfoType;

  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  infoId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  note: string;
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
  municipe: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  municipeCode: string;


  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  provinceId: string;

  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  province: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  provinceCode: string;

  @Column({
    type: DataType.STRING(75),
    allowNull: true
  })
  addressId: string;

  static getSearchables(): Array<keyof IUser> {
    return [];
  }

  static getRelations(): Array<string> {
    return [];

  }
}