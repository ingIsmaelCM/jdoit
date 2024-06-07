import { Module } from "@nestjs/common";
import ReminderService from "@/services/reminder.service";
import ReminderRepository from "@/repositories/reminders.repository";
import ReminderController from "@/controllers/reminder.controller";
import WhatsappModule from "@/modules/whatsapp.module";

@Module({
  imports:[WhatsappModule],
  exports:[],
  providers:[ReminderService, ReminderRepository],
  controllers:[ReminderController]
})
export default  class  ReminderModule{}