import { BaseRepository } from "@/repositories/base.repository";
import EvalModel from "@/models/eval.model";

export default class EvalRepository extends BaseRepository<EvalModel> {
  constructor() {
    super(EvalModel);
  }
}