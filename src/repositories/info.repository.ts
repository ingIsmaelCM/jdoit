import { BaseRepository } from "@/repositories/base.repository";
import InfoModel from "@/models/info.model";

export default class InfoRepository extends BaseRepository<InfoModel> {
  constructor() {
    super(InfoModel);
  }
}