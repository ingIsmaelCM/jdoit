import { Injectable } from "@nestjs/common";
import UserViewRepository from "@/repositories/user-view.repository";
import { Cron, SchedulerRegistry } from "@nestjs/schedule";
import * as categories from "@/database/foods.json";
import SequelizeConnection from "@/database/sequelize.connection";
import CategoryModel from "@/models/category.model";
import { IFoodView } from "@/models/food.view";
import FoodModel from "@/models/food.model";
import NutrientModel from "@/models/nutrient.model";

@Injectable()
export class AppService {

  constructor(private readonly userviewRepo: UserViewRepository, private readonly scheduleRegistry: SchedulerRegistry) {
  }


  async getHello(): Promise<any> {
    const trans = await SequelizeConnection.getInstance().getTrans();
    const USERID = "12d53a7d-a34b-42ee-b46c-643b19ae6dda";
    try {
      for (const cat of categories) {
        const data={
          name: cat.name,
          createdBy: USERID,
          updatedBy: USERID,
          foods: cat.foods.map((food: any) => ({
            name: food.name,
            createdBy: USERID,
            updatedBy: USERID,
            nutrient: {
              createdBy: USERID,
              updatedBy: USERID,
              proteins: food.proteins,
              calories: food.calories,
              fat: food.fat,
              carbohidrates: food.carbohidrates

            }
          }))
        }
        await CategoryModel.create(data, {
          transaction: trans,
          include: [{
            model: FoodModel,
            include: [NutrientModel]
          }]
        });
      }
      await  trans.commit();
    } catch (e: any) {
      await trans.rollback();
      throw e;
    }
    return await this.userviewRepo.getAll({});
  }


}
