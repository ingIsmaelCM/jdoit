import { BaseRepository } from "@/repositories/base.repository";
import PlanViewModel from "@/models/plan.view";

export default class PlanViewRepository extends BaseRepository<PlanViewModel> {
  constructor() {
    super(PlanViewModel);
  }
}