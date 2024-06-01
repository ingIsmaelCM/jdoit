import { Controller, Delete, Get, Param, Patch, Post, Put, Query, Req } from "@nestjs/common";
import { IParams } from "@/utils/interfaces";
import FoodService from "@/services/food.service";
import { ApiBody, ApiCookieAuth, ApiTags } from "@nestjs/swagger";
import { CreateFoodDto, UpdateFoodDto } from "@/validators/food.validator";
import { Author } from "@/decorators/author.decorator";
import { Request } from "express";
import VenomService from "@/services/venom.service";

@ApiTags("Foods")
@ApiCookieAuth("jwt")
@Controller("foods")
export default class FoodController {

  constructor(private readonly foodService: FoodService) {
  }

  @Get()
  async getFoods(@Query() params: IParams, @Req() req: Request) {
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
  async createFood(@Author() foodData: CreateFoodDto) {
    return this.foodService.createFood(foodData);
  }

  @ApiBody({
    type: UpdateFoodDto
  })
  @Put(":id")
  async updateFood(@Param("id") id: string, @Author() foodData: UpdateFoodDto) {
    return this.foodService.updateFood(id, foodData);
  }

  @Delete(":id")
  async deleteFood(@Param("id") id: string) {
    return this.foodService.deleteFood(id);
  }

  @Patch(":id")
  async restoreFood(@Param("id") id: string) {
    return this.foodService.restoreFood(id);
  }
}