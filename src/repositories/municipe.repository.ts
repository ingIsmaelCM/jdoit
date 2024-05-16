import { BaseRepository } from "@/repositories/base.repository";
import MunicipeModel from "@/models/municipe.model";

export default class MunicipeRepository extends BaseRepository<MunicipeModel> {
  constructor() {
    super(MunicipeModel);
  }
}