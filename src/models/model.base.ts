import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Sequelize,
  Table
} from "sequelize-typescript";
import { ICommonField } from "@/utils/interfaces";
import UserModel, { IUser } from "@/models/user.model";
import UserView from "@/models/user.view";

@Table({
  paranoid: true,
  createdAt:true
})
export default abstract class ModelBase extends Model implements ICommonField {

  @PrimaryKey
  @IsUUID(4)
  @Column({
    type: DataType.STRING(75),
    allowNull: false,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: string

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: string


  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  createdBy: string;

  @Column({
    type: DataType.STRING(75),
    allowNull: false,
  })
  updatedBy: string;

  @BelongsTo(() => UserView, {
    foreignKey: "createdBy",
    constraints: false
  })
  creator: UserView;

  @BelongsTo(() => UserView, {
    foreignKey: "updatedBy",
    constraints: false

  })
  updator: UserView;

  static getSearchables(): Array<string> {
    return [];
  }

  static getRelations(): Array<string> {
    return [];
  }

}