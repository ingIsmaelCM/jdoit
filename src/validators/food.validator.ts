import { IsDecimal, IsNotEmpty, IsOptional, IsPositive, Length, Matches, MATCHES, Min } from "class-validator";
import { validationConfig } from "@/configs";
import { ApiProperty } from "@nestjs/swagger";
import { IFoodView } from "@/models/food.view";

const PORTION_REGEX=/^\d{1,4}[a-zA-Z]$/
export class CreateFoodDto implements Partial<IFoodView> {

  @Length(2,75, validationConfig.isLength())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  name: string;

  @Length(2,75, validationConfig.isLength())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  categoryId: string;

  @Matches(PORTION_REGEX, validationConfig.isRegex())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  portion: string;

  @Min(0, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  proteins: number;

  @Min(0, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  calories: number;

  @Min(0, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  carbohidrates: number;

  @Min(0, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  fat: number;

  @Min(0, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  cholesterol: number;

}

export  class UpdateFoodDto {

  @IsOptional()
  @Length(2,75, validationConfig.isLength())
  @ApiProperty()
  name: string;

  @IsOptional()
  @Length(2,75, validationConfig.isLength())
  @ApiProperty()
  categoryId: string;

  @IsOptional()
  @Matches(PORTION_REGEX, validationConfig.isRegex())
  @ApiProperty()
  portion: string;

  @IsOptional()
  @Min(0, validationConfig.isMin())
  @ApiProperty()
  proteins: number;

  @IsOptional()
  @Min(0, validationConfig.isMin())
  @ApiProperty()
  calories: number;

  @Min(0, validationConfig.isMin())
  @ApiProperty()
  carbohidrates: number;

  @IsOptional()
  @Min(0, validationConfig.isMin())
  @ApiProperty()
  fat: number;

  @IsOptional()
  @Min(0, validationConfig.isMin())
  @ApiProperty()
  cholesterol: number;
}