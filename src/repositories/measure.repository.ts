import { BaseRepository } from "@/repositories/base.repository";
import MeasureModel from "@/models/measure.model";

export default class MeasureRepository extends BaseRepository<MeasureModel> {
  constructor() {
    super(MeasureModel);
  }
}