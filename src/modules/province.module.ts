import { Module } from "@nestjs/common";
import ProvinceService from "@/services/province.service";
import ProvinceRepository from "@/repositories/province.repository";
import ProvinceController from "@/controllers/province.controller";


@Module({
  imports:[],
  exports:[],
  providers:[ProvinceService, ProvinceRepository],
  controllers: [ProvinceController]

})
export  default  class ProvinceModule{}