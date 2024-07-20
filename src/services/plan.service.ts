import { BadRequestException, Inject, Injectable, Scope } from "@nestjs/common";
import BaseService from "@/services/base.service";
import PlanRepository from "@/repositories/plan.repository";
import { IParams } from "@/utils/interfaces";
import { EPlanDay, IPlan } from "@/models/plan.model";
import FoodService from "@/services/food.service";
import PlanSuggestion, { IDiet } from "@/utils/plan-suggestion";
import { CreatePlanDto, PlanSuggestionDto, SendPlanDto } from "@/validators/plan.validator";
import SocketGateway from "@/services/sockets/socket.gateway";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { Transaction } from "sequelize";
import PlanViewRepository from "@/repositories/planview.repository";


@Injectable({ scope: Scope.REQUEST })
export default class PlanService extends BaseService {

  constructor(@Inject(REQUEST) private request: Request,
              private readonly planRepo: PlanRepository,
              private readonly  planViewRepo: PlanViewRepository,
              private foodService: FoodService,
              private readonly socketGateWay: SocketGateway,
              private readonly planSuggestion: PlanSuggestion
  ) {
    super();
  }

  async createPlan(data: CreatePlanDto): Promise<IPlan> {
    if (data.proteins + data.fat + data.carbohidrates === 0) {
      throw new BadRequestException("Debe ingresar los nutrientes");
    }
    return this.runWithTrans(async (trans: Transaction) => {
      const diets = this.reformatPlan(data);
      const res = await this.planRepo.bulkCreate(Object.values(diets), trans);
      return <any>res;
    });
  }

  private reformatPlan(data: CreatePlanDto) {
   return data.foods.reduce((a: any, b: any) => {
      if (!a[b.day]) {
        a[b.day] = {
          createdBy: (<any>data).createdBy,
          updatedBy: (<any>data).updatedBy,
          day: b.day,
          type: data.type,
          proteins: data.proteins,
          carbohidrates: data.carbohidrates,
          fat: data.fat,
          patientId: data.patientId,
          planfoods: [],
          note: data.notes[b.day]||null
        };
      }
      a[b.day].planfoods.push({
        ...b,
        createdBy: (<any>data).createdBy,
        updatedBy: (<any>data).updatedBy
      });
      return a;
    }, {});

  }

  async getSuggestions(data: PlanSuggestionDto, params: IParams) {
    params = {
      ...params,
      order: "priority",
      desc: true,
      limit: 5000
    };
    if (data.proteins + data.fat + data.carbohidrates === 0) {
      throw new BadRequestException("Debe ingresar los nutrientes");
    }

    const user: any = this.request.user;
    this.foodService.getFoods(params).then(async (res: any) => {
      if (res.rows.length < 300) {
        throw new BadRequestException("La selección de alimentos es menor a 500. No se puede generar consulta");
      }
      const diets = await this.generateSuggestions(data, res);
      this.socketGateWay.emitMessage(`planSuggestion-${user.id}`, diets);
    });
    return { title: "Procesando datos" };
  }

  private async generateSuggestions(data: PlanSuggestionDto, res: any) {

    const diets = [];
    for (const day of data.days.split("")) {
      await this.planSuggestion
        .getDiet(<IDiet>data, res.rows
          .map((f: any) => f.dataValues)).then((diet: any) => {
          const foods = diet.map((food: any) => ({
            name: food.name,
            id: food.id,
            portion: food.portion,
            originalProt: food.proteins,
            originalCarb: food.carbohidrates,
            originalFat: food.fat,
            proteins: getFromPortion(food.portion, food.proteins),
            fat: getFromPortion(food.portion, food.fat),
            carbohidrates: getFromPortion(food.portion, food.carbohidrates),
            calories: getFromPortion(food.portion, food.calories),
            day: EPlanDay[day.toUpperCase()]
          }));
          diets.push(...foods);
        });
    }
    return diets;
  }

  async getPlans(params: IParams): Promise<IPlan> {
    return await this.planViewRepo.getAll(params);
  }

  async sendPlanWhatsapp(data: SendPlanDto){
    console.log(data)
    return true;
  }

}

const getFromPortion = (portion: number, value: number): number =>
  Number((Number(portion) * Number(value)).toFixed(2));

const getFromSum = (foods: any[], key: string): number =>
  Number(foods.reduce((a: number, b: any) => a + b[key], 0).toFixed(2));
