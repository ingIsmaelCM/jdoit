import { AfterCreate, BelongsToMany, Column, DataType, HasMany, HasOne, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";
import tools from "@/utils/tools";
import InfoModel, { EInfoType, IInfo } from "@/models/info.model";
import PlanModel, { IPlan } from "@/models/plan.model";
import AddressModel, { IAddress } from "@/models/address.model";
import { count } from "rxjs";
import EvalModel, { IEval } from "@/models/eval.model";

export interface IPatient extends ICommonField {
  name: string;
  lastname: string;
  fullname: string;
  plans: IPlan[];
  info: IInfo;
  code: string;
  dob: Date;
}


@Table({
  tableName: "patients",
  paranoid: true,
  indexes: [
    { fields: ["name", "lastname"], type: "FULLTEXT" }
  ]
})
export default class PatientModel extends ModelBase implements IPatient {

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
    type: DataType.DATEONLY(),
    allowNull: true
  })
  dob: Date;

  @Column({
    type: DataType.VIRTUAL(DataType.STRING)
  })
  get fullname(): string {
    return this.getDataValue("name") + " " + this.getDataValue("lastname");
  }

  @HasMany(() => InfoModel, {
    foreignKey: "infoId",
    scope: {
      infoType: EInfoType.Patient
    }
  })
  info: IInfo;

  @BelongsToMany(() => AddressModel, {
    through: () => InfoModel,
    foreignKey: "infoId",
    targetKey: "id",
    otherKey: "addressId",
    scope: {
      infoType: EInfoType.Patient
    }

  })
  address: IAddress;

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

  @AfterCreate
  static createCode(instance: PatientModel) {
    PatientModel.count({ paranoid: false }).then((count: number) => {
      const code = String(count+1).padStart(5, "0");
      instance.update({ code: code }).then();
    });
  }
}