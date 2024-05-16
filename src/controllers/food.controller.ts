import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { IParams } from "@/utils/interfaces";
import FoodService from "@/services/food.service";
import { ApiBody, ApiCookieAuth, ApiTags } from "@nestjs/swagger";
import { CreateFoodDto } from "@/validators/food.validator";
import { Author } from "@/decorators/author.decorator";

@ApiTags("Foods")
@ApiCookieAuth("jwt")
@Controller("foods")
export default class FoodController {

  constructor(private readonly foodService: FoodService) {
  }

  @Get()
  async getFoods(@Query() params: IParams) {
    return this.foodService.getFoods(params);
  }

  @Get(":id")
  async findFood(@Param("id") id: string,
                 @Query() params: IParams) {
    return this.foodService.findFood(id, params);
  }

  @ApiBody({
    type: CreateFoodDto
  })
  @Post()
  async  createFood(@Author() foodData: CreateFoodDto){
    return this.foodService.createFood(foodData);
  }
}