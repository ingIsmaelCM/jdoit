import { Injectable } from "@nestjs/common";
import BaseService from "@/services/base.service";
import EvalRepository from "@/repositories/eval.repository";
import { IParams } from "@/utils/interfaces";
import { CreateEvalDto } from "@/validators/eval.validator";


@Injectable()
export default class EvalService extends BaseService {

  constructor(private readonly evalRepo: EvalRepository) {
    super();
  }

  async getEvals(params: IParams): Promise<any> {
    return await this.evalRepo.getAll(params);
  }

  async findEval(evalId: string, params: IParams): Promise<any> {
    return await this.evalRepo.findById(evalId, params);
  }

  async createEval(data: CreateEvalDto): Promise<any> {
    return await this.evalRepo.create(data);
  }

  async updateEval(evalId: string, data: CreateEvalDto): Promise<any>{
    return  this.evalRepo.update(data, evalId);
  }

  async deleteEval(evalId: string): Promise<any>{
    return  this.evalRepo.delete(evalId)
  }

  async restoreEval(evalId: string): Promise<any>{
    return  this.evalRepo.restore(evalId)
  }
}