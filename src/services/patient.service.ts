import { Injectable } from "@nestjs/common";
import PatientRepository from "@/repositories/patient.repository";
import { CreatePatientDto, UpdatePatientDto } from "@/validators/patient.validator";
import BaseService from "@/services/base.service";
import { col, fn, Transaction } from "sequelize";
import PatientModel from "@/models/patient.model";
import { IParams } from "@/utils/interfaces";
import PatientViewRepository from "@/repositories/patientview.repository";

@Injectable()
export class PatientService extends BaseService {

  constructor(private readonly patientRepo: PatientRepository,
              private readonly patientViewRepo: PatientViewRepository) {
    super();
  }

  async getPatients(params: IParams): Promise<PatientModel[]> {
    return await this.patientViewRepo.getAll(params);
  }

  async findPatient(patientId: string, params: IParams): Promise<PatientModel> {
    return await this.patientViewRepo.findById(patientId, params);
  }

  async getPatientPlans(patientId: string){
    const  plans=await  this.patientViewRepo.getPlans(patientId);
    return plans.map((plan: any)=>({
     type: plan.type,
      proteins: Number(plan.proteins).toFixed(2),
      calories: Number(plan.calories).toFixed(2),
      carbohidrates: Number(plan.carbohidrates).toFixed(2),
      fat: Number(plan.fat).toFixed(2),
      patientId: plan.patientId
    }))
  }
  async createPatient(data: CreatePatientDto): Promise<PatientModel> {
    return await this.runWithTrans(async (trans: Transaction) => {
        const info: any = { ...data };
        if (data.line1) {
          info.address = { ...data };
        }
        return await this.patientRepo.create({ ...data, info: info }, trans);
      }
    )
      ;
  }

  async updatePatient(data: UpdatePatientDto, patientId: string): Promise<PatientModel> {
    return await this.runWithTrans(async (trans: Transaction) =>
      await this.patientRepo.update(data, patientId, trans));
  }

  async deletePatient(patientId: string): Promise<PatientModel> {
    return await this.runWithTrans(async (trans: Transaction) =>
      await this.patientRepo.delete(patientId, trans));
  }

  async restorePatient(patientId: string): Promise<PatientModel> {
    return await this.runWithTrans(async (trans: Transaction) =>
      await this.patientRepo.restore(patientId, trans));
  }

}