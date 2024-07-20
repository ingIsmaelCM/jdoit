import { Injectable } from "@nestjs/common";
import UserViewRepository from "@/repositories/user-view.repository";
import { Cron, SchedulerRegistry } from "@nestjs/schedule";
import SmsService from "@/services/sms.service";

@Injectable()
export class AppService {

  constructor(private readonly userviewRepo: UserViewRepository, private readonly scheduleRegistry: SchedulerRegistry) {
  }


  async getHello(): Promise<any> {

    SmsService.sendMessage("+1 229 304 3036","+ ","Hello from Twilio")
    return await this.userviewRepo.getAll({});
  }


}
