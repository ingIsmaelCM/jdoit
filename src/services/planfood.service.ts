import { Injectable, PreconditionFailedException } from "@nestjs/common";
import BaseService from "@/services/base.service";
import PlanFoodRepository from "@/repositories/plan-food.repository";
import { CreateFoodPlanDto, UpdateFoodPlanDto } from "@/validators/foodplan.validator";

@Injectable()
export default class PlanFoodService extends BaseService {

  constructor(private readonly planfoodRepo: PlanFoodRepository) {
    super();
  }

  async createPlanFood(data: CreateFoodPlanDto):Promise<any>{
    return this.planfoodRepo.create(data)
  }

  async updatePlanFood(planFoodId: string, data: UpdateFoodPlanDto): Promise<any> {
    return this.planfoodRepo.update(data, planFoodId);
  }

  async deletePlanFood(planFoodId: string): Promise<any> {
    const planFood = await this.planfoodRepo.findById(planFoodId, { include: "plan.planfoods" });
    if (planFood.plan.planfoods.length <= 1) {
      throw new PreconditionFailedException("No puede eliminar este alimento del plan");
    }
    return await this.planfoodRepo.delete(planFoodId);
  }

}