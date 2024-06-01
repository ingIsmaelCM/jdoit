import { ConflictException, Injectable } from "@nestjs/common";
import BaseService from "@/services/base.service";
import { IParams } from "@/utils/interfaces";
import { ICategory } from "@/models/category.model";
import CategoryRepository from "@/repositories/category.repository";
import { CategoryDto } from "@/validators/category.validator";

@Injectable()
export default class CategoryService extends BaseService {

  constructor(private readonly categoryRepo: CategoryRepository) {
    super();
  }

  async getCategories(params: IParams): Promise<ICategory[]> {
    return await this.categoryRepo.getAll(params);
  }

  async findCategory(catId: string, params: IParams): Promise<ICategory>{
    return this.categoryRepo.findById(catId, params)
  }

  async createCategory(catData: CategoryDto): Promise<ICategory> {
    const existingCat = await this.categoryRepo.find("name", catData.name);
    if (existingCat) {
      throw new ConflictException("Category already exists");
    }
    return await this.categoryRepo.create(catData);
  }

  async updateCategory(catId: string, catData: CategoryDto): Promise<ICategory> {
    const existingCat = await this.categoryRepo.find("name", catData.name, true,{
      filter:[`id:ne:${catId}:and`]
    });
    if (existingCat) {
      throw new ConflictException("Category already exists");
    }
    return this.categoryRepo.update(catData, catId);
  }

  async deleteCategory(catId: string): Promise<ICategory>{
    return this.categoryRepo.delete(catId);
  }

  async restoreCategory(catId: string): Promise<ICategory>{
    return this.categoryRepo.restore(catId);
  }
}