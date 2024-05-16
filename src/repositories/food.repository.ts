import { BaseRepository } from "@/repositories/base.repository";
import FoodModel from "@/models/food.model";

export default class FoodRepository extends BaseRepository<FoodModel> {
  constructor() {
    super(FoodModel);
  }
}