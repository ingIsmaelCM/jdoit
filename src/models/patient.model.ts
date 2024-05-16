import { Column, DataType, HasMany, Table } from "sequelize-typescript";
import ModelBase from "@/models/model.base";
import { ICommonField } from "@/utils/interfaces";
import tools from "@/utils/tools";
import InfoModel, { EInfoType } from "@/models/info.model";

export interface IPatient extends ICommonField {
  name: string;
  lastname: string;
  fullname: string;
}


@Table({
  tableName: "patients",
  paranoid: true,
  indexes: [
    { fields: ["name", "lastname"], type: "FULLTEXT" }
  ]
})
export default class PatientModel extends ModelBase {

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
  info: InfoModel;


}