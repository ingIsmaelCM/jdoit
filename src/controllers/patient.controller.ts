import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { PatientService } from "@/services/patient.service";
import { Author } from "@/decorators/author.decorator";
import { CreatePatientDto, UpdatePatientDto } from "@/validators/patient.validator";
import { IParams } from "@/utils/interfaces";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags("Patients")
@Controller("patients")
export default class PatientController {

  constructor(private readonly patientService: PatientService) {

  }

  @Get()
  async getPatients(@Query() params: IParams) {
    return this.patientService.getPatients(params);
  }

  @Get(":id")
  async findPatient(@Param("id") id: string, @Query() params: IParams) {
    return this.patientService.findPatient(id, params);
  }

  @ApiBody({
    type: CreatePatientDto
  })
  @Post()
  async createPatient(@Author() data: CreatePatientDto) {
    return this.patientService.createPatient(data);
  }

  @ApiBody({
    type: UpdatePatientDto
  })
  @Put(":id")
  async updatePatient(@Author(true) data: UpdatePatientDto,
                      @Param("id") id: string) {
    return this.patientService.updatePatient(data, id);
  }

  @Delete(":id")
  async deletePatient(@Param("id") id: string) {
    return this.patientService.deletePatient(id);
  }

  @Patch(":id")
  async restorePatient(@Param("id") id: string) {
    return this.patientService.restorePatient(id);
  }
}