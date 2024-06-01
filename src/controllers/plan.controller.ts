import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import PlanService from "@/services/plan.service";
import { IParams } from "@/utils/interfaces";
import { CreatePlanDto, PlanSuggestionDto } from "@/validators/plan.validator";
import { Author } from "@/decorators/author.decorator";

@ApiTags("Plan")
@Controller("plans")
export default class PlanController {

  constructor(private readonly planService: PlanService) {
  }

  @Get()
  async getPlans(@Query() params: IParams) {
    return this.planService.getPlans(params);
  }

  @ApiBody({
    type: CreatePlanDto
  })
  @Post()
  async createPlan(@Author() data: CreatePlanDto){
    return this.planService.createPlan(data)
  }

  @ApiBody({
    type: PlanSuggestionDto
  })
  @HttpCode(200)
  @Post("/suggestions")
  async getSuggestions(@Body() data: PlanSuggestionDto, @Query() params: IParams){
    return this.planService.getSuggestions(data, params);
  }

}