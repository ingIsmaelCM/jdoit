import { Injectable } from "@nestjs/common";
import BaseService from "@/services/base.service";
import PlanFoodRepository from "@/repositories/plan-food.repository";
import { UpdateFoodPlanDto } from "@/validators/foodplan.validator";

@Injectable()
export  default  class  PlanFoodService extends  BaseService{

  constructor(private  readonly  planfoodRepository: PlanFoodRepository) {
    super();
  }

  async updatePlanFood(planFoodId: string, data: UpdateFoodPlanDto): Promise<any>{
    return this.planfoodRepository.update(data, planFoodId)
  }

}