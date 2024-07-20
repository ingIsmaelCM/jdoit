import { ICommonField } from "@/utils/interfaces";
import { Column, DataType, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import tools from "@/utils/tools";


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
  set title(value: string) {
    this.setDataValue("title", tools.initialToUpper(value));
  }

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
    return this.getDataValue("tags")?.split(",");
  }

  @Column({
    type: DataType.ENUM(...Object.values(EReminderStatus)),
    allowNull: false,
    defaultValue: EReminderStatus.pending
  })
  status: EReminderStatus;

  @Column({
    type: DataType.ENUM(...Object.values(EReminderType)),
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

  static getSearchables(): Array<keyof IReminder> {
    return [
      "dueAt", "time", "title", "description", "type", "tags", "status"
    ];
  }

}