import { Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Author } from "@/decorators/author.decorator";
import { CreateFoodPlanDto, UpdateFoodPlanDto } from "@/validators/foodplan.validator";
import PlanFoodService from "@/services/planfood.service";


@ApiTags("PlanFood")
@Controller("planfoods")
export default class PlanfoodController {

  constructor(private readonly planfoodService: PlanFoodService) {
  }

  @ApiBody({
    type: CreateFoodPlanDto
  })
  @Post()
  createPlanFood(@Author() data: CreateFoodPlanDto){
    return this.planfoodService.createPlanFood(data);
  }

  @ApiBody({
    type: UpdateFoodPlanDto
  })
  @Put(":id")
  updatePlanFood(@Author() data: UpdateFoodPlanDto, @Param("id") id: string) {
    return this.planfoodService.updatePlanFood(id, data);
  }

  @Delete(":id")
  deleteFoodPlan(@Param("id") id: string) {
    return this.planfoodService.deletePlanFood(id);
  }
}