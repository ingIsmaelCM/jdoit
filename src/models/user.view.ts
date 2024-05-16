import UserModel, { IUser } from "@/models/user.model";
import { Column, DataType, Table } from "sequelize-typescript";
import { EInfoGender, EInfoType } from "@/models/info.model";

@Table({
  paranoid: true,
  tableName: "userview"
})
export default class UserView extends UserModel {


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