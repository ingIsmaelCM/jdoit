import { Injectable } from "@nestjs/common";
import UserViewRepository from "@/repositories/user-view.repository";

@Injectable()
export class AppService {

  constructor(private readonly userviewRepo: UserViewRepository) {
  }

  async getHello(): Promise<any> {
    return await this.userviewRepo.getAll({});
  }
}
