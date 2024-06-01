import { Module } from "@nestjs/common";
import FoodService from "@/services/food.service";
import FoodRepository from "@/repositories/food.repository";
import FoodViewRepository from "@/repositories/food-view.repository";
import FoodController from "@/controllers/food.controller";
import { CacheModule } from "@nestjs/cache-manager";
import NutrientRepository from "@/repositories/nutrient.repository";
import EventModule from "@/modules/event.module";


@Module({
  imports:[CacheModule.register(), EventModule],
  providers:[FoodService, FoodRepository, FoodViewRepository, NutrientRepository],
  exports:[FoodRepository, FoodViewRepository, CacheModule, FoodService],
  controllers:[FoodController]
})
export  default  class FoodModule{}