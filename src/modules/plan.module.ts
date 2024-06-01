import { Module } from "@nestjs/common";
import PlanController from "@/controllers/plan.controller";
import PlanService from "@/services/plan.service";
import PlanRepository from "@/repositories/plan.repository";
import FoodModule from "@/modules/food.module";
import PlanSuggestion from "@/utils/plan-suggestion";
import EventModule from "@/modules/event.module";
import NutrientRepository from "@/repositories/nutrient.repository";
import PlanViewRepository from "@/repositories/planview.repository";
import PlanFoodService from "@/services/planfood.service";
import PlanFoodRepository from "@/repositories/plan-food.repository";
import PlanfoodController from "@/controllers/planfood.controller";


@Module({
  imports: [FoodModule, EventModule],
  exports: [],
  providers: [PlanService, PlanFoodService, PlanRepository, PlanViewRepository,
    PlanSuggestion, NutrientRepository, PlanFoodRepository],
  controllers: [PlanController, PlanfoodController]
})

export default class PlanModule {
}