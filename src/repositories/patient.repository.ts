import { BaseRepository } from "@/repositories/base.repository";
import PatientModel from "@/models/patient.model";
import InfoModel from "@/models/info.model";
import { Sequelize } from "sequelize-typescript";
import InfoRepository from "@/repositories/info.repository";
import AddressModel from "@/models/address.model";
import AddressRepository from "@/repositories/address.repository";

export default class PatientRepository extends BaseRepository<PatientModel> {
  constructor() {
    super(PatientModel);
  }

  public async create(data: any, trans: any): Promise<PatientModel> {
    return this.safeRun(() => PatientModel.create(data,
      {
        transaction: trans, include: [
          {
            model: InfoModel,
            include: [AddressModel]
          }
        ]
      }));
  }


  public async update(
    data: any,
    primaryKey: string | number,
    trans: any,
    key?: string
  ): Promise<PatientModel> {
    const prevInfo = await InfoModel.findByPk(data.infoModelId);
    await prevInfo.update(data.infoModelId, data, { transaction: trans });
    await new InfoRepository().update(data, data.infoModelId, trans, key);
    if (data.line1) {
      await new AddressRepository().update(data, data.addressId, trans, key);
    }
    return super.update(data, primaryKey, trans, key);
  }
}