import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType, ForeignKey,
  Table
} from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";
import { Op } from "sequelize";
import { HttpException, HttpStatus } from "@nestjs/common";
import AddressModel, { IAddress } from "@/models/address.model";

export interface IInfo extends ICommonField {
  email: string;
  phone: string;
  dni: string;
  gender: EInfoGender;
  infoType: EInfoType;
  infoId: string;
  note: string;
  addressId: string;
  address: IAddress;
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
    { fields: ["infoId", "infoType"], unique: true },
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
    value && this.setDataValue("email", value.toLowerCase());
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

  @ForeignKey(() => AddressModel)
  @Column({
    type: DataType.STRING(75),
    allowNull: true
  })
  addressId: string;

  @BelongsTo(() => AddressModel, {
    foreignKey: "addressId"
  })
  address: IAddress;

  @BeforeCreate
  @BeforeUpdate
  static async checkIfExists(instance: InfoModel) {
    await this.checkDuplicated(instance.dataValues);
  }

  static async checkDuplicated(instance: InfoModel) {
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

  static getSearchables(): Array<keyof IInfo> {
    return ["email", "phone", "dni", "infoId", "infoType", "note"];
  }
}



