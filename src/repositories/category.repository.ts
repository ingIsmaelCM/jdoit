import { BaseRepository } from "@/repositories/base.repository";
import CategoryModel from "@/models/category.model";

export default class CategoryRepository extends BaseRepository<CategoryModel> {
  constructor() {
    super(CategoryModel);
  }
}