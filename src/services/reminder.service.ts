import { Injectable } from "@nestjs/common";
import BaseService from "@/services/base.service";
import ReminderRepository from "@/repositories/reminders.repository";
import WhatsappService from "@/services/whatsapp.service";
import { ChangeStatusDto, ReminderDto, ReprogramReminderDto } from "@/validators/reminder.validator";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { EReminderStatus, IReminder } from "@/models/reminder.model";
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

  async createReminder(data: ReminderDto) {
    return this.runWithTrans(async (trans: Transaction) => {
      const { cronDate, user, formattedData } = await this.formatReminderData(data);
      data = <ReminderDto>formattedData;
      const reminder = await this.reminderRepo.create(data, trans);
      await this.createCronJob(cronDate, reminder, user);
      return reminder;
    });
  }

  async updateReminder(reminderId: string, data: ReminderDto) {
    return this.runWithTrans(async (trans: Transaction) => {
      const { cronDate, user, formattedData } = await this.formatReminderData(data);
      data = <ReminderDto>formattedData;
      const reminder = await this.reminderRepo.update(data, reminderId, trans);
      await this.createCronJob(cronDate, reminder, user);
      return reminder;
    });
  }
  

  async reprogramReminder(reminderId: string, data: ReprogramReminderDto) {
    return this.runWithTrans(async (trans: Transaction) => {
      const { cronDate, user, formattedData } = await this.formatReminderData(data);
      const reminder = await this.reminderRepo.findById(reminderId);
      if (data.moveDate) {
        await this.reminderRepo.update({
          ...reminder,
          time: formattedData.time,
          day: formattedData.day,
          dueAt: (<ReminderDto>formattedData).dueAt
        }, reminderId, trans);
      }
      await this.createCronJob(cronDate, { ...reminder.dataValues, status: EReminderStatus.pending }, user);
    });
  }

  private async formatReminderData(data: ReminderDto | ReprogramReminderDto) {
    const [day = "*", month = "*"] = data.day.split("-");
    const [hour = "*", minute = "*"] = data.time.split(":");
    const cronDate = `${minute} ${hour} ${day} ${month} *`;
    const user = await new UserViewRepository().findById((<any>data).createdBy);
    const year = new Date().getFullYear();
    (<ReminderDto>data).dueAt = `${year}-${month}-${day} ${data.time}:00`;
    data.day = `${year}-${month}-${day}`;
    data.time = `${year}-${month}-${day} ${data.time}:00`;
    return { cronDate, user, formattedData: data };
  }


  async changeStatus(reminderId: string, data: ChangeStatusDto) {
    return await this.reminderRepo.update(data, reminderId);
  }

  async createCronJob(cronDate: string, data: IReminder, user: IUserView) {
    if (data.status === EReminderStatus.canceled) return;
    const phone = user.phone.replace(/\D/g, "");
    const job = new CronJob(cronDate, async () => {
      await this.generateMessageToSend(user, data, phone);
      this.schedulerRegistry.deleteCronJob(data.id);
    });
    const cronExists = this.schedulerRegistry.doesExist("cron", data.id);
    if (cronExists) {
      this.schedulerRegistry.deleteCronJob(data.id);
    }
    this.schedulerRegistry.addCronJob(data.id, job);
    job.start();
    job.runOnce = true;
  }

  private async generateMessageToSend(user: IUserView, data: IReminder, phone: string) {
    const hasWsClient = await this.whatsappService.checkClient(user.id);
    const message = `*${data.title}:*\n${data.description}\n${data.dueAt}\n${data.tags ? (<string>data.tags)
      .split(",")
      .map((t: string) => "*_" + t + "_*")
      .join(" ") : ""}`;
    if (hasWsClient) {
      await this.whatsappService.connectClient(user.id);
      await this.whatsappService
        .sendTextMessage(user.id, `${phone}@g.us`, message)
        .then(async (res: any) => {
          console.log(res);
        });
    }
  }

  async deleteReminder(reminderId: string): Promise<IReminder> {
    return await this.reminderRepo.delete((reminderId));
  }
}