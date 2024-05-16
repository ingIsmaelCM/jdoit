import { Module } from "@nestjs/common";
import FoodService from "@/services/food.service";
import FoodRepository from "@/repositories/food.repository";
import FoodViewRepository from "@/repositories/food-view.repository";
import FoodController from "@/controllers/food.controller";


@Module({
  imports:[],
  providers:[FoodService, FoodRepository, FoodViewRepository],
  exports:[FoodRepository, FoodViewRepository],
  controllers:[FoodController]
})
export  default  class FoodModule{}