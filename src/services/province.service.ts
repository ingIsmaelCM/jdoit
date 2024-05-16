import { Injectable } from "@nestjs/common";
import BaseService from "@/services/base.service";
import { IParams } from "@/utils/interfaces";
import ProvinceRepository from "@/repositories/province.repository";
import ProvinceModel from "@/models/province.model";


@Injectable()
export default class ProvinceService extends BaseService {

  constructor(private readonly provinceRepo: ProvinceRepository) {
    super();
  }

  async getProvinces(params: IParams): Promise<ProvinceModel[]> {
    return await this.provinceRepo.getAll(params);
  }

  async findProvince(provinceId: string, params: IParams): Promise<ProvinceModel> {
    return await this.provinceRepo.findById(provinceId, params);
  }
}