import {
  BeforeBulkUpdate, BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table
} from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";
import PatientModel, { IPatient } from "@/models/patient.model";

export interface IEval extends ICommonField {
  weight: number;
  height: number;
  imc: number;
  note: string;
  patientId: string;
}

@Table({
  tableName: "evals",
  paranoid: true
})
export default class EvalModel extends ModelBase implements IEval {

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false
  })
  get weight(): number {
    return Number(this.getDataValue("weight"));
  }

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false
  })
  get height(): number {
    return Number(this.getDataValue("height"));
  }

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0
  })
  get imc(): number {
    return Number(this.getDataValue("imc"));
  }


  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  note: string;


  @ForeignKey(() => PatientModel)
  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  patientId: string;

  @BelongsTo(() => PatientModel, {
    foreignKey: "patientId"
  })
  patient: IPatient;

  @BeforeBulkUpdate
  static setIMCOnUpdate(instance: any) {
    const convertedHeight=(instance.attributes.height / 100);
    const imc = instance.attributes.weight / (Math.pow(convertedHeight,2));
    instance.attributes.imc=Number(imc.toFixed(1));
  }

  @BeforeCreate
  static setIMCOnCreate(instance: any) {
    const convertedHeight=(instance.height / 100);
    const imc = instance.weight / (Math.pow(convertedHeight,2));
    instance.setDataValue("imc",Number(imc.toFixed(1)))
  }



  static getSearchables(): Array<keyof IEval>{
    return ["weight","height","note","imc"]
  }

  static  getRelations():Array<string>{
    return ["patient"]
  }

}