import { Injectable } from "@nestjs/common";
import BaseService from "@/services/base.service";
import ReminderRepository from "@/repositories/reminders.repository";
import WhatsappService from "@/services/whatsapp.service";
import { ChangeStatusDto, CreateReminderDto } from "@/validators/reminder.validator";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { EReminderStatus, EReminderType, IReminder } from "@/models/reminder.model";
import UserViewRepository from "@/repositories/user-view.repository";
import { IUserView } from "@/models/user.view";
import { Transaction } from "sequelize";
import { IParams } from "@/utils/interfaces";


@Injectable()
export default class ReminderService extends BaseService {

  constructor(private readonly reminderRepo: ReminderRepository,
              private readonly whatsappService: WhatsappService,
              private schedulerRegistry: SchedulerRegistry) {
    super();
  }

  async getReminder(params: IParams) {
    return await this.reminderRepo.getAll(params);
  }

  async createReminder(data: CreateReminderDto) {
    return this.runWithTrans(async (trans: Transaction) => {
      const [day = "*", month = "*"] = data.day.split("-");
      const [hour = "*", minute = "*"] = data.time.split(":");
      const cronDate = `${minute} ${hour} ${day} ${month} ${data.dayName || "*"}`;
      const user = await new UserViewRepository().findById((<any>data).createdBy);
      const year = new Date().getFullYear();
      data.dueAt = `${year}-${month}-${day} ${data.time}:00`;
      data.day = `${year}-${month}-${day}`;
      data.time = `${year}-${month}-${day} ${data.time}:00`;
      const reminder = await this.reminderRepo.create(data, trans);
      await this.createCronJob(cronDate, reminder, user);
      return reminder;
    });
  }

  async changeStatus(reminderId: string, data: ChangeStatusDto) {
    return await this.reminderRepo.update(data, reminderId);
  }

  async createCronJob(cronDate: string, data: IReminder, user: IUserView) {
    const phone = user.phone.replace(/\D/g, "");
    const job = new CronJob(cronDate, async () => {
      const hasWsClient = await this.whatsappService.checkClient(user.id);
      if (hasWsClient) {
        await this.whatsappService.connectClient(user.id);
        await this.whatsappService
          .sendTextMessage(user.id, `${phone}@g.us`, data.description)
          .then(async (res: any) => {
            console.log(res);
          });
      }
      if (data.type === EReminderType.oneTime) {
        this.schedulerRegistry.deleteCronJob(data.id);
      }
    });

    this.schedulerRegistry.addCronJob(data.id, job);
    job.start();
    if (data.type === EReminderType.oneTime) {
      job.runOnce = true;
    }
  }


}