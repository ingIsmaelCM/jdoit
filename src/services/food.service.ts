import { Injectable } from "@nestjs/common";
import BaseService from "@/services/base.service";
import FoodRepository from "@/repositories/food.repository";
import FoodViewRepository from "@/repositories/food-view.repository";
import { IParams } from "@/utils/interfaces";
import { IFoodView } from "@/models/food.view";
import { CreateFoodDto } from "@/validators/food.validator";
import { Transaction } from "sequelize";


@Injectable()
export default class FoodService extends BaseService {
  constructor(private readonly foodRepo: FoodRepository,
              private readonly foodViewRepo: FoodViewRepository) {
    super();
  }


  async getFoods(params: IParams): Promise<IFoodView[]> {
    return await this.foodViewRepo.getAll(params);
  }

  async findFood(foodId: string, params: IParams): Promise<IFoodView> {
    return await this.foodViewRepo.findById(foodId, params);
  }

  async createFood(fooData: CreateFoodDto): Promise<IFoodView>{
    return this.runWithTrans(async(trans: Transaction)=>{
      console.log(fooData)
    })
  }
}