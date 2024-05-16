import { BaseRepository } from "@/repositories/base.repository";
import PlanModel from "@/models/plan.model";

export default class PlanRepository extends BaseRepository<PlanModel> {
  constructor() {
    super(PlanModel);
  }
}