import { IsNotEmpty, Length } from "class-validator";
import { ICategory } from "@/models/category.model";
import { ApiProperty } from "@nestjs/swagger";
import { validationConfig } from "@/configs";


export class CategoryDto implements Partial<ICategory> {

  @IsNotEmpty(validationConfig.isRequired())
  @Length(3, 75, validationConfig.isLength())
  @ApiProperty({
    maximum: 75,
    minimum: 3
  })
  name: string;
}