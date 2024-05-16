import { Injectable } from "@nestjs/common";
import PatientRepository from "@/repositories/patient.repository";
import { CreatePatientDto, UpdatePatientDto } from "@/validators/patient.validator";
import BaseService from "@/services/base.service";
import { Transaction } from "sequelize";
import PatientModel from "@/models/patient.model";
import { IParams } from "@/utils/interfaces";

@Injectable()
export class PatientService extends BaseService {

  constructor(private readonly patientRepo: PatientRepository) {
    super();
  }

  async getPatients(params: IParams): Promise<PatientModel[]> {

    return await this.patientRepo.getAll(params);
  }

  async findPatient(patientId: string, params: IParams): Promise<PatientModel> {
    return await this.patientRepo.findById(patientId, params);
  }

  async createPatient(data: CreatePatientDto): Promise<PatientModel> {
    return await this.runWithTrans(async (trans: Transaction) =>
      await this.patientRepo.create({ ...data, info:data }, trans)
    );
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