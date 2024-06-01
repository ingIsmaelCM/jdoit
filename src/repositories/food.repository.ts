import { BaseRepository } from "@/repositories/base.repository";
import FoodModel from "@/models/food.model";
import NutrientRepository from "@/repositories/nutrient.repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export default class FoodRepository extends BaseRepository<FoodModel> {
  constructor(private readonly  nutrientRepo: NutrientRepository) {
    super(FoodModel);
  }

  public async create(data: any, trans: any): Promise<FoodModel> {
    const nutrient=await this.nutrientRepo.create(data, trans);
    data.nutrientId=nutrient.id
    return super.create(data, trans);
  }

  public async update(
    data: any,
    primaryKey: string | number,
    trans: any,
    key?: string
  ): Promise<FoodModel> {
    await new NutrientRepository().update(data, data.nutrientId, trans, key);
    return super.update(data, primaryKey, trans, key);
  }
}