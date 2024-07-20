import {
  Column,
  DataType,  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import InfoModel, { EInfoType, IInfo } from "@/models/info.model";
import { ICommonField } from "@/utils/interfaces";
import tools from "@/utils/tools";

export interface IUser extends ICommonField {
  name: string;
  lastname: string;
  fullname: string;
  username: string;
  password: string;
}

@Table({
  tableName: "users",
  paranoid: true
})
export default class UserModel extends Model implements IUser {
  @PrimaryKey
  @IsUUID(4)
  @Column({
    type: DataType.STRING(75),
    allowNull: false,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  set name(value: string) {
    this.setDataValue("name", tools.initialToUpper(value));
  }


  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  set lastname(value: string) {
    this.setDataValue("lastname", tools.initialToUpper(value));
  }

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  set username(value: string) {
    this.setDataValue("username", value.toLowerCase());
  }

  @Column({
    type: DataType.STRING(125),
    allowNull: false
  })
  password: string;

  @Column({
    type: DataType.VIRTUAL(DataType.STRING),
  })
  get fullname(): string {
    return this.getDataValue("name") + " " + this.getDataValue("lastname");
  }

  static getSearchables(): Array<keyof IUser> {
    return ["name", "lastname", "username"];
  }

  static getRelations(): Array<string> {
    return [...Object.keys(UserModel.associations)];
  }

  @HasMany(() => InfoModel, {
    foreignKey: "infoId",
    constraints: false,
    scope: {
      infoType: EInfoType.User
    }
  })
  info: InfoModel;

}