import { Injectable } from "@nestjs/common";
import BaseService from "@/services/base.service";
import ReminderRepository from "@/repositories/reminders.repository";
import WhatsappService from "@/services/whatsapp.service";
import { CreateReminderDto } from "@/validators/reminder.validator";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { EReminderType, IReminder } from "@/models/reminder.model";


@Injectable()
export default class ReminderService extends BaseService {

  constructor(private readonly reminderRepo: ReminderRepository,
              private readonly whatsappService: WhatsappService,
              private schedulerRegistry: SchedulerRegistry) {
    super();
  }

  async createReminder(data: CreateReminderDto) {
    const [day, month] = data.day.split("-");
    const [hour, minute] = data.time.split(":");
    const cronDate = `${minute} ${hour} ${day} ${month} ${data.dayName || "*"}`;


    const client = await this.whatsappService.connectClient((<any>data).createdBy);

    await this.createCronJob(cronDate, data);
    const year = new Date().getFullYear();
    data.dueAt = `${year}-${month}-${day} ${data.time}:00`;
    return data;
  }

  async createCronJob(cronDate: string, data: IReminder) {
    const job = new CronJob(cronDate, async () => {
      const hasWsClient = await this.whatsappService.checkClient(data.createdBy);
      if (hasWsClient) {
        const client = await this.whatsappService.connectClient(data.createdBy);
        await client.sendText("00000000-000000@g.us","Prueba").then(async (res: any) => {
          if (res.text === "Group not found") {
            const number = (<any>(await client.getHostDevice())).id._serialized;
            client.createGroup("jDoit", [number]).then((res: any) => {
              client.sendText(res._serialized, data.description)
            });
          } else{
            console.log(res)
          }
        });
      }
    });

    this.schedulerRegistry.addCronJob("test3", job);
    job.start();
    if (data.type === EReminderType.oneTime) {
      job.runOnce = true;
    }
  }
}