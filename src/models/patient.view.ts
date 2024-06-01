import {
  BelongsTo,
  BelongsToAssociation,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Table
} from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { IPatient } from "@/models/patient.model";
import tools from "@/utils/tools";
import InfoModel, { EInfoGender, EInfoType, IInfo } from "@/models/info.model";
import PlanModel, { IPlan } from "@/models/plan.model";
import AddressModel, { IAddress } from "@/models/address.model";
import EvalModel, { IEval } from "@/models/eval.model";

export interface IPatientView extends IPatient {
  email: string;
  phone: string;
  dni: string;
  gender: EInfoGender;
  infoType: EInfoType;
  infoId: string;
  note: string;
  addressId: string;
  line1: string;
  line2: string;
  provinceId: string;
  municipeId: string;
  municipe: string;
  province: string;
  municipeCode: string;
  provinceCode: string;
  infoModelId: string;
  evals: IEval[],
  eval: IEval
}

@Table({
  tableName: "patientview",
  paranoid: true
})
export default class PatientView extends ModelBase implements IPatientView {
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
    type: DataType.STRING(20),
    allowNull: true
  })
  code: string;


  @Column({
    type: DataType.VIRTUAL(DataType.STRING)
  })
  get fullname(): string {
    return this.getDataValue("name") + " " + this.getDataValue("lastname");
  }

  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  infoModelId: string;

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
    type: DataType.STRING(70),
    allowNull: false
  })
  municipe: string;

  @Column({
    type: DataType.STRING(70),
    allowNull: false
  })
  province: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  municipeCode: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  provinceCode: string;

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

  @HasMany(() => InfoModel, {
    foreignKey: "infoId",
    scope: {
      infoType: EInfoType.Patient
    }
  })
  info: IInfo;


  @HasMany(() => PlanModel, {
    foreignKey: "patientId"
  })
  plans: IPlan[];

  @HasMany(() => EvalModel, {
    foreignKey: "patientId"
  })
  evals: IEval[];

  @HasOne(() => EvalModel, {
    foreignKey: "patientId",
  })
  eval: IEval;

  static getSearchables(): Array<keyof IPatientView> {
    return ["code", "name", "lastname", "phone", "email", "dni", "gender", "line1", "line2"];
  }

  static getRelations(): Array<keyof IPatientView> {
    return ["eval", "evals", "info"];
  }

}