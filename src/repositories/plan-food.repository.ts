import { BaseRepository } from "@/repositories/base.repository";
import PlanFoodModel from "@/models/plan-food.model";

export default class PlanFoodRepository extends BaseRepository<PlanFoodModel> {
  constructor() {
    super(PlanFoodModel);
  }
}