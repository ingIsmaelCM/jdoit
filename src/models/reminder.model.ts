import { ICommonField } from "@/utils/interfaces";
import { Column, DataType, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";


export interface IReminder extends ICommonField {
  title: string;
  description: string;
  tags: string;
  type: EReminderType;
  status: EReminderStatus;
  dueAt: string;
  day: string;
  time: string;
  dayName: string;
  doneAt: Date;
}

export enum EReminderType {
  recurrent = "Recurrente",
  oneTime = "Único"
}

export enum EReminderStatus {
  pending = "Pendiente",
  completed = "Completado",
  canceled = "Cancelado"
}

@Table({
  tableName: "reminders",
  paranoid: true
})

export default class ReminderModel extends ModelBase implements IReminder {

  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  title: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: false
  })
  description: string;



  @Column({
    type: DataType.STRING(150),
    allowNull: true
  })
  get tags() {
    return this.getDataValue("tags").split(",");
  }

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    defaultValue: EReminderStatus.pending
  })
  status: EReminderStatus;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    defaultValue: EReminderType.oneTime
  })
  type: EReminderType;

  @Column({
    type: DataType.DATE(),
    allowNull: false
  })
  dueAt: string;

  @Column({
    type: DataType.DATE(),
    allowNull: false
  })
  day: string;

  @Column({
    type: DataType.DATE(),
    allowNull: false
  })
  time: string;

  @Column({
    type: DataType.DATE(),
    allowNull: true
  })
  dayName: string;

  @Column({
    type: DataType.DATE(),
    allowNull: true
  })
  doneAt: Date;

}