import { BaseRepository } from "@/repositories/base.repository";
import PatientModel from "@/models/patient.model";
import InfoModel from "@/models/info.model";
import { Sequelize } from "sequelize-typescript";
import InfoRepository from "@/repositories/info.repository";

export default class PatientRepository extends BaseRepository<PatientModel> {
  constructor() {
    super(PatientModel);
  }

  public async create(data: any, trans: any): Promise<PatientModel> {
    return this.safeRun(() => PatientModel.create(data, { transaction: trans, include: InfoModel }));
  }

  public async update(
    data: any,
    primaryKey: string | number,
    trans: any,
    key?: string
  ): Promise<PatientModel> {
    await new InfoRepository().update(data, data.info_Id, trans, key);
    return super.update(data, primaryKey, trans, key);
  }
}