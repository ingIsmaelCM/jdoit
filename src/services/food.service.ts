import { Inject, Injectable } from "@nestjs/common";
import BaseService from "@/services/base.service";
import FoodRepository from "@/repositories/food.repository";
import FoodViewRepository from "@/repositories/food-view.repository";
import { IParams } from "@/utils/interfaces";
import FoodView, { IFoodView } from "@/models/food.view";
import { CreateFoodDto, UpdateFoodDto } from "@/validators/food.validator";
import { Transaction } from "sequelize";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import PlansGateway from "@/services/sockets/plans.gateway";


@Injectable()
export default class FoodService extends BaseService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly foodRepo: FoodRepository,
    private readonly planGateWay: PlansGateway,
    private readonly foodViewRepo: FoodViewRepository) {
    super();
  }


  async getFoods(params: IParams): Promise<IFoodView[]> {
    return await this.foodViewRepo.getAll(params);
  }

  async findFood(foodId: string, params: IParams): Promise<IFoodView> {
    return await this.foodViewRepo.findById(foodId, params);
  }

  async createFood(fooData: CreateFoodDto): Promise<IFoodView> {
    return this.runWithTrans(async (trans: Transaction) => {
      const food = await this.foodRepo.create(fooData, trans);
      return { food, title: "Alimento registrado" };
    });
  }

  async updateFood(foodId: string, foodData: UpdateFoodDto): Promise<IFoodView> {
    return this.runWithTrans(async (trans: Transaction) => {
      const updatedFood = await this.foodRepo.update(foodData, foodId, trans);
      return { updatedFood, title: "Alimento actualizado" };
    });
  }

  async deleteFood(foodId: string): Promise<IFoodView> {
    return this.runWithTrans(async (trans: Transaction) => {
      const deletedFood = await this.foodRepo.delete(foodId, trans);
      return { deletedFood, title: "Alimento eliminado" };
    });
  }

  async restoreFood(foodId: string): Promise<IFoodView> {
    return this.runWithTrans(async (trans: Transaction) => {
      const restoredFood = await this.foodRepo.restore(foodId, trans);
      return { restoredFood, title: "Alimento restaurado" };
    });
  }
}