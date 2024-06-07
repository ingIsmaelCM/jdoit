import { BaseRepository } from "@/repositories/base.repository";
import ReminderModel from "@/models/reminder.model";

export default class ReminderRepository extends BaseRepository<ReminderModel> {
  constructor() {
    super(ReminderModel);
  }
}