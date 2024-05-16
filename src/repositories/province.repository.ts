import { BaseRepository } from "@/repositories/base.repository";
import ProvinceModel from "@/models/province.model";
import InfoModel from "@/models/info.model";
import MunicipeModel from "@/models/municipe.model";

export default class ProvinceRepository extends BaseRepository<ProvinceModel> {
  constructor() {
    super(ProvinceModel);
  }
  public async create(data: any, trans: any): Promise<ProvinceModel> {
    return this.safeRun(() => ProvinceModel.create(data, { transaction: trans, include: MunicipeModel }));
  }


}