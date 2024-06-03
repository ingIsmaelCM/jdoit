import { BaseRepository } from "@/repositories/base.repository";
import PlanModel from "@/models/plan.model";
import NutrientRepository from "@/repositories/nutrient.repository";
import PlanFoodModel from "@/models/plan-food.model";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export default class PlanRepository extends BaseRepository<PlanModel> {
  constructor(
    private readonly nutrientRepo: NutrientRepository
  ) {
    super(PlanModel);
  }


  public async bulkCreate(data: any[], trans: any): Promise<PlanModel[]> {
    try {
      const nutrient = await this.nutrientRepo.create(data[0], trans);
      data = data.map((d: any) => ({
        ...d,
        nutrientId: nutrient.id
      }));
      return await PlanModel.bulkCreate(data,
        {
          transaction: trans, include: [{
            model: PlanFoodModel,
            as:"planfoods",

          }]
        });
    } catch (error: any) {
      console.log(error)
      if (error.original?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException("Algunos datos están duplicados");
      } else {

        throw error;
      }
    }

  }
}