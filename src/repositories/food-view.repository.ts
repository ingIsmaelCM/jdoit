import { BaseRepository } from "@/repositories/base.repository";
import FoodView from "@/models/food.view";

export default class FoodViewRepository extends BaseRepository<FoodView> {
  constructor() {
    super(FoodView);
  }
}