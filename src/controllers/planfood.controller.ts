import { Controller, Param, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Author } from "@/decorators/author.decorator";
import { UpdateFoodPlanDto } from "@/validators/foodplan.validator";
import PlanFoodService from "@/services/planfood.service";


@ApiTags("PlanFood")
@Controller("planfoods")
export default class PlanfoodController {

  constructor(private readonly planfoodService: PlanFoodService) {
  }

  @Put(":id")
  updatePlanFood(@Author() data: UpdateFoodPlanDto, @Param("id") id: string) {
    return this.planfoodService.updatePlanFood(id, data);
  }
}