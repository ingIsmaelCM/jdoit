import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  IsUUID,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import tools from "@/utils/tools";
import { ICommonField } from "@/utils/interfaces";
import { Op } from "sequelize";
import { HttpException, HttpStatus } from "@nestjs/common";
import AddressModel from "@/models/address.model";

export interface IInfo extends ICommonField {
  email: string;
  phone: string;
  dni: string;
  gender: EInfoGender;
  infoType: EInfoType;
  infoId: string;
  note: string;
  addressId: string;
}

export enum EInfoGender {
  Masculino = "Masculino",
  Femenino = "Femenino",
  Indefinido = "Indefinido"
}

export enum EInfoType {
  Patient = "Patient",
  User = "User",
  Contact = "Contact",
}

@Table({
  indexes: [
    { fields: ["email", "infoType"], unique: true },
    { fields: ["dni", "infoType"], unique: true },
    { fields: ["phone", "infoType"], unique: true }
  ],
  paranoid: true,
  tableName: "infos"
})
export default class InfoModel extends ModelBase implements IInfo {

  @Column({
    type: DataType.STRING(75),
    allowNull: true
  })
  set email(value: string) {
    this.setDataValue("email", value.toLowerCase());
  }

  @Column({
    type: DataType.STRING(20),
    allowNull: false
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

  @BelongsTo(() => AddressModel, {
    foreignKey: "addressId"
  })
  address: AddressModel;

  @BeforeCreate
  @BeforeUpdate
  static async checkIfExists(instance: InfoModel) {
    const existingInfo = await InfoModel.findOne({
      where: {
        infoType: instance.infoType,
        id: { [Op.ne]: instance.id || "" },
        [Op.or]: {
          phone: instance.phone || "",
          email: instance.email || "",
          dni: instance.dni || ""
        }

      }
    });
    if (existingInfo) {
      throw new HttpException("Duplicated info", HttpStatus.CONFLICT);
    }
  }
}



