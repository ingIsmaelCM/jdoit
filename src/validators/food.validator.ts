import { IsNotEmpty } from "class-validator";
import { validationConfig } from "@/configs";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFoodDto {

  @IsNotEmpty(validationConfig.isRequired("name"))
  @ApiProperty()
  name: string
}