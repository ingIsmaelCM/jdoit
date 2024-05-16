import { Controller, Get, Param, Query } from "@nestjs/common";
import { IParams } from "@/utils/interfaces";
import ProvinceService from "@/services/province.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Provinces")
@Controller("provinces")
export default class ProvinceController {

  constructor(private readonly provinceService: ProvinceService) {
  }

  @Get()
  async getProvinces(@Query() params: IParams) {
    return this.provinceService.getProvinces(params);
  }

  @Get(":id")
  async findProvince(@Param("id") id: string, @Query() params: IParams) {
    return this.provinceService.findProvince(id, params);
  }
}