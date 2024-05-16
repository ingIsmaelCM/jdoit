import { Injectable } from "@nestjs/common";
import BaseService from "@/services/base.service";
import UserModel from "@/models/user.model";
import PatientModel from "@/models/patient.model";
import { Transaction } from "sequelize";



@Injectable()
export  class  InfoService extends BaseService{

  async assignInfo(infoData: any, modelRelated: UserModel|PatientModel, trans: Transaction ){

  }
}