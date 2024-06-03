import { Injectable } from "@nestjs/common";
import UserViewRepository from "@/repositories/user-view.repository";
import { Cron, SchedulerRegistry } from "@nestjs/schedule";

@Injectable()
export class AppService {

  constructor(private readonly userviewRepo: UserViewRepository, private readonly scheduleRegistry: SchedulerRegistry) {
  }


  async getHello(): Promise<any> {

    return await this.userviewRepo.getAll({});
  }


}
