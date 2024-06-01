import { Module } from "@nestjs/common";
import CategoryRepository from "@/repositories/category.repository";
import CategoryService from "@/services/category.service";
import CategoryController from "@/controllers/category.controller";


@Module({
  imports: [],
  exports: [CategoryRepository],
  providers: [CategoryRepository, CategoryService],
  controllers: [CategoryController]
})
export default class CategoryModule {
}