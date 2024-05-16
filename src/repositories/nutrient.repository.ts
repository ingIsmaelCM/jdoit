import { BaseRepository } from "@/repositories/base.repository";
import NutrientModel from "@/models/nutrient.model";

export default class NutrientRepository extends BaseRepository<NutrientModel> {
  constructor() {
    super(NutrientModel);
  }
}