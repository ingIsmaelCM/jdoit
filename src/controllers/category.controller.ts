import { Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import CategoryService from "@/services/category.service";
import { IParams } from "@/utils/interfaces";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CategoryDto } from "@/validators/category.validator";
import { Author } from "@/decorators/author.decorator";


@ApiTags("Category")
@Controller("categories")
export default class CategoryController {

  constructor(private readonly categoryService: CategoryService) {
  }

  @Get()
  async getCategories(@Query() params: IParams) {
    return this.categoryService.getCategories(params);
  }

  @Get(":id")
  async findCategory(@Param("id") id: string, @Query() params: IParams) {
    return this.categoryService.findCategory(id, params);
  }

  @Post()
  @ApiBody({
    type: CategoryDto
  })
  async createCategory(@Author() catData: CategoryDto) {
    return this.categoryService.createCategory(catData);
  }

  @Put(":id")
  @ApiBody({
    type: CategoryDto
  })
  async updateCategory(@Param("id") id: string, @Author() catData: CategoryDto) {
    return this.categoryService.updateCategory(id, catData);
  }

  @Delete(":id")
  async deleteCategory(@Param("id") id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Patch(":id")
  async restoreCategory(@Param("id") id: string) {
    return this.categoryService.restoreCategory(id);
  }
}