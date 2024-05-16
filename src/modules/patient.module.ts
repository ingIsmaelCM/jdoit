import { Module } from "@nestjs/common";
import { PatientService } from "@/services/patient.service";
import PatientController from "@/controllers/patient.controller";
import PatientRepository from "@/repositories/patient.repository";

@Module({
  imports:[],
  exports:[PatientRepository],
  providers:[PatientService, PatientRepository],
  controllers:[PatientController]

})
export  class PatientModule{}