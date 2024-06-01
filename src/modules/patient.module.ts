import { Module } from "@nestjs/common";
import { PatientService } from "@/services/patient.service";
import PatientController from "@/controllers/patient.controller";
import PatientRepository from "@/repositories/patient.repository";
import PatientViewRepository from "@/repositories/patientview.repository";

@Module({
  imports:[],
  exports:[PatientRepository],
  providers:[PatientService, PatientRepository, PatientViewRepository],
  controllers:[PatientController]

})
export  class PatientModule{}