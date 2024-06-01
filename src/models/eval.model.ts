import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";
import PatientModel, { IPatient } from "@/models/patient.model";

export interface IEval extends ICommonField {
  weight: number;
  height: number;
  cuello: number;
  hombro: number;
  pecho: number;
  biceps: number;
  triceps: number;
  antebrazo: number;
  cintura: number;
  cadera: number;
  gluteos: number;
  pantorrilla: number;
  femorales: number;
  patientId: string;
  note: string;
  patient: IPatient;
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
  weight: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false
  })
  height: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0
  })
  cuello: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0
  })
  hombro: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0
  })
  pecho: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0
  })
  biceps: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0
  })
  triceps: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0
  })
  antebrazo: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0
  })
  cintura: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0
  })
  cadera: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0
  })
  gluteos: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0
  })
  pantorrilla: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0
  })
  femorales: number;


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

}